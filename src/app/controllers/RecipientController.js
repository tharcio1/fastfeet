import Recipient from '../models/Recipient';

import * as yup from 'yup';

class RecipientController {
  async store(req,res){
    const schema = yup.object().shape({
      name   : yup.string().required(),
      rua    : yup.string().required(),
      numero : yup.number().required(),
      complemento : yup.string(),
      estado : yup.string().required(),
      cidade : yup.string().required(),
      cep    : yup.number().required(),
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({ error: 'Validation fail' });
    }//fim if

    const { name, cep } = await Recipient.create(req.body);

    return res.json({
      name,
      cep,
    });//fim return

  }//fim metodo store

  async update(req,res) {
    const schema = yup.object().shape({
      id     : yup.number().required(),
      name   : yup.string(),
      rua    : yup.string(),
      numero : yup.number(),
      complemento : yup.string(),
      estado : yup.string(),
      cidade : yup.string(),
      cep    : yup.number().when('rua', (rua, field) =>
        rua ? field.required(): field
      )
    });

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({ error: "Validation fails"})
    }//fim if

    const recipient = await Recipient.findByPk(req.body.id);

    if(!recipient){
      return res.status(400).json({ error: 'Recipient not found' });
    }//fim if

    const { id, name, rua, numero, complemento, estado, cidade, cep } = await recipient.update(req.body);


    return res.json({
      id,
      name,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep,
    });//fim return


  }//fim metodo update
}//fim classe RecipientController

export default new RecipientController();
