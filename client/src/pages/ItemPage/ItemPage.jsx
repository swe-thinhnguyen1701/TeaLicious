/* eslint-disable no-undef */
import ProductDetail from "../../components/ProductDetail";
import { useParams } from "react-router-dom";
import './ItemPage.css';
import { CategoryProvider } from "../../utils/CategoryContext";

function ItemPage() {
    const { id:productId } = useParams();
    return (
        <div className="item-page">
            <CategoryProvider>
                <ProductDetail productId={productId} />
            </CategoryProvider>
        </div>
    )
}

export default ItemPage;