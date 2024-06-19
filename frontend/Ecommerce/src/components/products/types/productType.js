import { array, number, shape, string } from "prop-types";
import addressType from "./addressType";
import imgType from "./imgType";

const productType = shape({
  _id: string.isRequired,
  title: string.isRequired,
  description: string.isRequired,
  image: imgType.isRequired,
  category:string.isRequired,
  rating:string.isRequired,
  price:string.isRequired,
  cart: array,
  user_id: string.isRequired,
});

export default productType;