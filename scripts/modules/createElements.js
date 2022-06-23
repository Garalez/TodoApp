const createButtonsGroup = params => {
  const btns = params.map(({className, type, text}) => {
    const button = document.createElement('button');
    button.type = type;
    button.textContent = text;
    button.className = className;
    return button;
  });

  return {
    btns,
  };
};

const createModal = () => {
  const overlay = document.createElement('div');
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
  overlay.style.bottom = '0';
  overlay.style.height = '100%';
  overlay.style.left = '0';
  overlay.style.opacity = '1';
  overlay.style.position = 'fixed';
  overlay.style.right = '0';
  overlay.style.top = '0';
  overlay.style.transition = '0.3s ease-in-out';
  overlay.style.visibility = 'visible';
  overlay.style.width = '100%';
  overlay.style.zIndex = '1';

  const btnWrapper = document.createElement('div');
  btnWrapper.style.display = 'flex';
  btnWrapper.style.flexDirection = 'column';
  btnWrapper.style.gap = '5px';

  const modalForm = document.createElement('form');
  modalForm.style.display = 'flex';
  modalForm.style.flexDirection = 'column';
  modalForm.style.padding = '30px 50px';
  modalForm.style.backgroundColor = '#fff';
  modalForm.style.borderBottomLeftRadius = '4px';
  modalForm.style.borderBottomRightRadius = '4px';
  modalForm.style.boxShadow = '0 2px 6px rgba(0, 0, 0, 0.45)';
  modalForm.style.left = '50%';
  modalForm.style.position = 'absolute';
  modalForm.style.top = '0';
  modalForm.style.opacity = '1';
  modalForm.style.transform = 'translateX(-50%)';
  modalForm.style.transitionProperty = 'top, opacity';
  modalForm.style.transitionDuration = '0.5s';
  modalForm.style.transitionTimingFunction = 'ease-in-out';
  modalForm.style.zIndex = '2';
  modalForm.insertAdjacentHTML('beforeend', `
    <h2 style="margin-top: 0; padding-bottom: 20px;">
      Здравствуйте! Как вас зовут?</h2>
    <label style="font-size: 18px" for="name">Введите ваше имя:</label>
    <input style="margin-bottom: 25px; height: 40px" name="name" 
      class="user-name"  id="name" type="text" required>
  `);

  const buttonGroup = createButtonsGroup([
    {
      className: 'btn btn-primary',
      type: 'submit',
      text: 'Подтвердить',
    },
  ]);

  btnWrapper.append(...buttonGroup.btns);
  modalForm.append(btnWrapper);
  overlay.append(modalForm);

  return {
    overlay,
    modalForm,
    btnAdd: buttonGroup.btns[0],
  };
};

const createForm = (overlay) => {
  const app = document.querySelector('.app-container');
  app.classList.add('vh-100', 'w-100', 'd-flex', 'align-items-center',
      'justify-content-center', 'flex-column');
  app.append(overlay);

  const headerTitle = document.createElement('h1');
  headerTitle.textContent = 'Todo App';

  const form = document.createElement('form');
  form.classList.add('d-flex', 'align-items-center', 'mb-3');
  app.append(headerTitle);
  headerTitle.after(form);

  const dropDown = document.createElement('select');
  dropDown.style.padding = '5px';
  dropDown.style.marginRight = '10px';
  dropDown.style.fontSize = '18px';
  const lowImportance = document.createElement('option');
  lowImportance.textContent = 'обычная';
  const midImportance = document.createElement('option');
  midImportance.textContent = 'важная';
  const highImportance = document.createElement('option');
  highImportance.textContent = 'срочная';
  dropDown.append(lowImportance, midImportance, highImportance);
  form.append(dropDown);

  const label = document.createElement('label');
  label.classList.add('form-group', 'me-3', 'mb-0');
  form.append(label);

  const input = document.createElement('input');
  input.classList.add('form-control');
  input.type = 'text';
  input.name = 'task';
  input.placeholder = 'ввести задачу';
  label.append(input);

  const btnSubmit = document.createElement('button');
  btnSubmit.classList.add('btn', 'btn-primary', 'me-3');
  btnSubmit.type = 'submit';
  btnSubmit.textContent = 'Сохранить';
  label.after(btnSubmit);

  btnSubmit.disabled = !input.value.length;
  input.addEventListener('input', () => {
    btnSubmit.disabled = !input.value.length;
  });

  const btnReset = document.createElement('button');
  btnReset.classList.add('btn', 'btn-warning');
  btnReset.type = 'reset';
  btnReset.textContent = 'Очистить';
  btnSubmit.after(btnReset);

  return {
    form,
    btnReset,
    btnSubmit,
    dropDown,
  };
};

const createTable = (form) => {
  const tableWrapper = document.createElement('div');
  tableWrapper.classList.add('table-wrapper');

  const table = document.createElement('table');
  table.classList.add('table', 'table-hover', 'table-bordered');

  const tBody = document.createElement('tbody');

  const thead = document.createElement('thead');
  thead.insertAdjacentHTML('beforeend', `
    <tr>
      <th>№</th>
      <th>Задача</th>
      <th>Статус</th>
      <th>Действия</th>
    </tr>
  `);

  form.after(tableWrapper);
  tableWrapper.append(table);
  table.append(thead, tBody);

  return tBody;
};

const createTasks = ({taskId, taskImportance, taskName, taskState}) => {
  const tr = document.createElement('tr');
  if (taskImportance === 'обычная') {
    tr.classList.add('table-light');
  } else if (taskImportance === 'важная') {
    tr.classList.add('table-warning');
  } else if (taskImportance === 'срочная') {
    tr.classList.add('table-danger');
  }

  const taskIdCell = document.createElement('td');
  taskIdCell.textContent = taskId;
  taskIdCell.style.display = 'none';

  const taskNumberCell = document.createElement('td');

  const taskNameCell = document.createElement('td');
  taskNameCell.classList.add('task');
  taskNameCell.textContent = taskName;

  const stateCell = document.createElement('td');
  stateCell.textContent = 'В процессе';

  const btnTd = document.createElement('td');
  btnTd.style.display = 'flex';
  btnTd.style.gap = '5px';
  const editBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');
  const successBtn = document.createElement('button');
  editBtn.classList.add('btn', 'btn-warning');
  deleteBtn.classList.add('btn', 'btn-danger');
  successBtn.classList.add('btn', 'btn-success', 'done-toggle');
  editBtn.textContent = 'Редактировать';
  deleteBtn.textContent = 'Удалить';
  successBtn.textContent = 'Завершить';
  btnTd.append(editBtn, deleteBtn, successBtn);

  if (taskState === 'Выполнена') {
    tr.removeAttribute('class');
    tr.classList.add('table-success');
    taskNameCell.removeAttribute('class');
    taskNameCell.classList.add('text-decoration-line-through');
    stateCell.textContent = 'Выполнена';
    successBtn.classList.replace('btn-success', 'btn-light');
  }

  tr.append(taskIdCell, taskNumberCell, taskNameCell, stateCell, btnTd);

  return tr;
};

export default {
  createModal,
  createForm,
  createTable,
  createTasks,
};
