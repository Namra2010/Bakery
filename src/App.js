import React, { useState } from 'react';
import './App.css'
const BakeryHomepage = () => {

  const products = [{ name: 'Chocolate Chip Cookies', description: 'Our classic chocolate chip cookies are soft, chewy, and bursting with chocolate flavor. Made with premium ingredients, these cookies are sure to satisfy your sweet tooth.', image: 'https://images.unsplash.com/photo-1605243614624-277f48f46d52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', id: 1, quantity: 50, price: 50, }, { name: 'Blueberry Muffins', description: "Indulge in the sweet and tangy flavors of our freshly baked blueberry muffins. Made with juicy blueberries and topped with a sweet crumb topping, these muffins are a breakfast treat you won't be able to resist.", image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', id: 2, quantity: 50, price: 100 }, { name: 'Cinnamon Rolls', description: 'Wake up to the heavenly aroma of our warm and gooey cinnamon rolls. Made with a soft, fluffy dough and packed with a cinnamon-sugar filling, these rolls are the perfect indulgence for any occasion.', image: 'https://images.unsplash.com/photo-1583527976767-5399024eeb05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', id: 3, quantity: 50, price: 150 }, { name: 'CupCakes', description: 'Indulge in our delicious cupcakes, made with moist and fluffy cake and topped with creamy frosting. Choose from a variety of flavors, including vanilla, chocolate, and red velvet.', image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80', id: 4, quantity: 50, price: 200 }]

  const [cart, setCart] = useState([]);
  const [checkout, setCheckout] = useState({ items: cart, finalPrice: 0 })

  const addToCart = (product) => {
    let updated = false;
    const newCart = cart.map(item => {
      if (item.id === product.id) {
        updated = true;
        return { id: product.id, quantity: item.quantity + 1, name: product.name, price: item.price + product.price };
      }
      return item;
    });
    if (!updated) {
      newCart.push({ id: product.id, quantity: 1, name: product.name, price: product.price });
    }
    setCart(newCart);

  }

  const deleteFromCart = (product) => {
    const newCart = cart.map(item => {
      if (item.id === product.id) {
        if (item.quantity > 1) {
          return { id: product.id, quantity: item.quantity - 1, name: product.name, price: item.price - product.price };
        }
        return null;
      }
      return item;
    });
    setCart(newCart.filter(item => item !== null));
  }

  const calcPrice = (cart) => {
    console.log(cart)
    let finalPrice = 0
    for (let i = 0; i < cart.length; i++) {
      finalPrice += cart[i].price
    }
    console.log(finalPrice)
    setCheckout({ ...checkout, finalPrice })
  }
  console.log(cart)

  return (
    <div>
      <h1>Welcome to Our Bakery</h1>
      <h2>Featured Products:</h2>
      <div className="products">
        {products.map((product) => (
          <Product
            name={product.name}
            image={product.image}
            key={product.id}
            description={product.description}
            addToCart={() => addToCart(product)}
            deleteFromCart={() => deleteFromCart(product)}
          />
        ))}
      </div>
      <h2>Your Cart:</h2>
      <ul>
        {cart.map(product => (
          <li key={product.id}>{product.name} ------- {product.quantity}</li>
        ))}
        {cart.length > 0 ? <button onClick={() => calcPrice(cart)}>Checkout</button> : <></>}
      </ul>
      <h2>Final Checkout:</h2>
      <ul>
        {checkout.items.map(product => (
          <li key={product.id}>{product.name} ------- {product.quantity}</li>
        ))}
        {checkout.finalPrice > 0 ? <li>Final Price ------- {checkout.finalPrice}</li> : <></>}
      </ul>

    </div>
  );
}

const Product = ({ name, description, addToCart, deleteFromCart, image }) => (
  <>
    <div className="product">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>{description}</p>
      <button onClick={addToCart}>Add to Cart</button>
      <button onClick={deleteFromCart}>Delete from Cart</button>
    </div>
  </>
);

export default BakeryHomepage;