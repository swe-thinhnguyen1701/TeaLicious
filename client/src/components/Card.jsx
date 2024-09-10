import { useState } from "react";
import { useQuery } from "@apollo/client";

function Card(product) {
  const cartId = localStorage.getItem("cart_id");

  const [quantity, setQuantity] = useState(1);
  const quantityChangeHandler = (e) => {
    setQuantity(parseInt(e.target.value()));
  }

  const addQuantityHandler = () => {
    if(quantity < product.stock) 
      setQuantity(quantity + 1);
  }

  const subQuantityHandler = () => {
    if(quantity > 1)
      setQuantity(quantity - 1);
  }

<<<<<<< HEAD
function Card() {
  function addtoCart () {
    console.log()

  }
  return (
    <div className="card-container">
      <img 
      className="card-img"
      src="" 
      alt="">
      </img>
      <h2 className="card-title">Product Name</h2>
      <p className="card-description">Product Description</p>
      <p className="card-price">Price</p>
      <button className="add-cart" onClick={addToCart}>Add to Cart</button>
=======
  return (
    <div className="card">
      <div className="card-img">
        <img src={product.image} alt="product image" />
      </div>
      <div className="card-info">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-price">{product.price}</p>
        <div className="quantity-container">
          <button onClick={subQuantityHandler}>-</button>
          <input type="number" id="quantity" value={1} onChange={quantityChangeHandler} min={0}/>
          <button onClick={addQuantityHandler}>+</button>
        </div>
        <button>Add to Cart</button>
      </div>
>>>>>>> 4c764ed (update Card)
    </div>
  );

}

export default Card;



