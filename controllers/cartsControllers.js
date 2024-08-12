import { httpError } from "../helpers/httpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { getCartById, upsertCart } from "../services/cartsServices.js";

const getOneCart = async (req, res) => {
  const { userId } = req.user;
  const cart = await getCartById(userId);

  if (!cart) {
    throw httpError(404, "Not found");
  }

  res.json(cart);
};

const saveCart = async (req, res) => {
  const { _id: userId } = req.user;
  const { products } = req.body;
  const cart = await upsertCart(userId, { products, userId });

  res.status(201).json(cart);
};

export default {
  getOneCart: ctrlWrapper(getOneCart),
  saveCart: ctrlWrapper(saveCart),
};
