const API_URL = process.env.api_url;

export function generalPostRequest(url, data) {
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

export function generalGetRequest(url) {
    return fetch(url, )
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        return responseData;
      })
      .catch((error) => console.log(error));
}

export function fetchDialogs(user_id, q) {
    let url = API_URL + "/dialogs/" + user_id;

    if (q) {
        url = url + q;
    }
    console.log(url);
    return generalGetRequest(url)
}

export function fetchMessages(dialog_id, q) {
    let url = API_URL + "/messages/" + dialog_id;

    if (q) {
        url = url + q;
    }
    console.log(url);
    return generalGetRequest(url)
}

export function createMessage(data) {
    let url = API_URL + "/message";

    console.log(url);
    return generalPostRequest(url, data)
}

export function unreadMsg(user_id) {
    let url = API_URL + "/unread-message/" + user_id;

    console.log(url);
    return generalGetRequest(url)
}

export function readAll(dialog_id, user_id) {
    let url = API_URL + "/mark-read-dialog/" + dialog_id + '/' + user_id;

    console.log(url);
    return generalGetRequest(url)
}