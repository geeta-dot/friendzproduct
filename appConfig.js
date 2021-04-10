const data = {

  "senderID": "",
  "connectyCubeConfig": [
    {
      "appId": process.env.APP_ID,
      "authKey": process.env.AUTH_KEY,
      "authSecret": process.env.AUTH_SECRET
    },
    {
      "chat": {
        "streamManagement": {
          "enable": true
        }
      },
      "debug": {
        "mode": 0
      }
    }
  ]
}
export default data


