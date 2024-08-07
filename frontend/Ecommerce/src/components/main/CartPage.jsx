import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useProducts from "./hooks/useProducts";
import "./CartCss.css"
import { useUser } from "../../Users/providers/UserProvider";
import swal from 'sweetalert'
import { Margin } from "@mui/icons-material";


export default function CartPage() {
  
  const [cartItems, setCartItems] = useState();
  const {value, handleGetAddedProducts,handleDeleteProduct,handleRemoveProductFromCart} = useProducts();
  
  const { user } = useUser();

  useEffect(() => {
    const loader = async () => {
      const cartItems = await handleGetAddedProducts();
      console.log(cartItems);
      setCartItems(cartItems);
    }
    loader();
  }, [cartItems])
  const handleDelete = async (id) => {
    await handleDeleteProduct(id);
     await handleGetAddedProducts();
  };
  const notify = () => swal(
    {
      title: 'Succeded',
      text: 'Your order is waiting for the admin to ship ',
      icon: 'success',
      button: {text:'OK',className: "NotifyButton",
      },
    }
  )

 
  
  return (
    
    <div className="cart-container">
    <h2>Shopping Cart</h2>
    {!cartItems || cartItems.length === 0 ? (
      <div className="cart-empty">
        <p>Your cart is currently empty</p>
        <div className="start-shopping">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
            <span>Start Shopping</span>
          </Link>
        </div>
      </div>
    ) : (
      <div>
        <div className="titles">
          <h3 className="product-title">Product</h3>
          <h3 className="price">Price</h3>
          <h3 className="quantity">Quantity</h3>
          <h3 className="total">Total</h3>
        </div>
        <div className="cart-items">
          {
             !cartItems ||cartItems.map((cartItem) => (
              <div className="cart-item" key={cartItem.id}>
                <div className="cart-product">
                  <img src={cartItem.image.url} alt={cartItem.alt} />
                  <div>
                    <h4>{cartItem.title}</h4>
                    <p>{cartItem.desc}</p>
                    <button onClick={() => handleRemoveProductFromCart(cartItem.id,user.id)}>
                      Remove
                    </button>
                  </div>
                </div>
                <div className="cart-product-price">${cartItem.price}</div>
                <div className="cart-product-quantity">
                  <button onClick={() => handleDecreaseCart(cartItem)}>
                    -
                  </button>
                  <div className="count">{cartItem.cartQuantity}</div>
                  <button onClick={() => handleAddToCart(cartItem)}>+</button>
                </div>
                <div className="cart-product-total-price">
                  ${cartItem.price * cartItem.cartQuantity}
                </div>
              </div>
            ))}
        </div>
        <div className="cart-summary">
         
          <div className="cart-checkout">
            <div className="subtotal">
              <span>Subtotal</span>
              {/* <span className="amount">${cartTotalAmount}</span> */}
            </div>
            <p>Taxes and shipping calculated at checkout</p>
            <button onClick={notify}>Check out</button>
            <div className="continue-shopping">
              <Link to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
  
  )
}
