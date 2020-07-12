const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const get = (endpoint) =>
  delay(1000).then(() => console.log("GET", endpoint));

export const post = (endpoint) =>
  delay(1000).then(() => console.log("POST", endpoint));

export const update = (endpoint) =>
  delay(1000).then(() => console.log("UPDATE", endpoint));
