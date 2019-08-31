/* eslint-disable no-console */
import {
  loginEmail,
  loginRegister,
  loginOut,
  loginGoogle,
  loginFacebook,
  currentUser,
} from '../src/model/model-firebase.js';

// configurando firebase mock
const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
const mockdatabase = new firebasemock.MockFirebase();
mockauth.autoFlush();
global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  path => (path ? mockdatabase.child(path) : mockdatabase),
  () => mockauth,
);

// iniciando tests
describe('loginEmail', () => {
  it('debería ser una función', () => {
    expect(typeof loginEmail).toBe('function');
  });
  it('Debería poder iniciar sesión', () => {
    loginEmail('etr604@gmail.com', '123456').then((user) => {
      expect(user.email).toBe('etr604@gmail.com');
    });
  });
});
describe('loginRegister', () => {
  it('debería ser una función', () => {
    expect(typeof loginRegister).toBe('function');
  });
  it('Debería poder registrar usuario', () => {
    loginRegister('etr604@gmail.com', '123456').then((user) => {
      expect(user.email).toBe('etr604@gmail.com');
    });
  });
});
describe('loginOut', () => {
  it('debería ser una función', () => {
    expect(typeof loginOut).toBe('function');
  });
  it('Debería poder Cerrar Sesión', () => {
    loginEmail('etr604@gmail.com', '123456').then(() => {
      loginOut().then((response) => {
        expect(response).toBe('undefined');
      });
    });
  });
});
describe('loginGoogle', () => {
  it('debería ser una función', () => {
    expect(typeof loginGoogle).toBe('function');
  });
  it('Debería poder Iniciar Sesión con una cuenta de Google', () => {
    loginGoogle().then((user) => {
      expect(user.isAnonymous).toBe('false');
    });
  });
});
describe('loginFacebook', () => {
  it('debería ser una función', () => {
    expect(typeof loginFacebook).toBe('function');
  });
  it('Debería poder Iniciar Sesión con una cuenta de Facebook', () => {
    loginFacebook().then((user) => {
      expect(user.isAnonymous).toBe('false');
    });
  });
});
describe('currentUser', () => {
  it('debería ser una función', () => {
    expect(typeof currentUser).toBe('function');
  });
  it('debería devolver usuario con sesión activa', () => {
    loginEmail('etr604@gmail.com', '123456').then(() => {
      currentUser().then((user) => {
        expect(user.email).toBe('etr604@gmail.com');
      });
    });
  });
});
