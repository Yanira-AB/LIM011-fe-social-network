/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import { authFace } from '../SPA/functions/auth-firebase.js';
import { addCommentFirestore } from '../SPA/functions/post-firebase.js';
import { userActual } from '../SPA/functions/controller-firebase';

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

describe('Agregar comentario', () => {
  it('debería ser una función', () => {
    expect(typeof authFace).toBe('function');
  });
  it('debería poder iniciar sesión con facebook', () => authFace()
    .then((users) => {
      console.log(users);
      expect(users).not.toBe(null);
    }));
  it('deberia retornar un obj con datos de usuario actual', () => {
    expect(userActual()).toStrictEqual({
      email: undefined, name: undefined, photoUrl: undefined, uid: undefined,
    });
  });
  it('debería ser una función que agregue un documento a la colección de "publicaciones', (done) => addCommentFirestore('hola', 'publica').then((data) => {
    console.log(data.data);
    expect(data.data.contenido).toBe('hola');
    done();
  }));
});
