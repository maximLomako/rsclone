import { hosting } from "../src/constants/urls";

export const httpGet = (path:string) => {
  return fetch(`${hosting}${path}`,{
      method: "GET",
      //@ts-ignore
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }
    }).then(awaitForJsonResponse);
};

export const httpPost = (path:string, params:any)=> {
    return fetch(`${hosting}${path}`, {
      method: "POST",
      //@ts-ignore
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(params),
    }).then(awaitForJsonResponse);
};

export const httpPostTest = (path: string) => {
  return fetch(`${hosting}${path}`, {
    method: "POST",
    //@ts-ignore
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  }).then(awaitForJsonResponse);
};

export const httpPut = (path: string, params: any) => {
  return fetch(`${hosting}${path}`, {
    method: "PUT",
        //@ts-ignore
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify(params),
  }).then(awaitForJsonResponse);
};

export const httpDelete = (path: string) => {
  return fetch(`${hosting}${path}`, {
    method: "DELETE",
    //@ts-ignore
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
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

export const mergeArrays = (arr1:Array<any>, arr2:Array<any>) =>
  arr1 && arr1.map((obj) => (arr2 && arr2.find((p) => p.todo_id === obj.todo_id)) || obj);