
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import useStore from '../../ZustandStore';

function NavBar() {
  const toggleCartVisibility = useStore(state => state.toggleCartVisibility);
  const setToggleCartVisibility = useStore(state => state.setToggleCartVisibility);
  const cart = useStore(state => state.cart);
  const removeFromCart = useStore(state => state.removeFromCart);
  const clearCart = useStore(state => state.clearCart);

  const handleCartVisibility = () => {
    setToggleCartVisibility(!toggleCartVisibility);
  }


  return (
    <nav className='NavBar-Container'>
      <div className='NavBar-Logo'>
        <h2>Paradise Nursery</h2>
      </div>
      <div className='NavBar-Links'>
        <div>
        <Link to="/">Landing Page</Link> | <Link to="/product-listing">Product Listing</Link> | <Link to="/shopping-cart">Shopping Cart</Link>
        </div>
        <div>
          <button className='NavBar-Cart' onClick={handleCartVisibility}>
            {/* CartIcon */}
            <FontAwesomeIcon icon={faCartShopping} />
          </button>
        </div>
        {toggleCartVisibility && (
          <div className='NavBar-Cart-Items'>
            <button onClick={clearCart}>Clear Cart</button>
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  {item.name} - ${item.price} <button onClick={() => removeFromCart(index)}>Remove</button>
                </li>
              ))}
            </ul>
          </div>
        )}
        
      </div>
    </nav>
  );
}

export default NavBar;
