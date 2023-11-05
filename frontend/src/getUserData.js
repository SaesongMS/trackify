import Cookies from "js-cookie";

export const getData = async (uri) => {
  const response = await fetch(`http://localhost:5217/api/${uri}`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
  });
  const data = await response.json();
  return data;
};

export const postData = async (uri, body) => {
  const response = await fetch(`http://localhost:5217/api/${uri}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};

export const deleteData = async (uri, body) => {
  const response = await fetch(`http://localhost:5217/api/${uri}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  const res = await response.json();
  return res;
};
