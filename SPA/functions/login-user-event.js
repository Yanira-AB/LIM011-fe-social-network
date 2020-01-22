/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
/* eslint-disable import/no-cycle */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { logInUser } from './auth-firebase.js';

export const loginUserEvent = (event) => {
  event.preventDefault();
  const buttonLogin = event.target;
  const email = buttonLogin.closest('form').querySelector('input[type=email]').value;
  const password = buttonLogin.closest('form').querySelector('input[type=password]').value;
  const errorMessage = buttonLogin.closest('div').querySelector('#errorMensaje');

  if (email !== '' && password !== '') {
    logInUser(email, password)
      .then(() => {
        window.location.hash = '#/Catalogo';
      }).catch((error) => {
        const errorCode = error.code;
        switch (errorCode) {
          case 'auth/invalid-email':
            errorMessage.innerHTML = 'El correo electrónico no es válido';
            break;
          case 'auth/user-disabled':
            errorMessage.innerHTML = 'El usuario ha sido deshabilitado de la base de datos';
            break;
          case 'auth/user-not-found':
            errorMessage.innerHTML = 'No se encontró ningún usuario con ese correo electrónico';
            break;
          case 'auth/wrong-password':
            errorMessage.innerHTML = 'La contraseña es incorrecta.';
            break;
          default:
            errorMessage.innerHTML = 'Se produjo un error';
            break;
        }
      });
  } else {
    errorMessage.innerHTML = 'Ingrese todos los campos.';
  }
};

/* export const getDataUser = (id, call) => {
  const docRef = firebase.firestore().collection('users').doc(id);

  docRef.get().then((doc) => {
    if (doc.exists) {
      console.log('Document data:', doc.data());
      console.log('Document data:', doc.data().name);
      call(doc.data());
    }
    console.log('No such document!');
  }).catch((error) => {
    console.log('Error getting document:', error);
  });
}; */
