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

export const getDiagnosticDataByUUID = async (uuid) => {
    console.log("Getting diagnostic data by UUID:", uuid);
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

        const diagSnapshot = await getDoc(doc(diagCollectionRef, uuid));
        if (diagSnapshot.exists()) {
            return { id: diagSnapshot.id, ...diagSnapshot.data() };
        } else {
            throw new Error("No diagnostic data found for the UUID: ${uuid}");
        }
    } catch (error) {
        console.error("Error getting diagnostic data by UUID:", error);
        throw error;
    }
};