import { firestore } from "../firebase"; // Corrected import path
import { collection, getDoc, getDocs, setDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { auth } from "../firebase"; // Corrected import path

// Collection reference
const usersCollection = collection(firestore, 'Users');

// Add a user
export const addUser = async (user, uid) => {
    try {
        const userDocRef = doc(firestore, 'Users', uid);
        await setDoc(userDocRef, user);
        console.log("User doc created successfully for UIS:", uid);
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
        const userDoc = doc(firestore, "users", id);
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
        const userDoc = doc(firestore, "users", id);
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
            console.error("No authenticated user found");
            return;
        }

        // Access the specific user's document
        const userDoc = doc(firestore, "Users", user.uid);
        const docSnapshot = await getDoc(userDoc);

        if (docSnapshot.exists()) {
            return { id: docSnapshot.id, ...docSnapshot.data() };
        } else {
            console.error("No user data found for the authenticated user");
            return null;
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
        const diagnoses = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return diagnoses;
    } catch (error) {
        console.error("Error getting the diagnoses sub collection:", error);
        throw error;
    }
}