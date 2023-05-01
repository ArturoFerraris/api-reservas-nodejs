//Pode ter os seguintes métodos: index, show, update, store, destroy
/*
index: Listagem de sessões
store: Criar uma sessão
show: Quando queremos listar uma ÚNICA sessão
update: Quando queremos alterar alguma sessão
destroy: Quando queremos deletar uma sessão
*/

import User from '../models/User';
import * as Yup from 'yup';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required()
    });

    const { email } = req.body;

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Falha na validação' });
    }
    //verificando se o usuario ja existe, caso não exista ele cria um novo
    //caso exista ele retorna o usuário.
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({ email });
    }

    return res.json(user);
  }
}
export default new SessionController();
