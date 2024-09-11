import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
    return (
        <div className="HomePage">
           
            <h1 className="title">TeaLicious</h1>
            <div className="statement">Lorem ipsumLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essen</div>
            <Link to="/Products">
                <button className="button">Get started</button>
            </Link>
        </div>
    );
}

export default HomePage;

