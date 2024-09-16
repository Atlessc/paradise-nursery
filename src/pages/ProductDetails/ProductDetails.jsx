import React from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../ZustandStore';
import productsData from '../../data/productList.json';
import './ProductDetails.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const addToCart = useStore((state) => state.addToCart);

  // Find the product by ID
  const product = productsData.categories
    .flatMap((category) => category.products)
    .find((item) => item.id === parseInt(productId));

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="ProductDetails-Container">
      <div className="ProductDetails-Image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="ProductDetails-Info">
        <h1>{product.name}</h1>
        <p className="ProductDetails-Price">${product.price.toFixed(2)}</p>
        <p className="ProductDetails-Description">{product.description}</p>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;
