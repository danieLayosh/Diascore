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
        <div >
            <h2>
                The platform <br /> <span>that will make your life easier</span>
            </h2>
        </div>
        <div>
          <p>
            Diascore revolutionizes the way you handle diagnostic tests, saving you up to half the time by automating test checks for parents and teachers and calculating scores effortlessly. 
            <br /><br />
            You can use Diascore in two convenient ways: send the test online or simply upload a picture of the completed test to the platform. 
            <br /><br />
            With Diascore, you will receive a detailed report of test results, providing valuable insights into the students performance.
          </p>

        </div>

        <LearnMoreBt />
      </div>
    );
  };

export default Home;
