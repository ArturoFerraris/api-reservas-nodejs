import { Router } from "express";
import multer from "multer";
import SessionController from "./controllers/SessionController";
import HouseController from "./controllers/HouseController";
import uploadConfig from "./config/upload";
import DashboadController from "./controllers/DashboadController";
import ReserveController from "./controllers/ReserveController";

const routes = new Router();
const upload = multer(uploadConfig);
// Cadastrar Usuarios
routes.post("/sessions", SessionController.store);
// cadastrar Casas
routes.post("/houses", upload.single("thumbnail"), HouseController.store);
// Listar Casas
routes.get("/houses", HouseController.index);
// Alterar Casas
routes.put(
  "/houses/:house_id",
  upload.single("thumbnail"),
  HouseController.update
);
// Deletar casas
routes.delete("/houses", HouseController.destroy);
// Listar via dashboard
routes.get("/dashboard", DashboadController.show);
// Reservar uma casa que esteja disponível
routes.post("/houses/:house_id/reserve", ReserveController.store);
// Listar todas as reserves relacionadas ao usuário
routes.get("/reserves", ReserveController.index);
// Deletar uma reserva by id
routes.delete("/reserves/cancel", ReserveController.destroy);

export default routes;
