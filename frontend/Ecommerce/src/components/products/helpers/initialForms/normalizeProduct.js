const normalizeProduct= (product) => {
  return {
    title: product.title,
    description: product.description,
    image: {
      url: product.imageUrl,
      alt: product.imageAlt,
    },
    price:product.price,
    quantity:product.quantity,
    category:product.category,
    user_id:product.user_id
    }
  
};

export default normalizeProduct;
