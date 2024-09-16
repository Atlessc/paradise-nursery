import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faBars,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import useStore from "../../ZustandStore";

function NavBar() {
  const toggleCartVisibility = useStore((state) => state.toggleCartVisibility);
  const setToggleCartVisibility = useStore(
    (state) => state.setToggleCartVisibility
  );
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const clearCart = useStore((state) => state.clearCart);

  const [navSidebarVisible, setNavSidebarVisible] = useState(false);
  const [cartSidebarVisible, setCartSidebarVisible] = useState(false);

  const [windowType, setWindowType] = useState("");

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setWindowType("mobile");
    } else {
      setWindowType("desktop");
      // Ensure sidebars are closed when switching to desktop view
      setNavSidebarVisible(false);
      setCartSidebarVisible(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCartVisibility = () => {
    setCartSidebarVisible(!cartSidebarVisible);
    setToggleCartVisibility(!cartSidebarVisible);
  };

  const handleNavLinkClick = () => {
    setNavSidebarVisible(!navSidebarVisible);
  };

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const handleGoHome = () => {
    window.location.href = "/";
  }

  return (
    <div className="main-navbar-container">
      <nav className="NavBar-Container">
        <div className="NavBar-Logo" onClick={handleGoHome}>
          <h2>Paradise Nursery</h2>
        </div>
        {windowType === "mobile" && (
          <button
            className="HamburgerIcon"
            onClick={handleNavLinkClick}
            aria-label="Open navigation menu"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        )}

        {/* Desktop Navigation Links */}
        {windowType === "desktop" && (
          <>
            <div className="NavBar-Links">
              <Link to="/">Landing Page</Link>
              <Link to="/product-listing">Product Listing</Link>
              <Link to="/shopping-cart">Shopping Cart</Link>
            </div>
            <button
              className="NavBar-Cart"
              onClick={handleCartVisibility}
              aria-label="View cart"
            >
              <FontAwesomeIcon icon={faCartShopping} />
              {totalItems > 0 && <span className="CartBadge">{totalItems}</span>}
            </button>
          </>
        )}

        {/* Mobile Navigation Sidebar */}
        {windowType === "mobile" && navSidebarVisible && (
          <div className={`NavSidebar ${navSidebarVisible ? "Visible" : ""}`}>
            <div className="NavSidebarContent">
              <button
                className="CloseSidebar"
                onClick={() => setNavSidebarVisible(false)}
                aria-label="Close navigation menu"
              >
                &times;
              </button>
              <div className="NavLinks">
                <Link
                  to="/"
                  onClick={() => {
                    setNavSidebarVisible(false);
                  }}
                >
                  Landing Page
                </Link>
                <Link
                  to="/product-listing"
                  onClick={() => {
                    setNavSidebarVisible(false);
                  }}
                >
                  Product Listing
                </Link>
                <Link
                  to="/shopping-cart"
                  onClick={() => {
                    setNavSidebarVisible(false);
                  }}
                >
                  Shopping Cart
                </Link>
              </div>
              <br />
              <button
                className="NavBar-Cart"
                onClick={handleCartVisibility}
                aria-label="View cart"
              >
                <FontAwesomeIcon
                  icon={faCartShopping}
                  style={{
                    color: "#333",
                    fontSize: "1.5rem",
                    marginRight: "0.5rem",
                  }}
                />
                {totalItems > 0 && (
                  <span className="CartBadge">{totalItems}</span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Mobile Cart Sidebar */}
        {windowType === "mobile" && cartSidebarVisible && (
          <div className={`CartSidebar ${cartSidebarVisible ? "Visible" : ""}`}>
            <div className="CartSidebarContent">
              <button
                className="BackToNav"
                onClick={() => setCartSidebarVisible(false)}
                aria-label="Back to navigation menu"
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  style={{
                    color: "#333",
                    fontSize: "1.5rem",
                    marginRight: "0.5rem",
                  }}
                />
              </button>
              <h2>Your Cart</h2>
              {cart.length > 0 ? (
                <>
                  <button className="ClearCartButton" onClick={clearCart}>
                    Clear Cart
                  </button>
                  <ul>
                    {cart.map((item, index) => (
                      <li key={index}>
                        <span>
                          {item.name} - ${item.price.toFixed(2)} x{" "}
                          {item.quantity || 1}
                        </span>
                        <button onClick={() => removeFromCart(item.id)}>
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="EmptyCartMessage">Your cart is empty.</p>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default NavBar;
