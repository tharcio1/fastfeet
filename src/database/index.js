import Sequelize from 'sequelize';

import User from '../app/models/user';
import Recipient from '../app/models/Recipient';

import databaseConfig from '../config/database';

const models = [User,Recipient];

class DataBase {
  constructor() {
    this.init();
  }// fim metodo construtor

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }// fim metodo init

}// fim classe DataBase

export default new DataBase();
