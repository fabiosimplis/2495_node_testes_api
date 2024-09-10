import { afterEach, beforeEach } from '@jest/globals';
import app from '../../app.js';

// iniciando o servidor
let server;
beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});
// finalizando o servidor
afterEach(() => {
  server.close();
});
