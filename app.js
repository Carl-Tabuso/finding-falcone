import express from 'express';
import __dirname from './utils/basePath.js';
import { router } from './routes/router.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use('/api', router);
app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use('*', (req, res) => {
    res.status(404);
    res.send('404 - Not found, go away stupid!');
});

app.listen(port, () => console.log(`Server listening to port ${port}...`));

export default app;