import Header from "../../components/Header";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
    return (
        <div className="HomePage">
            <Header showAuthButtons={true} showCategories={true} />
            <h1 className="title">TeaLicious</h1>
            <div className="statement">Lorem ipsum</div>
            <Link to="/Products">
                <button className="button">Get started</button>
            </Link>
        </div>
    );
}

export default HomePage;

{/*THIS CODE SHOULD BE INSERTED IN THE PRODUCTS.JSX:
import Header from "./Header";
import Navbar from "./Navbar";
import "./ProductsPage.css";

function ProductsPage() {
    return (
        <div className="ProductsPage">
            <Header showAuthButtons={false} showCategories={true} />
            <Navbar />
            
        </div>
    );
}

export default ProductsPage; */}
