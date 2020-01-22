/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
import { createUser } from '../functions/register-controller.js';

export default () => {
  const viewRegister = `
  <header><a href = ""><h1>Pet Lovers</h1></a></header>
  <main>
    <h2>Registro</h2>
    <form class="form">
      <input class="input-form" type="text" placeholder="Nombres">
      <input class="input-form" type="text" id="last-name" placeholder="Apellidos">
      <input class="input-form" type="email" placeholder="Correo Electrónico">
      <input class="input-form" type="password" placeholder="Contraseña">
      <button class="button-form">Crear cuenta</button>
      <p class="p-alert"></p>
    </form>
  </main>
  `;

  const divElement = document.createElement('div');
  divElement.innerHTML = viewRegister;

  // DOM
  const buttonRegister = divElement.querySelector('.button-form');
  buttonRegister.addEventListener('click', createUser);

  return divElement;
};
