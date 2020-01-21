/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import { authFace, createUserAuth, authGoogle } from '../SPA/functions/auth-firebase.js';
import { addCommentFirestore } from '../SPA/functions/post-firebase.js';
// import { userActual } from '../SPA/functions/controller-firebase';

const firebasemock = require('firebase-mock');


const mockauth = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();
mockfirestore.autoFlush();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
  () => mockfirestore,
);

describe('Iniciar sesión', () => {
  it('debería poder iniciar sesión con facebook', () => authFace()
    .then((users) => {
      console.log(users);
      expect(users).not.toBe(null);
    }));
  it('debería poder iniciar sesión con Google', () => authGoogle()
    .then((users) => {
      console.log(users);
      expect(users).not.toBe(null);
    }));
  it('debería crear un usuario con email y contraseña', (done) => createUserAuth('arenazas@gmail.com', '12345678')
    .then((user) => {
      console.log(user);
      expect(user.email).toBe('arenazas@gmail.com');
      done();
    }));
  /*   it('deberia retornar un obj con datos de usuario actual', () => {
    expect(userActual()).toStrictEqual({
      email: undefined, name: undefined, photoUrl: undefined, uid: undefined,
    });
  }); */
});


describe('Comentarios en la colección "publicaciones"', () => {
  it('debería ser una función que agregue un documento a la colección de "publicaciones', (done) => addCommentFirestore('hola', 'publica').then((data) => {
    console.log(data.data);
    expect(data.data.contenido).toBe('hola');
    done();
  }));
});
