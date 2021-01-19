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

const awaitForJsonResponse = async (res:any) => {
  const jsonRes = await res.json();
  if (res.status >= 400) {
    throw jsonRes;
  } else {
    return jsonRes;
  }
};