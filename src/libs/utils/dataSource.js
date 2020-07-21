export const getData = (key) => JSON.parse(localStorage.getItem(key));

export const storeData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const removeData = (key) => {
  localStorage.removeItem(key);
};
