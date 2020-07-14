import Sequelize, {Model} from 'sequelize';

class Recipient extends Model {
  static init(sequelize){
    super.init({
      name   : Sequelize.STRING,
      rua    : Sequelize.STRING,
      numero : Sequelize.INTEGER,
      complemento : Sequelize.STRING,
      estado : Sequelize.STRING,
      cidade : Sequelize.STRING,
      cep    : Sequelize.INTEGER,
    },
    {
      sequelize,
    });//fim chamada do super.init

    return this;
  }//fim metodo static init
}//fim classe Recipient

export default Recipient;
