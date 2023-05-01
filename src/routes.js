import { Router } from 'express';
import SessionController from './controllers/SessionController';
import HouseController from './controllers/HouseController';
import multer from 'multer';
import uploadConfig from './config/upload';
import DashboadController from './controllers/DashboadController';
import ReserveController from './controllers/ReserveController';

const routes = new Router();
const upload = multer(uploadConfig);

routes.post('/sessions', SessionController.store);
routes.post('/houses', upload.single('thumbnail'), HouseController.store);
routes.get('/houses', HouseController.index);
routes.put(
  '/houses/:house_id',
  upload.single('thumbnail'),
  HouseController.update
);

routes.delete('/houses', HouseController.destroy);
routes.get('/dashboard', DashboadController.show);
routes.post('/houses/:house_id/reserve', ReserveController.store);

export default routes;