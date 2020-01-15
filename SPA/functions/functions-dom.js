/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
import {
  deleteComment, editCommentDom, saveNewComment, likeMoreUpdate, likeLessUpdate, printLike,
} from './post-firebase.js';

// Modal para foto
export const closeModal = (modal) => {
  modal.style.display = 'none';
};
export const showModal = (contenido, foto, modal) => {
  contenido.src = '';
  contenido.src = foto;
  modal.style.display = 'flex';
};
export const closeGrey = (modal) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

export const addZero = (num) => {
  let result = 0;
  if (num < 10) {
    result = `0${num}`;
    return result;
  }
  return num;
};

export const time = (obj) => {
  const date = {
    day: addZero(obj.getDate()),
    month: addZero(obj.getMonth() + 1),
    year: obj.getFullYear(),
    hours: addZero(obj.getHours()),
    minutes: addZero(obj.getMinutes()),
  };
  return date;
};

export const createComment = (container, doc) => {
  const divContainer = document.createElement('div');
  divContainer.setAttribute('id', doc.id);
  divContainer.classList.add('coment');
  const comment = `
            <div class="title-note">
            <p>Publicado por ${doc.data.nombre}  - ${doc.data.hora} del ${doc.data.fecha} </p><i class="eliminar fas fa-times"></i>
            </div>
              <textarea class="text-coment">${doc.data.contenido}</textarea>
            <div class="section-btns-note">
              <button class='like btns-note ${printLike(doc) ? 'btnLikeOn' : 'btnLikeOff'}'>${doc.data.likesTotal}</button>
              <button class="photo btns-note"><i class="fas fa-share icons-white"></i></button>
                <select class="comboPrivacy btns-noteEdit">
                <option value="publica">Pública</option>
                <option value="privada">Privada</option>
              </select>
              <button class="save btns-noteEdit hide">Guardar</button>
              <button class="edit btns-noteEdit">Editar</button>
            </div>
         `;
  divContainer.innerHTML = comment;
  const btnDelete = divContainer.querySelector('.eliminar');
  const texto = divContainer.querySelector('.text-coment');
  const edit = divContainer.querySelector('.edit');
  const save = divContainer.querySelector('.save');
  const privacy = divContainer.querySelector('.comboPrivacy');
  const btnLike = divContainer.querySelector('.like');

  privacy.value = doc.data.privacidad;
  texto.disabled = true;
  privacy.disabled = true;

  btnLike.addEventListener('click', () => {
    const boolean = btnLike.classList.contains('btnLikeOn');
    if (boolean) {
      likeLessUpdate(doc).then(() => {
        console.log('Document successfully updated! ya quite la clase');
        btnLike.classList.remove('btnLikeOn');
      })
        .catch((error) => {
          console.log(error);
        });
    } else {
      likeMoreUpdate(doc).then(() => {
        console.log('Document successfully updated!');
        btnLike.classList.add('btnLikeOn');
      })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  btnDelete.addEventListener('click', () => { deleteComment(doc.id); });
  edit.addEventListener('click', () => {
    save.classList.remove('hide');
    edit.classList.add('hide');
    editCommentDom(texto);
  });

  save.addEventListener('click', () => {
    saveNewComment(texto, doc.id, privacy.value);
    edit.classList.remove('hide');
    save.classList.add('hide');
  });
  container.appendChild(divContainer);

  /* const objElements = {
    btnEdit: edit,
    btnClose: btnDelete,
  };
  return objElements;
};

/* export const removeItemArray = (array, item) => {
  console.log(item);
  const element = array.indexOf(item);
  console.log(element);
  console.log(array[item]);

  if (element !== -1) {
    array.splice(item, 1);
  }
  console.log(array);
}; 

};*/

