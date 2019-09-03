const addPost = (post, correo, id, estado, likes, date) => firebase.firestore().collection('posts').add({
  text: post,
  email: correo,
  idUsuario: id,
  privacidad: estado,
  like: likes,
  time: date,
});
const readPosts = (callback) => {
  firebase.firestore().collection('posts').orderBy('time', 'desc').onSnapshot((datos) => {
    const array = [];
    datos.forEach((doc) => {
      array.push({ id: doc.id, ...doc.data() });
    });
    callback(array);
  });
};
const deletePost = idD => firebase.firestore().collection('posts').doc(idD).delete();

const editPrivacity = (idD, newEstado) => firebase.firestore().collection('posts').doc(idD).update({
  privacidad: newEstado,
});
const editLikes = (idD, newLikes) => firebase.firestore().collection('posts').doc(idD).update({
  like: newLikes,
});

const editPost = (id, newText) => firebase.firestore().collection('posts').doc(id).update({
  text: newText,
});
const addComment = (text, email, postId, id, date) => firebase.firestore().collection('posts').doc(postId).collection('comment')
  .add({
    comentario: text,
    correo: email,
    idPost: postId,
    idUsuario: id,
    time: date,
  });
const readComments = (idPost, callback) => {
  firebase.firestore().collection('posts').doc(idPost).collection('comment')
    .orderBy('time', 'desc')
    .onSnapshot((datos) => {
      const data = [];
      datos.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      callback(data);
    });
};
const deleteComment = (idD, id) => firebase.firestore().collection('posts').doc(idD).collection('comment')
  .doc(id)
  .delete();
const editComment = (idD, id, newText) => firebase.firestore().collection('posts').doc(idD).collection('comment')
  .doc(id)
  .update({
    comentario: newText,
  });
export {
  addPost,
  readPosts,
  deletePost,
  editPost,
  addComment,
  readComments,
  deleteComment,
  editComment,
  editLikes,
  editPrivacity,
};
