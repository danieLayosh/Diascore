import { auth } from './firebase';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider,  } from 'firebase/auth';

// Sign Up
export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Sign In
export const doSignInWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Sign In With Google
export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await auth.signInWithPopup(auth, provider);

    // This gives you a Google Access Token. You can use it to access the Google API.
    // result.user
    return result;
};

// Sign Out
export const doSignOut = () => {
  return auth.signOut();
}

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