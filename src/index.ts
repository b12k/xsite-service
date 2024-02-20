import createApp from 'fastify';
import Etag from '@fastify/etag';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { randomUUID } from 'node:crypto';

const PORT = Number(process.env.PORT) || 9000;
const injectorJs = readFileSync(resolve(__dirname, 'scripts/injector.js'), 'utf8');
const iframeJs = readFileSync(resolve(__dirname, 'scripts/iframe.js'), 'utf8');
const loopbackJs = readFileSync(resolve(__dirname, 'scripts/loopback.js'), 'utf8');

createApp({
  logger: true,
})
  .register(Etag)
  .get('/loopback', (request, response) => {
    const payload = `<!DOCTYPE html><script>${loopbackJs}</script><>`;
    response.header('content-type', 'text/html')
    
    return response.send(payload);
  })
  .get('/iframe', (request, response) => {
    let uuid = request.headers['if-none-match'];

    console.log('>>>>', uuid);

    if (!uuid) {
      uuid = randomUUID();
    }

    const payload = `
        <!DOCTYPE html>
        <script>
            const uuid = "${uuid}";
            console.log('Iframe UUID:', uuid);
            window.parent.postMessage({ uuid }, '*');
        </script>`;

    response.header('etag', uuid);
    response.header('content-type', 'text/html');
    // response.header('cache-control', 'max-age=1');

    return response.send(payload);
  })
  .get('/', async (request, response) => {
    const {
      headers,
      protocol,
      hostname,
    } = request

    const serviceUrl = `${protocol}://${hostname}`;

    const secFetchDest = headers['sec-fetch-dest'];
    let payload = 'Hello';

    console.log(`

    ${serviceUrl}

    `)

    if (secFetchDest === 'script') {
      payload = injectorJs.replace('{{SERVICE_URL}}', serviceUrl);
      response.header('content-type', 'application/javascript')
    }

    if (secFetchDest === 'iframe') {
      payload = `<!DOCTYPE html><script>${iframeJs}</script>`;
      response.header('content-type', 'text/html')
    }

    return response.send(payload);
  })
  .listen({
    host: '0.0.0.0',
    port: PORT
  }, () => {
    console.log(`🚀 http://127.0.0.1:${PORT}`)
  });
