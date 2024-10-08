import { useEffect } from "react";
import CategoryList from "../../components/CategoryList";
import ProductList from "../../components/ProductList";
import { CategoryProvider } from "../../utils/CategoryContext";
import { useMutation } from "@apollo/client";
import { NEW_CART, SYNC_CART } from "../../utils/mutations";
import "./ProductsPage.css";

function ProductsPage() {
    const [newCart] = useMutation(NEW_CART);
    const [syncCart] = useMutation(SYNC_CART);

    useEffect(() => {
        let cartId = localStorage.getItem("cart_id");
        const tokenId = localStorage.getItem("token");
        if (!cartId) {
            newCart().then(res => {
                localStorage.setItem("cart_id", res.data.newCart._id);
            });
        } else {
            if (tokenId) {
                syncCart({ variables: { cartId: cartId } }).then(res => {
                    localStorage.setItem("cart_id", res.data.syncCart.cart._id);
                });
            }
        }
    }, [newCart, syncCart]);


    return (
        <CategoryProvider>
            <section className="page product-page">
                <CategoryList />
                <ProductList />
            </section>
        </CategoryProvider>
    )

}

export default ProductsPage;