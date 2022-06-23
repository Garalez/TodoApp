import {counterControl, renderTasks} from './modules/render.js';
import {btnControl, modalControl, taskControl} from './modules/events.js';
import elements from './modules/createElements.js';
const {
  createModal,
  createForm,
  createTable,
} = elements;

const init = () => {
  const {
    overlay,
    modalForm,
  } = createModal();
  const {
    form,
    btnReset,
    dropDown,
  } = createForm(overlay);
  const tBody = createTable(form);

  modalControl(modalForm, overlay, tBody);

  modalForm.addEventListener('submit', () => {
    const usersName = localStorage.getItem('userName');
    const getDataFromStorage = localStorage.getItem(usersName);

    renderTasks(tBody, getDataFromStorage);
    btnControl(tBody, usersName);
    taskControl(tBody, form, btnReset, dropDown, usersName);
    counterControl(tBody, usersName);
  });
};

init();
