import {Router} from 'express';
import {parseISO} from 'date-fns';

import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../service/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentRepository();


appointmentsRouter.get('/', (request, response) => {
    try{
      const appointments = appointmentRepository.all();
      return response.json(appointments);
    }catch(err){
      return response.status(400).json({error: err.message});
    }
});

appointmentsRouter.post('/', (request, response) => {
    try{
      const { provider, date} = request.body;

      const parsedDate = parseISO(date);

      const createAppointment = new CreateAppointmentService(appointmentRepository);

      const appointment = createAppointment.execute({date: parsedDate, provider});
    
      return response.json(appointment);
    }catch(err){
      return response.status(400).json({error: err.message});
    }
});

export default appointmentsRouter;