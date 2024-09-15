/* eslint-disable no-undef */
import ProductDetail from "../../components/ProductDetail";
import { useParams } from "react-router-dom";
import './ItemPage.css';

function ItemPage() {
    const { id:productId } = useParams();
    return (
        <div className="item-page">
            <ProductDetail productId={productId} />
        </div>
    )
}

export default ItemPage;