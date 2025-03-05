import express from 'express';
import __dirname, { joinPath } from '../utils/path.js';
import { router } from '../routes/router.js';
import nocache from 'nocache';

const app = express();
const port = 3000;

app.use(nocache());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router);
app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'ejs');
app.set('views', joinPath('views'));
app.set('Cache-Control', 'no-store');

app.use('*', (req, res) => {
    res.status(404);
    res.send('404 - Not found, go away stupid!');
});

app.listen(port, () => console.log(`Server listening to port ${port}...`));

export default app;