import CategoryList from "../../components/CategoryList";
import ProductList from "../../components/ProductList";
import { CategoryProvider } from "../../utils/CategoryContext";
import image from "../../assets/images/image-1.jpg";
function ProductsPage() {
    const product = {
        name: "TeaLicious",
        description: "A place for all your tea needs",
        image: image,
        price: 9.99,
        stock: 10
    }
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