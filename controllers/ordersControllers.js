import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { createOrder } from "../services/ordersServices.js";

const addOrder = async (req, res) => {
  const order = await createOrder(req.body);

  res.status(201).json(order);
};

export default {
  addOrder: ctrlWrapper(addOrder),
};
