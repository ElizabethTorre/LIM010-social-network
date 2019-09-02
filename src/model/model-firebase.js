// eslint-disable-next-line max-len
export const loginEmail = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

// eslint-disable-next-line max-len
export const loginRegister = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

export const loginOut = () => firebase.auth().signOut();

export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const loginFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const currentUser = () => firebase.auth().currentUser;
// export {
//   loginEmail,
//   loginRegister,
//   loginOut,
//   loginGoogle,
//   loginFacebook,
//   currentUser,
// };
