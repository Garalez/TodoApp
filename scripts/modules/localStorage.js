export const getStorage = key => {
  const objFromStorage = JSON.parse(localStorage.getItem(key));
  if (objFromStorage === null) {
    return [];
  } else {
    return objFromStorage;
  }
};

export const setStorage = (key, obj) => {
  const getData = getStorage(key);
  if (Array.isArray(obj)) {
    getData.splice(0, getData.length, ...obj);
  } else {
    getData.push(obj);
  }

  const newData = JSON.stringify(getData);
  localStorage.setItem(key, newData);
};

export const removeStorage = (taskId, usersName) => {
  const getDataFromStorage = getStorage(usersName);

  getDataFromStorage.forEach((item, index) => {
    if (taskId === item.taskId) {
      getDataFromStorage.splice([index], 1);
      setStorage(usersName, getDataFromStorage);
    }
  });
};
