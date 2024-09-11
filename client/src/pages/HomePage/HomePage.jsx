import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
           return (
        <div className="HomePage">
           
            <h1 className="title">TeaLicious</h1>
            <div className="statement">Life is like a cup of tea. It's all about how you make it...</div>
            <Link to="/Products">
                <button className="button">Get started</button>
            </Link>
        </div>
    );
}

export default HomePage;

