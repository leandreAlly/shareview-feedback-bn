import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import docs from './documentation/index';
import routes from './routes/index';

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));
app.use('/api/v1', routes);

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Path does not found, try again' });
});

export default app;
