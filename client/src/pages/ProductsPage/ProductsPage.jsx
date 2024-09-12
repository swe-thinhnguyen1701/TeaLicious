import CategoryList from "../../components/CategoryList";
import ProductList from "../../components/ProductList";
import { CategoryProvider } from "../../utils/CategoryContext";

function ProductsPage() {
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