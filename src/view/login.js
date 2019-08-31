import {
  controllerLogin,
  controllerFacebook,
  controllerGoogle,
} from '../controller.js';

export const viewLogin = () => {
  const loginContainer = document.createElement('div');
  loginContainer.innerHTML = '';
  const loginTemplate = `  
  <img class="logo" src="../img/circlenutri.png" alt="circulo nutricional"/>
  <form id="screen-login" class="flex-form">
    <img src="../img/logo1.png" alt="logo de la web food kids"/>
    <p class="welcome"> ¡Bienvenido!</p>
    <p class="welcome-description"> ¡Bienvenido a la red que te ayuda con la alimentación de los engreidos de casa!</p>
    <input class="inputs" type="email" name="correo" id="email" placeholder="Email">
    <input class="inputs" type="password" name="contrasena" id="password"  placeholder="Password">
    <p class="error" id="error"></p>
    <button class= "btn-login" name="button" type="submit" id="login">Log in</button>
    <p class="registro">O bien ingresa con..</p>
    <div class="btn-fb-google">
      <a id="fb" href="#"><img class="facebook" src="../img/fb.png"/></a>
      <a id="goog" href="#"><img class="google" src="../img/google+.png" /></a>
    </div>
    <label class="registro">¿No tienes una cuenta?&nbsp;<a class="bold" href="#/register" id="registrate">Regístrate.</a></label>
  </form>`;

  loginContainer.innerHTML = loginTemplate;
  loginContainer.classList.add('center');

  const buttonLogInEmail = loginContainer.querySelector('#login');
  const buttonLogInFacebbok = loginContainer.querySelector('#fb');
  const buttonLogInGoogle = loginContainer.querySelector('#goog');

  buttonLogInEmail.addEventListener('click', controllerLogin);
  buttonLogInFacebbok.addEventListener('click', controllerFacebook);
  buttonLogInGoogle.addEventListener('click', controllerGoogle);

  return loginContainer;
};
