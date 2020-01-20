/* eslint-disable no-undef */
/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable func-call-spacing */
/* eslint-disable arrow-body-style */
/* eslint-disable indent */
const firestore = () => {
    return {
        collection: (nameCollection) => {
            return {
                add: (objData) => {
                    return new Promise((resolve) => {
                        resolve('el doc. fue agregado');
                    });
                },
            };
        },
    };
};

const auth = () => {
    return {
        currentUser: {
            displayName: 'Yanira',
            email: 'arenazas@gmail.com',
            photoURL: 'https://photo.jpg',
            uid: 'aksdkahfuieew',
        },
    };
};

const firebase = {
    firestore: firestore,
    auth: auth,
};

export default jest.fn(() => {
    return firebase;
});
