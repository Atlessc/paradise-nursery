import React from 'react';
import './LandingPage.css';
import productsData from '../../data/productList.json';

function getRandomItems(array, numItems) {
  const shuffled = array.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numItems);
}

const LandingPage = () => {
  // Get 3 random products from each category
  const featuredProducts = productsData.categories.map((category) => ({
    categoryName: category.name,
    products: getRandomItems(category.products, 3),
  }));

  return (
    <div className="LandingPage-Container">
      {/* Hero Section */}
      <section className="HeroSection">
        <h1>Welcome to Paradise Nursery</h1>
        <p>Your one-stop shop for all your plant needs.</p>
        <button onClick={() => window.location.href = '/shop'}>Shop Now</button>
      </section>

      {/* Featured Products */}
      {featuredProducts.map((category) => (
        <section key={category.categoryName} className="FeaturedCategory">
          <h2>{category.categoryName}</h2>
          <div className="ProductGrid">
            {category.products.map((product) => (
              <div key={product.id} className="ProductCard">
                <img src={product.image} alt={product.name} width={100} />
                <h3>{product.name}</h3>
                <p>${product.price.toFixed(2)}</p>
                <button onClick={() => window.location.href = `/product/${product.id}`}>
                  View Details
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Additional Sections */}
      {/* About Us Section */}
      <section className="AboutUsSection">
        <h2>About Us</h2>
        <p>
          At Paradise Nursery, we are passionate about bringing the beauty of nature into your home.
          With a wide selection of plants and expert advice, we're here to help your garden thrive.
        </p>
      </section>

      {/* Testimonials Section */}
      <section className="TestimonialsSection">
        <h2>What Our Customers Say</h2>
        <div className="Testimonials">
          <blockquote>
            "Amazing selection of plants and excellent customer service!"
            <cite>– Jane D.</cite>
          </blockquote>
          <blockquote>
            "My go-to nursery for all my gardening needs."
            <cite>– John S.</cite>
          </blockquote>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="NewsletterSection">
        <h2>Stay Updated</h2>
        <p>Sign up for our newsletter to receive the latest news and exclusive offers.</p>
        <form className="NewsletterForm">
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>
      </section>
    </div>
  );
};

export default LandingPage;
