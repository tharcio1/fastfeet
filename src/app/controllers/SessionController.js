import * as Yup from 'yup';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import authConfig from '../../config/auth';

class SessionController {
  async store(req,res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({ error: 'Validation fails' });
    }//fim if

    const {email, password} = req.body;

    const user = await User.findOne({ where: {email:email}});

    if(!user){
      return res.status(401).json({ error: "User not found" });
    }//fim if

    if(!(user.checkPassword(password))){
      return res.status(401).json({ error: "Password does not match" });
    }//fim if

    const {id, name} = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({id}, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    })//fim return
  }//fim metodo store
}//fim classe SessionController

export default new SessionController();
