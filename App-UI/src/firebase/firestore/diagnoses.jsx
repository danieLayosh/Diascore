import { collection, getDoc, addDoc, doc } from "firebase/firestore";
import { auth, firestore } from "../firebase"; 

export const addNewDiagnosticData = async (diagnosticData) => {
    console.log("Adding new diagnostic data:", diagnosticData);
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error("No authenticated user found");
        }

        // Access the specific user's document
        const userDocRef = doc(firestore, "Users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            throw new Error("No user data found for the authenticated user: ${user.uid}");
        }
        // Access the Diagnoses sub-collection for the specific user
        const diagCollectionRef = collection(userDocRef, "Diagnoses");

        const newDiagRef = await addDoc(diagCollectionRef, diagnosticData);
        console.log("New diagnostic data added with ID:", newDiagRef.id);

        return { id: newDiagRef.id, ...diagnosticData };
    } catch (error) {
        console.error("Error adding new diagnostic data:", error);
        throw error;
    }
};