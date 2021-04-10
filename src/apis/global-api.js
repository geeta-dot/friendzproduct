const API_URL = process.env.api_url;
import fetch from "node-fetch";

export function searchUniversities(q) {
  let url = API_URL + "/universities/global/search/" + q;
  console.log(url);

  return fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      return responseData;
    })
    .catch((error) => console.warn(error));
}

export function searchCategories(q) {
  let url = API_URL + `/product-categories-search/${q}`;
  console.log(url);

  return fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      return responseData;
    })
    .catch((error) => console.warn(error));
}

export function searchCities(q) {
  let url = API_URL + `/cities/search/${q}`;
  console.log(url);

  return fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      return responseData;
    })
    .catch((error) => console.warn(error));
}

export async function getProducts(q) {
  let url = API_URL + "/products";
  if (q) {
    url = url + q;
  }
  console.log(url);

  return fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      return responseData;
    })
    .catch((error) => console.warn(error));
}

export async function getProduct(id) {
  let url = API_URL + "/product/" + id;

  console.log(url);

  return fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      return responseData;
    })
    .catch((error) => console.warn(error));
}

export async function getSeller(id) {
  let url = API_URL + "/user/" + id;

  console.log(url);

  return fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      return responseData;
    })
    .catch((error) => console.warn(error));
}

export async function getCategories() {
  let url = API_URL + "/product-categories";

  console.log(url);

  return fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
      return responseData;
    })
    .catch((error) => console.warn(error));
}
export async function getEventCategories() {
  let url = API_URL + "/event-categories";

  console.log(url);

  return fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
      return responseData;
    })
    .catch((error) => console.warn(error));
}

export async function getCities() {
  let url = API_URL + "/cities";

  console.log(url);

  return fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
      console.log("responseData", responseData);
      return responseData;
    })
    .catch((error) => console.warn(error));
}

export async function getEvents(q, showall = false) {
  let url = API_URL + "/events";
  if (showall) {
    url = url + "/" + showall;
  }
  if (q) {
    url = url + q;
  }
  console.log(url);

  return fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      return responseData;
    })
    .catch((error) => console.log(error));
}

export async function getEvent(id) {
  let url = API_URL + "/event/" + id;

  console.log(url);

  return fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      return responseData;
    })
    .catch((error) => console.warn(error));
}
export async function getRequest(id) {
  let url = API_URL + "/product-request/" + id;

  console.log(url);

  return fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      return responseData;
    })
    .catch((error) => console.warn(error));
}

export function searchEventCategories(q) {
  let url = API_URL + `/event-categories-search/${q}`;
  console.log(url);

  return fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      return responseData;
    })
    .catch((error) => console.warn(error));
}

export function CreateOrder(data) {
  let url = API_URL + "/order";
  console.log(url);
  return generalPostRequest(url, data);
}
export function CreateContact(data) {
  let url = API_URL + "/contact";
  console.log(url);
  return generalPostRequest(url, data);
}
export function CreateVisit(data) {
  let url = API_URL + "/user-visit";
  console.log(url);
  return generalPostRequest(url, data);
}

export async function getAllFeedback(q) {
  let url = API_URL + "/feedback";
  if (q) {
    url = url + q;
  }
  console.log(url);

  return fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      return responseData.data;
    })
    .catch((error) => console.warn(error));
}
export async function getAllBuyRequests(q) {
  let url = API_URL + "/product-request?paginate=20";
  if (q) {
    url = url + q;
  }
  console.log(url);

  return fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      return responseData;
    })
    .catch((error) => console.warn(error));
}

export function ForgotPasswordAPI(data) {
  let url = API_URL + "/forgot-password";
  console.log(url);
  return generalPostRequest(url, data);
}

export function UpdatePasswordAPI(data) {
  let url = API_URL + "/update-password";
  console.log(url);
  return generalPostRequest(url, data);
}

export function sendChatUpdate(user_id) {
  let url = API_URL + "/send-chat-message/" + user_id;
  console.log(url);
  return generalPostRequest(url);
}
export function sendVerifyEmail(user_id) {
  let url = API_URL + "/send-verify-email/" + user_id;
  console.log(url);
  return generalPostRequest(url);
}
export function updateOpenStatus(dialog_id, status, user_id) {
  let url =
    API_URL + "/update-open-status/" + dialog_id + "/" + status + "/" + user_id;
  console.log(url);
  return generalPostRequest(url);
}
export function sendFeedbackMessage(data) {
  let url = API_URL + "/send-feedback-message";
  return generalPostRequest(url, data);
}

function generalPostRequest(url, data) {
  return fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(`Request rejected with status ${response.status}`);
      }
    })
    .then((responseData) => {
      console.log(responseData);
      return responseData;
    })
    .catch((error) => console.log(error));
}
