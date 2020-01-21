/* eslint-disable arrow-body-style */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
import { changeView } from '../view-controler/index.js';

export const initFire = () => {
  firebase.auth().onAuthStateChanged((user) => {
    console.log('gsddgs', user);
    if (user) {
      console.log('conectado');
      changeView('#/catalogo');
    } else {
      console.log('El usuario NO stá conectado');
      changeView('');
    }
  });
};

// Crear usuario con email y password
export const createUserAuth = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

// Loguearse con email y password
export const logInUser = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

// Auth con Facebook
export const authFace = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

// Auth con Google
export const authGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const outUser = () => firebase.auth().signOut();
