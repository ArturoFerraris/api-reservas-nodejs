import Reserve from '../models/Reserve';
import User from '../models/User';
import House from '../models/House';

class ReserveController {
  async store(req, res) {
    const { user_id } = req.headers;
    const { house_id } = req.params;
    const { date } = req.body;

    //validando se a casa existe
    const house = await House.findById(house_id);
    if (!house) {
      return res.status(400).json({ erros: 'A casa não existe' });
    }
    //validando se a casa está disponível para reserva
    if (house.status !== true) {
      return res.status(400).json({ erros: 'Solicitação indisponível' });
    }

    //validando se o usuário que está tentando realizar uma reserva é o propietário
    const user = await User.findById(user_id);

    if (String(user._id) === String(house.user)) {
      return res.status(401).json({ erros: 'Reserva não permitida' });
    }

    const reserve = await Reserve.create({
      user: user_id,
      house: house_id,
      date
    });

    //populando o retorno com dados do usuario e do imóvel
    (await reserve.populate('house')).populate('user');

    return res.json(reserve);
  }
}

export default new ReserveController();
