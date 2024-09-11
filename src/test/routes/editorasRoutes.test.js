import request from 'supertest';
// import wtfnode from 'wtfnode'; // pega o dump das requisições
import { describe } from '@jest/globals';
import app from '../../app.js';

// iniciando o servidor
let server;
beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});
// finalizando o servidor
afterEach(() => {
  server.close(() => {
    // wtfnode.dump();
  });
});

describe('GET em /editoras', () => {
  it('Deve retornar uma lista de editoras', async () => {
    const resposta = await request(app)
      .get('/editoras')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(resposta.body[0].email).toEqual('e@e.com');
  });
});
let idResposta;

describe('POST em /editoras', () => {
  it('Deve adicionar uma nova editora', async () => {
    const resposta = await request(app)
      .post('/editoras')
      .send({
        nome: 'CDC',
        cidade: 'Sao Paulo',
        email: 's@s.com',
      })
      .expect(201);
    idResposta = resposta.body.content.id;
  });
});

describe('GET /editores by id', () => {
  it('Get o recurso adicionado', async () => {
    await request(app)
      .get(`/editoras/${idResposta}`);
  });
});

describe('DELETE em /editores', () => {
  it('Deletar o recurso adicionado', async () => {
    await request(app)
      .delete(`/editoras/${idResposta}`);
  });
});
