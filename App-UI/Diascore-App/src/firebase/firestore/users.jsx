import { firestore } from "../firebase"; // Corrected import path
import { collection, getDoc, getDocs, setDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { auth } from "../firebase"; // Corrected import path

// Collection reference
const usersCollection = collection(firestore, 'Users');

// Add a user
export const addUserDoc = async (user) => {
    try {

        // Define the user object
        const newUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || '',
            createdAt: new Date(),
            diagnoses_count: 0,
        };

        // Add the user to the Users collection
        const userDocRef = doc(firestore, 'Users', user.uid);
        await setDoc(userDocRef, newUser);

        // create an empty Diagnoses subcollection for the user
        const diagnosesCollectionRef = collection(userDocRef, 'Diagnoses');

        await setDoc(doc(diagnosesCollectionRef, 'exampleDiagnosis'), {
            title: 'Example Diagnosis',
            description: 'This is a placeholder diagnosis.',
            createdAt: new Date(),
        });

        console.log("User doc created successfully for UIS:", user.uid);
    } catch (e) {
        console.error("Error creating user document: ", e);
        throw e;
    }
}

// Get all users
export const getUsers = async () => {
    try {
        const querySnapshot = await getDocs(usersCollection);
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error getting users: ", error);
        throw error;
    }
};

// Update a user
export const updateUser = async (id, data) => {
    try {
        const userDoc = doc(firestore, "Users", id);
        await updateDoc(userDoc, data);
        console.log("User updated successfully");
    } catch (error) {
        console.error("Error updating user: ", error);
        throw error;
    }
};

// Delete a user
export const deleteUser = async (id) => {
    try {
        const userDoc = doc(firestore, "Users", id);
        await deleteDoc(userDoc);
        console.log("User deleted successfully");
    } catch (error) {
        console.error("Error deleting user: ", error);
        throw error;
    }
};

export const getAuthenticatedUserData = async () => {
    try {
        const user = auth.currentUser; // Get the currently authenticated user
        if (!user) {
            throw new Error("No authenticated user found");
        }

        // Access the specific user's document
        const userDoc = doc(firestore, "Users", user.uid);
        const docSnapshot = await getDoc(userDoc);

        if (docSnapshot.exists()) {
            return { id: docSnapshot.id, ...docSnapshot.data() };
        } else {
            throw new Error("No user data found for the authenticated user");
        }

    } catch (error) {
        console.error("Error fetching authenticated user's data: ", error);
        throw error;
    }
};

export const getDiagnosesForUser = async (userId) => {
    try {
        // Reference the Diagnoses collection for the specific user
        const diagnosesCollection = collection(firestore, `Users/${userId}/Diagnoses`);
        
        // Fetch through the doc and return the data
        const querySnapshot = await getDocs(diagnosesCollection);

        // Map through the query snapshot and return the data
        const Diagnoses = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return Diagnoses || [];
    } catch (error) {
        console.error("Error getting the Diagnoses sub collection:", error);
        throw error;
    }
}