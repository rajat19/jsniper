const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router');

const config = require('./config');

const app = new Koa();
const router = new Router();

app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());

const startServer = () => {
	const port = process.env.PORT || config.port;
	return new Promise((resolve) => {
		app.listen(port, () => {
			console.log(`Env: ${process.env.NODE_ENV} Server listening on ${port}`);
			resolve(port);
		});
	});
};

if (require.main === module) {
	startServer()
		.catch((err) => console.error('connection error', err));
}
