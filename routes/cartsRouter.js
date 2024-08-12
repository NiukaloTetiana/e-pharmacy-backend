import express from "express";

import cartsControllers from "../controllers/cartsControllers.js";
import ordersControllers from "../controllers/ordersControllers.js";
import { validateBody } from "../middlewares/validateBody.js";
import { authenticate } from "../middlewares/authenticate.js";
import { cartSchema } from "../schemas/cartsSchemas.js";
import { orderSchema } from "../schemas/ordersSchemas.js";

const cartsRouter = express.Router();

cartsRouter.get("/", authenticate, cartsControllers.getOneCart);
cartsRouter.put(
  "/update",
  authenticate,
  validateBody(cartSchema),
  cartsControllers.saveCart
);
cartsRouter.post(
  "/checkout",
  authenticate,
  validateBody(orderSchema),
  ordersControllers.addOrder
);

export default cartsRouter;
