import "./Home.css";
import GreenCoverButton from "../components/buttons/GreenCoverButton";
import LearnMoreBt from "../components/buttons/LearnMoreBt";

const Home = () => {
    return (
      <div>
        <div className="home-cover">
            <h3>Diascore</h3>
          <div className="button-group">
            <GreenCoverButton text="Log in" defaultColor="black" />
            <GreenCoverButton text="Sign up" defaultColor="white" />
          </div>
        </div>
        <div className="home-cover-image">
            <h2>
                The platform <br /> <span>that will make your life easier</span>
            </h2>
        </div>

        <LearnMoreBt />
      </div>
    );
  };

export default Home;
