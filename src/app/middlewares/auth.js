import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authconfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader){
    return res.status(401).json({ error: 'Token not provided'});
  }//fim if

  const [bearer, token] = authHeader.split(' ');

  try{
    const decoded = await promisify(jwt.verify)(token, authconfig.secret);

    req.recipientId = decoded.id;

    return next();
  }catch(err){
    return res.status(401).json({ error: 'Token invalid' });
  }//fim catch

}// fim
