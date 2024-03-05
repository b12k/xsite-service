import createApp from 'fastify';
import cookie from '@fastify/cookie';
import { randomUUID } from 'node:crypto';

const PORT = Number(process.env.PORT) || 9000;

createApp({
  logger: true,
})
  .register(cookie, {
    hook: 'onRequest',
  })
  .get('/', (request, response) => {
    const { to } = request.query as { to?: string };
    if (!to) return response.status(400).send(400);

    const xsiteId = request.cookies.xsite || randomUUID();

    return response.setCookie('xsite', xsiteId).redirect(307, `${to}?xsite=${xsiteId}`);
  })
  .listen({
    host: '0.0.0.0',
    port: PORT
  }, () => {
    console.log(`🚀 http://127.0.0.1:${PORT}`)
  });
