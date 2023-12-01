import Cookies from "js-cookie";

const baseUrl = "http://localhost:5217/api";

export const getData = async (uri) => {
  const response = await fetch(`${baseUrl}/${uri}`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

export const postData = async (uri, body) => {
  const response = await fetch(`${baseUrl}/${uri}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
};

export const deleteData = async (uri, body) => {
  const response = await fetch(`${baseUrl}/${uri}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const res = await response.json();
  return res;
};

export const patchData = async (uri, body) => {
  const response = await fetch(`${baseUrl}/${uri}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const res = await response.json();
  return res;
};
