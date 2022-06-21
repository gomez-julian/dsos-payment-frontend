import { Host } from "../Host";

export const Fetch = async (url, method, data) => {
  const token = localStorage.getItem('jwt')
  const response = await fetch(url, {
    method: method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response;
};

export const FetchGet = async (url) => {
  const token = localStorage.getItem('jwt')
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    }
  });
  return response;
};

export const Verify = async () => {
  const token = localStorage.getItem('jwt')
  if(token.length < 5){
    return {status: 500}
  }
  const response = await fetch(Host.auth.verify + token, {
    method: 'POST',
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
  return response;
};
