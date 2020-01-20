/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable import/first */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
/* import MockFirebase from '../_mocks_/firebase-mock.js';

global.firebase = MockFirebase(); */
import MockFirebase from 'mock-cloud-firestore';

const fixtureData = {
  __collection__: {
    publicaciones: {
      __doc__: {
        abc123: {
          id: 'user1abc12345',
          nombre: 'Yanira',
          contenido: 'texto',
          fecha: '18/01/2020',
          hora: '02:20',
          likesTotal: 0,
          userLikes: [],
          fechaYhora: 18,
          privacidad: 'publica',
        },
      },
    },
  },
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

import { addCommentFirestore } from '../SPA/functions/post-firebase.js';

describe('addCommentFirestore', () => {
  it('debería ser una función', () => {
    expect(typeof addCommentFirestore).toBe('function');
  });
  it('debería ser una función que agregue un documento a la colección de "publicaciones', (done) => addCommentFirestore('hola', 'publica').then((data) => {
    console.log(data);
    expect(data).toBe('el doc. fue agregado');
  }));
});
