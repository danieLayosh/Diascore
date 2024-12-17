import { useState } from "react";
import GreenCoverButton from "../components/buttons/GreenCoverButton";
import LearnMoreBt from "../components/buttons/LearnMoreBt";
import { SignIn } from "../components/auth/SignIn";
import { Dialog } from "@mui/material";

const Home = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLoginClick = () => {
    setIsSignUp(false); // Set the modal to show Log In
    setIsLoginModalOpen(true); // Open the login modal
  };

  const handleSignupClick = () => {
    setIsLoginModalOpen(true); // Open the login modal
    setIsSignUp(true); // Set the modal to show Sign Up
  };

  const handleLearnMoreClick = () => {
    console.log("Learn more clicked");
    // Implement Learn More functionality
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false); // Close the login modal
  };

  return (
    <div className="flex flex-col items-start w-screen bg-gradient-bg text-text-light min-h-screen ">
      {/* Header Section */}
      <div className="flex justify-between items-center w-full px-4 sm:px-12 lg:px-12 py-4 bg-card-bg shadow-lg">
        <h3 className="text-4xl sm:text-5xl lg:text-6xl font-island-moments text-primary-color font-semibold">Diascore</h3>
        {/* Login and Signup buttons Section */}
        <div className="flex gap-4">
          <GreenCoverButton text="Log in" defaultColor="black" onClick={handleLoginClick} />
          <GreenCoverButton text="Sign up" defaultColor="white" onClick={handleSignupClick} />
        </div>
      </div>

      {/* Intro Section */}
      <div className="mt-16 sm:mt-24 text-left mx-auto sm:mx-auto lg:mx-auto ">
        <h2 className="text-2xl lg:text-6xl sm:text-4xl font-amaranth font-bold leading-tight">
          The platform <br /> <span className="text-light-primary pl-2 sm:pl-12 lg:pl-48">that will make your life easier!</span>
        </h2>
      </div>

      <div className="mt-10 sm:mt-16 text-lg sm:text-2xl lg:text-3xl text-left p-5 sm:p-6 lg:p-8 bg-card-bg shadow-lg max-w-5xl  mx-4 sm:mx-8 lg:mx-auto  rounded-3xl">
        <p className="font-amaranth">
          Diascore revolutionizes the way you handle diagnostic tests, saving you up to half the time by automating test checks for parents and teachers and calculating scores effortlessly.
          <br /><br />
          You can use Diascore in two convenient ways: send the test online or simply upload a picture of the completed test to the platform.
          <br /><br />
          With Diascore, you will receive a detailed report of test results, providing valuable insights into the students performance.
        </p>
      </div>

      {/* Learn More Section Button */}
      <div className="mt-12 sm:mt-xl lg:mt-2xl mx-auto">
        <LearnMoreBt mode="dark" onClick={handleLearnMoreClick}/>
      </div>

      {/* Login Modal */}
      <Dialog
        open={isLoginModalOpen}
        onClose={closeLoginModal}
        className="backdrop-blur-sm fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="bg-white p-4 rounded-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <SignIn onClose={closeLoginModal} isSignUp={isSignUp} />
        </div>
      </Dialog>
    </div>
  );
};

export default Home;
