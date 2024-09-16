import React from 'react';
import './ShoppingCart.css';
import useStore from '../../ZustandStore';

const ShoppingCart = () => {
  const cart = useStore((state) => state.cart);
  const addToCart = useStore((state) => state.addToCart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const clearCart = useStore((state) => state.clearCart);

  const handleQuantityChange = (item, amount) => {
    const newQuantity = item.quantity + amount;
    if (newQuantity > 0) {
      // Pass the new quantity directly to the store update function
      addToCart({ ...item, quantity: newQuantity });
    }
  };
  

  return (
    <div className="ShoppingCart-Container">
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="CartItems-Container">
          {cart.map((item) => (
            <div key={item.id} className="CartItem-Card">
              <img src={item.image} alt={item.name} className="CartItem-Image" />
              <div className="CartItem-Details">
                <h3 className="CartItem-Name">{item.name}</h3>
                <p className="CartItem-Price">${item.price.toFixed(2)}</p>
                <div className="CartItem-Quantity">
                  <button
                    className="QuantityButtonMinus"
                    onClick={() => handleQuantityChange(item, -1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="QuantityButtonPlus"
                    onClick={() => handleQuantityChange(item, 1)}
                  >
                    +
                  </button>
                </div>
                <p className="CartItem-Subtotal">
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  className="RemoveButton"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="CartTotal">
            <h2>
              Total: <span>${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
            </h2>
            <div className="CartActions">
              <button onClick={clearCart}>Clear Cart</button>
              <button onClick={() => alert('Proceeding to checkout...')}>Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
