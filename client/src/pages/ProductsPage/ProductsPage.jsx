import { useEffect } from "react";
import CategoryList from "../../components/CategoryList";
import ProductList from "../../components/ProductList";
import { CategoryProvider } from "../../utils/CategoryContext";
import { useMutation } from "@apollo/client";
import { NEW_CART, SYNC_CART } from "../../utils/mutations";

function ProductsPage() {
    const [newCart] = useMutation(NEW_CART);
    const [syncCart] = useMutation(SYNC_CART);

    useEffect(() => {
        let cartId = localStorage.getItem("cart_id");
        if (!cartId) {
            console.log("no cart");
            newCart().then(res => {
                localStorage.setItem("cart_id", res.data.newCart._id);
            });   
        }else{
            syncCart({variables: {cartId: cartId}}).then(res => {
                localStorage.setItem("cart_id", res.data.syncCart.cartId);
            });
        }
    }, [newCart, syncCart]);


    return (
        <CategoryProvider>
            <section className="page">
                <CategoryList />
                <ProductList />
            </section>
        </CategoryProvider>
    )

}

export default ProductsPage;