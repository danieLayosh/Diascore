// import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import ProfileButton from "../../components/buttons/ProfileButton"; 
import useAlert from "../../context/useAlert"; 
import Loader from "../../components/Loader"; 
import ActionNewDiagnosis from "../../components/dropdown/ActionNewDiagnosis";
import NewDiagnosisForm from "../../components/forms/NewDiagnosisForm";

const NewDiagnosis = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/welcome');
            showAlert("You have been successfully logged out", "success");
        } catch (error) {
            showAlert("Error signing out", "error");
            console.error('Error signing out:', error);
        }
    };

    if (loading) {
        return <div className="flex h-screen items-center justify-center size-max w-screen bg-slate-900"> <Loader/> </div>;
    }

    return (
        <div className="flex flex-col items-start w-screen bg-gradient-bg text-text-light min-h-screen">
            {/* Header Section */}
            <div className="flex justify-between items-center w-full px-4 sm:px-12 lg:px-12 py-4 bg-card-bg shadow-lg">
                <h3 className="text-5xl sm:text-6xl font-island-moments text-primary-color font-semibold">Diascore</h3>
                <div className="flex gap-6">
                    <ActionNewDiagnosis />
                    <ProfileButton 
                        fill="currentColor" 
                        size={24}     
                        className="transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-primary-color"    
                        onClick={handleSignOut}                
                    />
                </div>
            </div>

            <NewDiagnosisForm />
            
        </div>
    );
};

export default NewDiagnosis;
