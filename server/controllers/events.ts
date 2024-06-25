import Router from 'express';
import db from '../util/db';

const router = Router();

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;
    const offset = (page - 1) * pageSize;

    let where = {};

    if (req.query.search) {
        where = {
            OR: [
                { action_id: { contains: req.query.search as string, mode: 'insensitive' } },
                { actor: { OR: [
                    { name: { contains: req.query.search as string, mode: 'insensitive' } },
                    { email: { contains: req.query.search as string, mode: 'insensitive' } },
                ]}},
            ],
        };
    }

    const events = await db.event.findMany({
        take: pageSize,
        skip: offset,
        orderBy: {
            occurred_at: 'desc',
        },
        where
    });

    res.json(events);
});

export default router;