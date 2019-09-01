import { controllerExit, createPost } from '../controller.js';
import { currentUser } from '../model/model-firebase.js';
import { viewPosts } from './post.js';

export const viewHome = (arrPost) => {
  const homeContainer = document.createElement('div');
  homeContainer.innerHTML = '';
  const homeTemplate = `  
  <header>
    <div class="logo-bars">
      <label for="toggle"><i class="fa fa-bars" aria-hidden="true"></i></label>
      <img src="../img/foods-kids.png" alt="nombre foods kids de la página web"/>
    </div>
    <input type="checkbox" class="hide" id="toggle">  
    <nav class="navbar">  
      <ul class="main-nav">
        <li><a href="#/profile">${currentUser().displayName}</a></li>
        <li><a href="#/home" id="cerrar">Cerrar Sesión </a></li>
      </ul>
    </nav> 
  </header>
  <main>
    <div class="container-user">
      <img class="color-img" src="../img/fruit_1.jpg" alt="frutas tropicales">
      <div class="email-user">
        <img class="img-perfil" src="${currentUser().photoURL ? `${currentUser().photoURL}` : '../img/user.png'}" alt="foto de perfil extraida del email, google o facebook del usuario"/>
        <p class="select">${currentUser().email}</p>
      </div>
    </div>
    <div class="total">
      <div class="colunm-post">
        <textarea class="estilotextarea" name="comentarios" required  placeholder="¿Que quieres compartir?" id="comentario"></textarea>
        <div class= "options-post">
          <i class="btn-img fa fa-picture-o" aria-hidden="true"></i> 
          <select class="pointer select" id="post-privacy" >
            <option value="public" id="public">Public</option>
            <option value="private" id="private">Private</option>
          </select>
          <input type="submit" value="Compartir"class="btn-compartir pointer" id="compartir">
        </div>
      </div>
      <div class="posts-content" id="posts-content"></div>
    </div>
  </main>`;
  homeContainer.innerHTML = homeTemplate;
  homeContainer.classList.add('container-home');

  const exit = homeContainer.querySelector('#cerrar');
  const buttonCompartir = homeContainer.querySelector('#compartir');
  const totalView = homeContainer.querySelector('#posts-content');

  exit.addEventListener('click', controllerExit);
  buttonCompartir.addEventListener('click', createPost);
  arrPost.forEach(obj => totalView.appendChild(viewPosts(obj)));

  return homeContainer;
};
