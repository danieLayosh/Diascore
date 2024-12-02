import { auth } from './firebase';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider,  } from 'firebase/auth';

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

// Sign In With Google
export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await auth.signInWithPopup(auth, provider);

    // This gives you a Google Access Token. You can use it to access the Google API.
    // result.user
    return result;
}

// Sign Out
export const doSignOut = () =>
  auth.signOut();

// // Password Reset
// export const doPasswordReset = email =>
//   auth.sendPasswordResetEmail(email);

// // Password Change
// export const doPasswordUpdate = password =>
//   auth.currentUser.updatePassword(password);


// // email verification
// export const doSendEmailVerification = () =>
//   auth.currentUser.sendEmailVerification({
//     url: 'http://localhost:3000',
//   });