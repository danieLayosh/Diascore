import GreenCoverButton from "../components/buttons/GreenCoverButton";
import LearnMoreBt from "../components/buttons/LearnMoreBt";

const Home = () => {
  return (
    <div className="flex flex-col items-center bg-gradient-bg text-text-light min-h-screen px-4 sm:px-8">
      {/* Header Section */}
      <div className="flex justify-between items-center w-full px-4 sm:px-8 lg:px-12 py-4 bg-card-bg bg-opacity-70 rounded-lg shadow-lg">
        <h3 className="text-4xl sm:text-5xl font-island-moments text-primary-color">Diascore</h3>
        <div className="flex gap-4">
          <GreenCoverButton text="Log in" defaultColor="black" />
          <GreenCoverButton text="Sign up" defaultColor="white" />
        </div>
      </div>

      {/* Intro Section */}
      <div className="mt-16 sm:mt-24 text-center">
        <h2 className="text-4xl sm:text-5xl font-amaranth font-bold leading-tight">
          The platform <br /> <span className="text-primary-color">that will make your life easier</span>
        </h2>
      </div>

      {/* Description Section */}
      <div className="mt-10 sm:mt-16 max-w-3xl text-lg sm:text-xl text-center px-6">
        <p>
          Diascore revolutionizes the way you handle diagnostic tests, saving you up to half the time by automating test checks for parents and teachers and calculating scores effortlessly.
          <br /><br />
          You can use Diascore in two convenient ways: send the test online or simply upload a picture of the completed test to the platform.
          <br /><br />
          With Diascore, you will receive a detailed report of test results, providing valuable insights into the students performance.
        </p>
      </div>

      {/* Learn More Section */}
      <div className="mt-12">
        <LearnMoreBt />
      </div>
    </div>
  );
};

export default Home;
