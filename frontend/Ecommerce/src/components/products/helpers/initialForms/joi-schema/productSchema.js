import Joi from "joi";

const urlRegex =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}|\/(?:[\w-]+\/)*[\w-]+\.(?:jpg|jpeg|png|gif|bmp|pdf|doc|docx|xls|xlsx|ppt|pptx|txt|csv|html|htm|js|css))/;

const productSchema = {
  title: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  imageUrl: Joi.string()
    .ruleset.regex(urlRegex)
    .rule({ message: 'product.image "url" mast be a valid url' })
    .allow(""),
  imageAlt: Joi.string().min(2).max(256).allow(""),
  price:Joi.number().required(),
  quantity:Joi.number().required(),
  category:Joi.string().min(2).max(256).allow(""),
  user_id:Joi.string().min(24).max(24).required()

};

export default productSchema;
