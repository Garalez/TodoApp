import {counterControl, renderTasks} from './render.js';
import {getStorage, setStorage, removeStorage} from './localStorage.js';
import elements from './createElements.js';
const {
  createTasks,
} = elements;

export const btnControl = (tBody, usersName) => {
  tBody.addEventListener('click', e => {
    const target = e.target;
    const taskId = target.parentNode.parentNode.children[0].textContent;

    if (target.closest('.btn-danger')) {
      const confirmation = confirm('Вы уверены что хотите удалить задание?');
      if (confirmation === true) {
        target.closest('tr').remove();
        removeStorage(taskId, usersName);
        counterControl(tBody, usersName);
      }
    }

    if (target.closest('.done-toggle')) {
      const data = getStorage(usersName);
      const dataIndex = data.find((obj => obj.taskId === taskId));
      const getName = localStorage.getItem('userName');

      if (dataIndex.completion === true) {
        dataIndex.completion = false;
      } else {
        dataIndex.completion = true;
      }

      while (tBody.lastElementChild) {
        tBody.removeChild(tBody.lastElementChild);
      }

      setStorage(usersName, data);
      renderTasks(tBody, getName);
      counterControl(tBody, getName);
    }

    if (target.closest('.btn-warning')) {
      const data = getStorage(usersName);
      const dataIndex = data.find((obj => obj.taskId === taskId));
      target.parentNode.parentNode.children[2].setAttribute(
          'contenteditable', 'true');
      target.parentNode.parentNode.children[2].focus();
      target.parentNode.parentNode.children[2].addEventListener(
          'focusout', () => {
            dataIndex.taskName =
            target.parentNode.parentNode.children[2].textContent;
            target.parentNode.parentNode.children[2].setAttribute(
                'contenteditable', 'false');
            setStorage(usersName, data);
          });
    }
  });
};

export const modalControl = (modalForm, overlay, tBody) => {
  modalForm.addEventListener('submit', e => {
    e.preventDefault();
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
    const usersName = modalForm.name.value;
    localStorage.setItem('userName', usersName);
    const getName = localStorage.getItem('userName');
    while (tBody.lastElementChild) {
      tBody.removeChild(tBody.lastElementChild);
    }
    renderTasks(tBody, getName);
  });
};

export const taskControl = (tBody, form, btnReset, dropDown, usersName) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (/^\s/.test(form.task.value)) {
      alert('Неверное название задачи!');
      form.reset();
      form[2].disabled = true;
      return;
    } else {
      const obj = {
        'taskId': Math.random().toString().substring(2, 10),
        'taskImportance': dropDown.value,
        'taskName': form.task.value,
        'completion': false,
      };
      setStorage(usersName, obj);
      tBody.append(createTasks(obj, tBody));
      counterControl(tBody, usersName);
      form[2].disabled = true;
      form.reset();
    }
  });

  btnReset.addEventListener('click', () => {
    while (tBody.lastElementChild) {
      tBody.removeChild(tBody.lastElementChild);
      localStorage.removeItem(usersName);
    }
  });
};
