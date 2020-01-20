/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
import { menuAnimation } from '../functions/animation.js';
import { userActual, promOutUser, promAddCommentFirestore } from '../functions/controller-firebase.js';
import {
  closeModal, closeGrey, showModal, createComment,
} from '../functions/functions-dom.js';
import { iterateComments } from '../functions/post-firebase.js';

export default (posts) => {
  console.log(posts);
  const viewCatalogo = `
    <header class="header-movil">
    <menu id="menu-movil" class="menu-movil"><i class="fas fa-bars fa-2x bars"></i></menu>
    <nav id="enlaces" class="animationOne">
      <a href="#/catalogo" class="profile-movil text">Muro</a>
      <p class="text">Salir</p>
    </nav>
    <h1 class="logo-movil">PET LOVERS</h1>
  </header>
  <div class="list-menu-destok">
  <menu id="menu-movil-destok"><span id="nameUserHeader">Nombre de Mascota</span><i id="icon-down" class="fas fa-caret-down"></i></menu>
  <nav id="enlaces-destok" class="animationOne">
    <a href="#/catalogo" class="profile-destok text">Muro</a>
    <p class="text">Salir</p>
  </nav>
  <h1 class="logo-destok">PET LOVERS</h1>
  <menu id="out-menu-destok">Cerrar sesión <i class="fas fa-sign-out-alt"></i></menu>
  </div>
  <main id="main-muro">
    <section class="flex section-info-profile">
      <figure class="figure-photo">
        <img id="photoProfile" class="photo" src="img/fondo-pet.jpg" alt="foto de perfil">
      </figure>
      <div>
        <p id="nameUser" class="name-user">Nombre de Mascota</p>
        <p class="text-grey">-- Perrito --</p>
      </div>
    </section>
    <section class="section-destok">
      <figure class="fig-portada">
        <img class="photo-info-muro" src="img/portada.jpg" alt="foto de portada">
      </figure>
      <div class="div-info-muro">
      <figure class="figure-photo">
        <img id="photoProfileDestok" class="photo" src="img/fondo-pet.jpg" alt="foto de perfil">
      </figure>
      <div>
        <p id="nameUserDestok" class="name-user">Nombre de Mascota</p>
        <p class="text-grey">-- Perrito --</p>
      </div>
      </div>
    </section>
    <div id="modal" class="modal reset">
    <figure id="flex" class="reset">
    <span id="close" type="button">x</span>
        <img id="contenido" src="" class="reset" alt="foto de perfil">
        </figure>
  </div>
    <section class="section-publics-muro">
      <form class="form">
        <textarea id = "texto" placeholder="¿Qué quieres compartir?" name="" id="" cols="37" rows="4"></textarea>
        <div class="btn-coment">
            <button class="btn-img"><i class="far fa-image icons-white"></i></button>
            <select class="comboPrivacy btns-noteEdit">
              <option value="publica">Privacidad</option>
              <option value="publica">Pública</option>
              <option value="privada">Privada</option>
            </select>
            <button class="btn-share" id = "compartir">Compartir</button>
        </div>
      </form>
      <div id="comentarios">
      </div>
    </section>
    <div id="perfil">
  </main>
  <script type="module" src="animation.js"></script>
  `;

  const divElement = document.createElement('div');
  divElement.innerHTML = viewCatalogo;
  // AGREGAR COMENTARIO A FIRESTORE y mostrandolo en la pagina
  const comentarios = divElement.querySelector('#comentarios');
  const publicar = divElement.querySelector('#compartir');
  const privacy = divElement.querySelector('.comboPrivacy');
  publicar.addEventListener('click', (e) => {
    e.preventDefault();
    const texto = divElement.querySelector('#texto');
    promAddCommentFirestore(texto, privacy);
    texto.value = '';
  });

  // Funciones para animacion de Menú
  const menuMovil = divElement.querySelector('#menu-movil');
  menuMovil.addEventListener('click', menuAnimation);
  const menuDestok = divElement.querySelector('#icon-down');
  menuDestok.addEventListener('click', menuAnimation);

  // logOut

  const outSesion = divElement.querySelector('#out-menu-destok');
  outSesion.addEventListener('click', (e) => {
    e.preventDefault();
    promOutUser();
  });

  const outSesionMenuDestok = divElement.querySelector('#enlaces').lastElementChild;
  const outSesionMenuMovil = divElement.querySelector('#enlaces-destok').lastElementChild;
  outSesionMenuDestok.addEventListener('click', (e) => {
    e.preventDefault();
    promOutUser();
  });
  outSesionMenuMovil.addEventListener('click', (e) => {
    e.preventDefault();
    promOutUser();
  });

  // asignancion datos básicos a perfil
  const photoProfile = divElement.querySelector('#photoProfile');
  const nameUser = divElement.querySelector('#nameUser');
  const photoProfileDestok = divElement.querySelector('#photoProfileDestok');
  const nameUserDestok = divElement.querySelector('#nameUserDestok');
  const nameUserHeader = divElement.querySelector('#nameUserHeader');
  const contenido = divElement.querySelector('#contenido');
  const modal = divElement.querySelector('#modal');
  const close = divElement.querySelector('#close');

  photoProfile.src = userActual().photoUrl;
  nameUser.innerHTML = userActual().name;
  photoProfileDestok.src = userActual().photoUrl;
  nameUserDestok.innerHTML = userActual().name;
  nameUserHeader.innerHTML = userActual().name;

  // Modal para foto de perfil

  photoProfile.addEventListener('click', () => { showModal(contenido, userActual().photoUrl, modal); });
  photoProfileDestok.addEventListener('click', () => { showModal(contenido, userActual().photoUrl, modal); });
  close.addEventListener('click', () => { closeModal(modal); });
  window.addEventListener('click', () => { closeGrey(modal); });

  // Pintando todos los comentarios
  iterateComments(posts, createComment, comentarios);

  return divElement;
};
