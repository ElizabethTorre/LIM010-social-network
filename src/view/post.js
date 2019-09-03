/* eslint-disable no-console */
import {
  deletePost,
  editPost,
  addComment,
  readComments,
  editLikes,
  editPrivacity,
} from '../model/model-firestore.js';

import { currentUser } from '../model/model-firebase.js';
import { viewComment } from './comment.js';
import { timePublic } from '../controller.js';

export const viewPosts = (objPost) => {
  const postContainer = document.createElement('div');
  let postTemplate = '';
  if (objPost.privacidad === 'public' || objPost.idUsuario === currentUser().uid) {
    postTemplate = `   
      <div class="header-post">
        <div>
          <div class="flex-creador-privicity">
            <p id="nombre" class="creador">Publicado por ${objPost.email} | </p>
            <p id="privacidad-no-user">${objPost.privacidad}</p>
            <select class="hide select pointer" id="post-privacy-user" >
              <option value="public" id="public">public</option>
              <option value="private" id="private">private</option>
            </select>
          </div>
          <p class="clock"><i class="fa fa-clock-o" aria-hidden="true"></i> ${objPost.time}</p>
        </div>
        <i id="btn-delete" class="delete pointer fa fa-trash" aria-hidden="true"></i>
      </div>
      <p id="first-post" class="first-post">${objPost.text}</p>
      <textarea class="hide textarea-post" name="comentarios" id="newcoment">${objPost.text}</textarea>
      <div class="comandos-post">
        <i id="like" class="btn-img pointer fa fa-heart-o" aria-hidden="true"></i>
        <p id="count" class="count" >${objPost.like}</p>
        <i id="editar" class="btn-img pointer fa fa-pencil-square-o" aria-hidden="true"></i>
        <i id="guardar" class="hide btn-img pointer fa fa-floppy-o" aria-hidden="true"></i>
      </div>
      <div id="textarea-comment" class="textarea-comment">
        <textarea id="comment-new" class="text-coment" type="text" placeholder="Escribe tu comentario" /></textarea>
        <i id="button-coment" class="btn-comment pointer fa fa-comment-o" aria-hidden="true"></i>
      </div>
      <div id="comments-container" class="background"></<div>
    `;
    postContainer.innerHTML = postTemplate;
    postContainer.classList.add('container-posts');

    const firstPost = postContainer.querySelector('#first-post');
    const textArea = postContainer.querySelector('#newcoment');
    const editar = postContainer.querySelector('#editar');
    const eliminar = postContainer.querySelector('#btn-delete');
    const guardar = postContainer.querySelector('#guardar');
    const postPrivacyUser = postContainer.querySelector('#post-privacy-user');
    postPrivacyUser.value = objPost.privacidad;
    const privacidadNoUser = postContainer.querySelector('#privacidad-no-user');

    if (objPost.idUsuario !== currentUser().uid) {
      eliminar.classList.add('hide');
      editar.classList.add('hide');
    } else {
      postPrivacyUser.classList.remove('hide');
      privacidadNoUser.classList.add('hide');
      postPrivacyUser.addEventListener('click', (event) => {
        const indice = event.target.value;
        editPrivacity(objPost.id, indice);
      });
      eliminar.addEventListener('click', () => {
        deletePost(objPost.id);
      });
      editar.addEventListener('click', (e) => {
        e.preventDefault();
        guardar.classList.remove('hide');
        editar.classList.add('hide');
        firstPost.classList.add('hide');
        textArea.classList.remove('hide');
      });
      guardar.addEventListener('click', (e) => {
        e.preventDefault();
        const newTextPost = textArea.value;
        if (newTextPost !== '') {
          editPost(objPost.id, newTextPost);
          firstPost.classList.remove('hide');
          textArea.classList.add('hide');
          editar.classList.remove('hide');
          guardar.classList.add('hide');
        }
      });
    }
    const like = postContainer.querySelector('#like');
    like.addEventListener('click', () => {
      const valor = objPost.like + 1;
      editLikes(objPost.id, valor);
    });
    const comentar = postContainer.querySelector('#button-coment');
    comentar.addEventListener('click', () => {
      const comentario = postContainer.querySelector('#comment-new').value;
      // console.log(comentario);
      const date = timePublic();
      addComment(comentario, currentUser().email, objPost.id, objPost.email, date)
        .then((response) => {
          postContainer.querySelector('#comment-new').value = '';
          console.log('Se agregó a tu collección', response.id);
        }).catch((error) => {
          console.log('No se agregó', error);
        });
    });

    const comments = postContainer.querySelector('#comments-container');
    readComments(objPost.id, (dato) => {
      comments.innerHTML = '';
      dato.forEach((obj) => {
        comments.appendChild(viewComment(obj));
      });
    });
  }
  return postContainer;
};
