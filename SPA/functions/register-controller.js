/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
import { createUserAuth } from './auth-firebase.js';
import { addInFirestore } from './post-firebase.js';


export const createUser = (event) => {
  event.preventDefault();
  const buttonRegister = event.target;
  const email = buttonRegister.closest('div').querySelector('[type=email]').value;
  const password = buttonRegister.closest('div').querySelector('[type=password]').value;
  const name = buttonRegister.closest('div').querySelector('[type=text]').value;
  const lastName = buttonRegister.closest('div').querySelector('#last-name').value;
  const errorMessage = buttonRegister.closest('div').querySelector('p');
  const space = ' ';
  const nameCompleteUser = name + space + lastName;

  if (email !== '' && password !== '') {
    createUserAuth(email, password)
      .then((result) => {
        const uidUser = result.user.uid;
        const dataUser = {
          name: nameCompleteUser,
          photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/800px-User_icon_2.svg.png',
          email: result.user.email,
        };
        addInFirestore('users', uidUser, dataUser);
        window.location.hash = '#/Catalogo';
      }).catch((error) => {
        const errorCode = error.code;

        switch (errorCode) {
          case 'auth/invalid-email':
            errorMessage.innerHTML = 'La dirección de correo electrónico no es válida.';
            break;
          case 'auth/email-already-in-use':
            errorMessage.innerHTML = 'La dirección de correo electrónico ya está en uso.';
            break;
          case 'auth/weak-password':
            errorMessage.innerHTML = 'La contraseña debe tener al menos 6 caracteres.';
            break;
          default:
            errorMessage.innerHTML = 'Se produjo un error';
        }
      });
  } else {
    errorMessage.innerHTML = 'Ingresar todos los campos';
  }
};
