import Router from 'express';
import db from '../util/db';
import { z } from 'zod';
import { validate } from '../util/middleware';

const router = Router();

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;

    let searchWhere = {};
    let actorWhere = {};
    let targetWhere = {};
    let actionWhere = {};

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

    const events = await db.event.findMany({
        include: {
            actor: true
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
        }
    });

    res.json(events);
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

router.post('/', validate(eventSchema), async (req, res) => {
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
});

export default router;