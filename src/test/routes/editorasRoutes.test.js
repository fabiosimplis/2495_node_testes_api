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
  it('Deve não adicionar nada ao passar body vazio', async () => {
    await request(app)
      .post('/editoras')
      .send({})
      .expect(400);
  });
});

describe('GET /editores by id', () => {
  it('Deve o recurso adicionado', async () => {
    await request(app)
      .get(`/editoras/${idResposta}`);
  });
});

describe('PUT em /editoras', () => {
  it.each([ // Faz com que teste sejam feitos com a lista de elementos
    ['nome', { nome: 'Casa do Código' }], // Primeiro
    ['cidade', { cidade: 'Recife' }], // Segundo
    ['email', { email: 'cdc@cdc.com' }], // Terceiro
  ])('Deve alterar o campo %s', async (chave, param) => { // %s faz com que o nome dos testes mude
    await request(app)
      .put(`/editoras/${idResposta}`)
      .send(param)
      .expect(204);
  });
});

describe('DELETE em /editores', () => {
  it('Deletar o recurso adicionado', async () => {
    await request(app)
      .delete(`/editoras/${idResposta}`);
  });
});
