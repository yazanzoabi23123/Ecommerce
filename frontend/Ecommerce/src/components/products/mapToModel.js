const mapProductToModel = (product) => {
  return {
    title: product.title,
    description: product.description,
    imageUrl: product.image.url,
    imageAlt: product.image.alt,
    price:product.price,
    category:product.category,
    quntity:product.quntity,
    user_id:product.user_id
  };
};

export default mapProductToModel;
