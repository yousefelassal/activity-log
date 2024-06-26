import jwt, { Secret } from 'jsonwebtoken';
import Router from 'express';
import db from '../util/db';
import config from '../util/config';

const router = Router();

// very simple sign endpoint to generate a token for a group
router.post('/', async (req, res) => {
    const { group_id } = req.body;

    if (!group_id) {
        return res.status(400).json({ error: 'group_id is required' });
    }

    const group = await db.group.findUnique({
        where: { id: group_id },
    });

    const token = jwt.sign({ group_id: group?.id }, config.SECRET as Secret);

    res.json({ token });
});

export default router;