import { httpError } from "../helpers/httpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { getCartById, upsertCart } from "../services/cartServices.js";
import { Product } from "../models/Product.js";

const getOneCart = async (req, res) => {
  const { _id: userId } = req.user;
  const userCart = await getCartById(userId);

  if (!userCart) {
    throw httpError(404, "Not found");
  }

  const ids = userCart.products.map(({ _id }) => _id);
  const products = await Product.find({ _id: { $in: ids } });

  const updatedProducts = userCart.products.map((cartProduct) => {
    const fullProductInfo = products.find((product) =>
      product._id.equals(cartProduct._id)
    );

    return { ...fullProductInfo?.toObject(), quantity: cartProduct.quantity };
  });
  const cart = { ...userCart.toObject(), products: updatedProducts };

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
