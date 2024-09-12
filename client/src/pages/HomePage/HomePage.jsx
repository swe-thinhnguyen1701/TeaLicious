import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons"
import "./HomePage.css";
import img from "../../assets/images/image-1.jpg"

function HomePage() {
    return (
        // <div className="home-page page">
        //     <h1 className="home-page-title">TeaLicious</h1>
        //     <div className="home-page-statement">Lorem ipsumLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essen</div>

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
            {/* <div className="container">
            </div> */}
            <div className="home-page-img-container">
                <img src={img} alt="home page image" className="home-page-img" />
            </div>
            <Link to="/products" className="link get-started-link">
                GET STARTED <FontAwesomeIcon icon={faChevronRight} className="icon" />
            </Link>
        </div>
    );
}

export default HomePage;

