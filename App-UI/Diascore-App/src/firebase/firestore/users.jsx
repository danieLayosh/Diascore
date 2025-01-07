import { collection, getDoc, getDocs, setDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase"; 

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

// Update a user
export const updateUser = async (user) => {
    try {
        const userDocRef = doc(firestore, 'Users', user.uid);
        await updateDoc(userDocRef, user.data);
        console.log("User updated successfully");
    } catch (error) {
        console.error("Error updating user: ", error);
        throw error;
    }
};

// Update user's display name
export const updateDisplayName = async (user) => {
    try {

        // Reference the user document
        const userDocRef = doc(firestore, 'Users', user.uid);

        // Get the current display name
        const prevDiaplayName = (await getDoc(userDocRef)).data().displayName;

        if (prevDiaplayName === user.displayName) {
            console.log("User display name is already up to date");
            return;
        }

        // Update the display name
        await updateDoc(userDocRef, { displayName: user.displayName });

        // Get the updated display name
        const currentDiaplayName = (await getDoc(userDocRef)).data().displayName;
        
        // Check if the display name was updated successfully
        if (prevDiaplayName !== currentDiaplayName) {
            console.log("User display name was chaneged and updated successfully");
        }
    } catch (error) {
        console.error("Error updating user display name: ", error);
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

export const getAuthenticatedUserDataWithDiagnoses = async () => {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error("No authenticated user found");
        }
        // console.log("Fetching data for user UID:", user.uid);

        // Access the specific user's document
        const userDocRef = doc(firestore, "Users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            throw new Error("No user data found for the authenticated user: ${user.uid}");
        }

        const userData = userDoc.data();
        // console.log("User data:", userData);

        // Access the Diagnoses sub-collection for the specific user
        const diagCollectionRef = collection(userDocRef, "Diagnoses");
        const diagSnapshot = await getDocs(diagCollectionRef);

        // Map through the query snapshot and return the data
        const diagnoses = diagSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return { userData, diagnoses };
    } catch (error) {
        console.error("Error fetching authenticated user's data with diagnoses: ", error);
        throw error;
    }
};