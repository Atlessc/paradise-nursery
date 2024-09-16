import React from 'react';
import { Link } from 'react-router-dom';
import './ProductListing.css';
import productsData from '../../data/productList.json';
import useStore from '../../ZustandStore';

const ProductListing = () => {
  const addToCart = useStore(state => state.addToCart);

  return (
    <div className="ProductListing-Container">
      <h1>Our Products</h1>
      {productsData.categories.map(category => (
        <section key={category.id} className="ProductCategory">

          <h2>{category.name}</h2>
          
          <div className="ProductGrid">
            {category.products.map(product => (

              <div key={product.id} className="ProductCard">

                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                </Link>
                
                <h3>{product.name}</h3>
                
                <p>${product.price.toFixed(2)}</p>
                
                <div className="ButtonGroup">
                  <button onClick={() => addToCart(product)}>+ Cart</button>
                  <Link to={`/product/${product.id}`}>
                    <button>View Details</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ProductListing;
