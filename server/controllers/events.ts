import Router from 'express';
import db from '../util/db';
import { z } from 'zod';
import { validate, extractToken } from '../util/middleware';
import { AsyncParser } from '@json2csv/node';

const router = Router();

router.get('/', extractToken, async (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    let searchWhere = {};
    let actorWhere = {};
    let targetWhere = {};
    let actionWhere = {};
    let actionNameWhere = {};
    let occurredAtWhere = {};

    if (req.query.search) {
        searchWhere = {
            OR: [
                { action_name: { contains: req.query.search as string, mode: 'insensitive' } },
                { actor: { OR: [
                    { name: { contains: req.query.search as string, mode: 'insensitive' } },
                    { email: { contains: req.query.search as string, mode: 'insensitive' } },
                ]}},
            ],
        };
    }

    if (req.query.actorId) {
        actorWhere = {
            actor_id: { in: (req.query.actorId as string).split(',') }
        }
    }

    if (req.query.targetId) {
        targetWhere = {
            target_id: { in: (req.query.targetId as string).split(',') }
        }
    }

    if (req.query.actionId) {
        actionWhere = {
            action_id: { in: (req.query.actionId as string).split(',') }
        }
    }

    if (req.query.actionName) {
        actionNameWhere = {
            action_name: { in: (req.query.actionName as string).split(',') }
        }
    }

    if (req.query.since) {
        occurredAtWhere = {
            occurred_at: { gte: new Date(req.query.since as string) }
        }
    }

    const events = await db.event.findMany({
        select: {
            id: true,
            actor: { select: { email: true, name: true } },
            action_name: true,
            occurred_at: true,
        },
        take: limit,
        skip: offset,
        orderBy: {
            occurred_at: 'desc',
        },
        where: {
            ...searchWhere,
            ...actorWhere,
            ...targetWhere,
            ...actionWhere,
            ...actionNameWhere,
            ...occurredAtWhere,
        }
    });

    res.json(events);
});

router.get('/csv', extractToken, async (req, res) => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const events = await db.event.findMany({
        select: {
            id: true,
            actor: { select: { email: true, name: true } },
            action_name: true,
            object: true,
            target_name: true,
            location: true,
            occurred_at: true,
        },
        orderBy: {
            occurred_at: 'desc',
        },
        where: {
            occurred_at: { gte: weekAgo }
        }
    });

    const fields = [
        { label: 'ID', value: 'id' },
        { label: 'Actor Name', value: 'actor.name' },
        { label: 'Actor Email', value: 'actor.email' },
        { label: 'Action', value: 'action_name' },
        { label: 'Object', value: 'object' },
        { label: 'Target Name', value: 'target_name' },
        { label: 'Location', value: 'location' },
        { label: 'Occurred At', value: 'occurred_at' },
    ];

    const json2csvParser = new AsyncParser({ fields });
    const csv = await json2csvParser.parse(events).promise();

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=events.csv');
    res.send(csv);
});


router.get('/filter-options', extractToken, async (_req, res) => {
    const [actors, targets, actionNames] = await db.$transaction([
        db.event.groupBy({
            by: ['actor_id'],
            _count: { actor_id: true },
            orderBy: { _count: { actor_id: 'desc' } },
        }),
        db.event.groupBy({
            by: ['target_id'],
            _count: { target_id: true },
            orderBy: { _count: { target_id: 'desc' } },
        }),
        db.event.groupBy({
            by: ['action_name'],
            _count: { action_name: true },
            orderBy: { _count: { action_name: 'desc' } },
        }),
    ]);

    res.json({
        actors,
        targets,
        actionNames,
    });
});

router.get('/:id', extractToken, async (req, res) => {
    const event = await db.event.findUnique({
        where: {
            id: req.params.id,
        },
        include: { actor: true }
    });

    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
});

const eventSchema = z.object({
    actor_id: z.string().min(1, 'Actor ID is required'),
    action: z.object({
        id: z.string().min(1, 'Action ID is required'),
        object: z.string(),
        name: z.string().min(1, 'Action name is required'),
    }),
    object: z.string(),
    target_id: z.string().min(1, 'Target ID is required'),
    target_name: z.string().min(1, 'Target name is required'),
    location: z.string().min(1, 'Location is required'),
    metadata: z.object({
        redirect: z.string(),
        description: z.string(),
        x_request_id: z.string(),
    }),
});

type Event = z.infer<typeof eventSchema>;

router.post('/', extractToken, validate(eventSchema), async (req, res) => {
    try {
        const {
            actor_id,
            action,
            object,
            target_id,
            target_name,
            location,
            metadata,
        } = req.body as Event;
        
        const event = await db.event.create({
            data: {
                actor_id,
                action_id: action.id,
                action_name: action.name,
                object,
                target_id,
                target_name,
                location,
                occurred_at: new Date(),
                metadata,
            },
            include: {
                actor: true,
            }
        });

        res.json(event);
    } catch (error: unknown) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while creating the event' });
    }
});

export default router;