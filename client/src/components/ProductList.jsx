import { useContext } from "react";
import { CategoryContext } from "../utils/CategoryContext";
import Card from "./Card";

function ProductList() {
    const {categoryProducts} = useContext(CategoryContext);

    if(categoryProducts.length === 0)
        return <h2>No products found</h2>

    return(
        <div className="product-list">
            {categoryProducts.map(product => {
                return <Card key={product._id} product={product} />
            })}
        </div>
    )
}

export default ProductList;