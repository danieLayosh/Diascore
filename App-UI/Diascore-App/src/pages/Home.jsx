import GreenCoverButton from "../components/buttons/GreenCoverButton";
import LearnMoreBt from "../components/buttons/LearnMoreBt";

const Home = () => {
  const handleLoginClick = () => {
    // Your login logic here
    console.log("Login clicked");
  };

  const handleSignupClick = () => {
    // Your signup logic here
    console.log("Signup clicked");
  };

  const handleLearnMoreClick = () => {
    // Your learn more logic here
    console.log("Learn more clicked");
  };

  return (
    <div className="flex flex-col items-start w-screen bg-gradient-bg text-text-light min-h-screen ">
      {/* Header Section */}
      <div className="flex justify-between items-center w-full px-4 sm:px-12 lg:px-12 py-4 bg-card-bg shadow-lg">
        <h3 className="text-5xl sm:text-6xl font-island-moments text-primary-color font-semibold">Diascore</h3>
        {/* Login and Signup buttons Section */}
        <div className="flex gap-4">
          <GreenCoverButton text="Log in" defaultColor="black" onClick={handleLoginClick} />
          <GreenCoverButton text="Sign up" defaultColor="white" onClick={handleSignupClick} />
        </div>
      </div>

      {/* Intro Section */}
      <div className="mt-16 sm:mt-24 text-left mx-auto sm:mx-auto lg:mx-auto ">
        <h2 className="text-2xl lg:text-6xl sm:text-4xl font-amaranth font-bold leading-tight">
          The platform <br /> <span className="text-light-primary pl-12 sm:pl-4 lg:pl-48">that will make your life easier!</span>
        </h2>
      </div>

      <div className="mt-10 sm:mt-16 text-xl sm:text-2xl lg:text-3xl text-left p-5 sm:p-6 lg:p-8 bg-card-bg shadow-lg max-w-5xl  mx-4 sm:mx-8 lg:mx-auto  rounded-3xl">
        <p className="font-amaranth">
          Diascore revolutionizes the way you handle diagnostic tests, saving you up to half the time by automating test checks for parents and teachers and calculating scores effortlessly.
          <br /><br />
          You can use Diascore in two convenient ways: send the test online or simply upload a picture of the completed test to the platform.
          <br /><br />
          With Diascore, you will receive a detailed report of test results, providing valuable insights into the students performance.
        </p>
      </div>


      {/* Learn More Section Button */}
      <div className="mt-12 mx-auto">
        <LearnMoreBt mode="dark" onClick={handleLearnMoreClick}/>
      </div>
    </div>
  );
};

export default Home;
