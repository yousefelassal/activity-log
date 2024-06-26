import Router from 'express';
import db from '../util/db';

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

export default router;