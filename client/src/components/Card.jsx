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
    </div>
  );

}


export default Card;