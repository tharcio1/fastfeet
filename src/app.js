import express from 'express';

import routes from './routes';

import database from './database/index';

class App {
  constructor() {
    this.server = express();

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }//fim metodo middlewares

  routes() {
    this.server.use(routes);
  }//fim metodo routes
}// fim classe App

export default new App().server;
