import {getStorage, setStorage} from './localStorage.js';
import elements from './createElements.js';
const {
  createTasks,
} = elements;

export const counterControl = (tBody, usersName) => {
  const data = getStorage(usersName);

  tBody.childNodes.forEach((e, inx) => {
    e.children[1].textContent = inx + 1;
  });

  setStorage(usersName, data);
};

export const renderTasks = (tBody, data) => {
  const user = getStorage(data);
  const allRow = user.map(createTasks);

  tBody.append(...allRow);
  return allRow;
};
