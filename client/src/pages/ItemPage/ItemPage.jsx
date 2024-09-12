/* eslint-disable no-undef */
import ProductDetail from "../../components/ProductDetail";
import { useParams } from "react-router-dom";

function ItemPage() {
    const { id:productId } = useParams();
    return (
        <div className="page">
            <ProductDetail productId={productId} />
        </div>
    )
}

export default ItemPage;