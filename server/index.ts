import express from 'express';
import cors from 'cors';
import config from './util/config';
import morgan from 'morgan';
import eventsController from './controllers/events';
import signController from './controllers/sign';

const app = express();
app.use(cors({
    origin: ['https://firecamp.dev', config.CORS_ORIGIN, 'http://localhost:3000'],
}));
app.use(express.json());
app.use(morgan('tiny'));

app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.use('/api/events', eventsController);
app.use('/api/sign', signController);

app.listen(config.PORT, () => {
    console.log('🚀 Server ready at: http://localhost:3001');
});