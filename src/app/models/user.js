import Sequelize, { Model } from 'sequelize';

import bcrypt from 'bcryptjs';

class User extends Model{
  static init(sequelize){
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,
    },
    {
      sequelize,
    }
    );//fim metodo super.init

    this.addHook('beforeSave', async (user) => {
      if(user.password){
        user.password_hash = await bcrypt.hash(user.password, 8);
      }//fim if
    })//fim metodo addHook

    return this;
  }//fim metodo static init

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }//fim metodo checkPassword

}//fim classe User

export default User;
