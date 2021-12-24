import { login, signup } from './login.js';
import { addNote, editNote, delNote } from './note.js';
import { editUser, delUser } from './user.js';
//DOM
const loginBtn = document.getElementById('login-btn');
const loginBtn_GG = document.getElementById('login-btn-google');
const addNoteBtn = document.getElementById('add-btn');
const registerBtn = document.getElementById('registerBtn');
const saveEditBtn = document.getElementById('save-btn');
const deleteNoteBtn = document.getElementById('delete-btn');
const saveEditAdminBtn = document.getElementById('save-btn-admin');
const btnDelUser = document.querySelectorAll('.btnDelUser');
//
if (loginBtn) {
  loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    login(email, password);
  });
}
if (loginBtn_GG) {
  loginBtn_GG.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.replace('/auth/google');
  });
}
if (addNoteBtn) {
  addNoteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.getElementById('modal-input-title').value;
    const content = document.getElementById('modal-input-content').value;
    addNote(title, content);
  });
}
if (registerBtn) {
  registerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const name = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const passwordConfirm = document.getElementById(
      'register-repassword'
    ).value;
    signup(name, email, password, passwordConfirm);
  });
}

if (saveEditBtn) {
  saveEditBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.getElementById('old-title').textContent;
    const content = document.getElementById('old-content').textContent;
    editNote(saveEditBtn.getAttribute('data-id'), title, content);
  });
}
if (deleteNoteBtn) {
  deleteNoteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    delNote(deleteNoteBtn.getAttribute('data-id'));
  });
}

if (saveEditAdminBtn) {
  saveEditAdminBtn.addEventListener('click', (e) => {
    e.preventDefault();
    editUser(
      saveEditAdminBtn.getAttribute('data-id'),
      document.getElementById('edit-name').textContent,
      document.getElementById('edit-email').textContent
    );
  });
}

if (btnDelUser) {
  for (const btn of btnDelUser) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      delUser(btn.getAttribute('data-id'));
    });
  }
}
