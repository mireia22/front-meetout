import { Link } from "react-router-dom";
import "./Welcome.css";
const WelcomeComp = () => {
  return (
    <section className="welcome">
      <article>
        <h3>WELCOME !</h3>
      </article>
      <article>
        <Link to="/findEvent" className="welcome-link">
          Find Event
        </Link>
        <Link to="/register" className="welcome-link">
          Join MeetOut
        </Link>
      </article>
      <article>
        <h5>
          Discover exciting activities happening near you and connect with
          like-minded individuals who share your passion for sports.
        </h5>
      </article>
    </section>
  );
};

export default WelcomeComp;
