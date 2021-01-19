import { hosting } from "../src/constants/urls";
export const httpGet = (path:string) => {
  return fetch(`${hosting}/${path}`).then(awaitForJsonResponse);
};

export const httpPost = (path:string, params:any)=> {
    return fetch(`${hosting}/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }).then(awaitForJsonResponse);
};

export const httpPostTest = (path: string) => {
  return fetch(`${hosting}/${path}`, {
    method: "POST",
    //@ts-ignore
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  }).then(awaitForJsonResponse);
};
export const httpPut = (path: string, params: any) => {
  return fetch(`${hosting}/${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "22332",
    },
    body: JSON.stringify(params),
  }).then(awaitForJsonResponse);
};
export const httpDelete = (path: string) => {
  return fetch(`${hosting}/${path}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(awaitForJsonResponse);
};
const awaitForJsonResponse = async (res:any) => {
  const jsonRes = await res.json();
  if (res.status >= 400) {
    throw jsonRes;
  } else {
    return jsonRes;
  }
};