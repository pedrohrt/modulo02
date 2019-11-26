import {startOfDay, endOfDay} from 'date-fns';
import Appointment from '../models/Appointment';
import {Op} from 'sequelize';

class AvailableController{
  async index(req, res){
    const { date } = req.query;

    if (!date){
      return res.status(401).json({error: 'Invalid date'});
    }

    const searchDate = Number(date);

    const appointments = await Appointment.findAll({
      where:{
        provider_id: req.params.providerId,
        canceled_at: null,
        date:{
          [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
        },
      },
    });

    return res.json()
  }
}

export default new AvailableController();