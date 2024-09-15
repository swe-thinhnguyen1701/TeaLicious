import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import "./HomePage.css";

function HomePage() {
    return (
        <div className="home-page-image">
            <div className="home-page page">
                <h1 className="home-page-title">TeaLicious</h1>
                <div className="statement">
                    <span>Life </span>
                    <span>is </span>
                    <span>like </span>
                    <span>a </span>
                    <span>cup </span>
                    <span>of </span>
                    <span>tea. </span>
                    <span>It </span>
                    <span>is </span>
                    <span>all </span>
                    <span>about </span>
                    <span>how </span>
                    <span>you </span>
                    <span>make </span>
                    <span>it...</span>
                </div>
                <Link to="/products" className="link get-started-link">
                    GET STARTED <FontAwesomeIcon icon={faChevronRight} className="icon" />
                </Link>
            </div>
        </div>
    );
}

export default HomePage;

