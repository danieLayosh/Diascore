import { firestore } from "../firebase";
import { collection, query, where, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { auth } from "../firebase/firebase";

// Collection reference
const usersCollection = collection(firestore, 'Users');

// Add a user
export const addUser = async (user) => {
    try {
        const docRef = await addDoc(usersCollection, user);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
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

        const usersCollection = collection(firestore, "Users");
        const q = query(usersCollection, where("uid", "==", user.uid)); // Query where uid matches
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            console.log(`Document ID: ${doc.id}, Data:`, doc.data());
        });

        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching authenticated user's data: ", error);
        throw error;
    }
};