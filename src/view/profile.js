import { currentUser } from '../model/model-firebase.js';

export const viewProfile = () => {
  const profileContainer = document.createElement('div');
  profileContainer.innerHTML = '';
  const profileTemplate = `
    <form class="form-profile">
      <img class="img-profile" src="${currentUser().photoURL ? `${currentUser().photoURL}` : '../img/user.png'}" alt="imagen de usuario por defecto"/>
      <label class="name-profile" id="nombre">${currentUser().displayName}</label>
      <label class="label-profile">${currentUser().email}</label>
      <a href="#/home" class="volver">Volver</a>
    </form>
    `;
  profileContainer.innerHTML = profileTemplate;
  profileContainer.classList.add('container-profile');
  return profileContainer;
};
