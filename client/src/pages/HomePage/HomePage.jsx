import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
    return (
        <div className="HomePage">

            <h1 className="title">TeaLicious</h1>
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
            <Link to="/Products">
                <button className="button">GET STARTED</button>
            </Link>
        </div>
    );
}

export default HomePage;

