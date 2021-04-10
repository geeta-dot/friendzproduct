const Dotenv = require("dotenv-webpack");
const optimizedImages = require("next-optimized-images");
const withCSS = require("@zeit/next-css");

module.exports = withCSS(
  optimizedImages({
    inlineImageLimit: 16384,
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Add the new plugin to the existing webpack plugins
      config.plugins.push(new Dotenv({ silent: true }));

      return config;
    },
    env: {
      api_url: process.env.API_URL,
      API_URL: process.env.API_URL,
      SENDER_ID: process.env.SENDER_ID,
      APP_ID: process.env.APP_ID,
      AUTH_KEY: process.env.AUTH_KEY,
      AUTH_SECRET: process.env.AUTH_SECRET,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      RAZOR_PAY_KEY_ID: process.env.RAZOR_PAY_KEY_ID,
      RAZOR_PAY_KEY_SECRET: process.env.RAZOR_PAY_KEY_SECRET,
      APP_URL: process.env.APP_URL,
      FROM_EMAIL: process.env.FROM_EMAIL,
      TO_EMAIL: process.env.TO_EMAIL,
      apiKey: process.env.FIREBASE_API_KEY,
      projectId: process.env.projectId,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId,
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      API_HOST: process.env.API_HOST,
      ONESIGNAL_APP_ID: process.env.ONESIGNAL_APP_ID,
      ONESIGNAL_REST_KEY: process.env.ONESIGNAL_REST_KEY,
    },
  })
);

// module.exports = {
//   distDir: "build",
//   env: {
//     api_url: "http://woodbox.test/api",
//   },
// };
// module.exports = {
//   compress: true,

  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   // Add the new plugin to the existing webpack plugins
  //   config.plugins.push(new Dotenv({ silent: true }));

  //   return config;
  // },
  // env: {
  //   api_url: process.env.API_URL,
  //   API_URL: process.env.API_URL,
  //   SENDER_ID: process.env.SENDER_ID,
  //   APP_ID: process.env.APP_ID,
  //   AUTH_KEY: process.env.AUTH_KEY,
  //   AUTH_SECRET: process.env.AUTH_SECRET,
  //   GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  //   RAZOR_PAY_KEY_ID: process.env.RAZOR_PAY_KEY_ID,
  //   RAZOR_PAY_KEY_SECRET: process.env.RAZOR_PAY_KEY_SECRET,
  //   APP_URL: process.env.APP_URL,
  //   FROM_EMAIL: process.env.FROM_EMAIL,
  //   TO_EMAIL: process.env.TO_EMAIL,
  //   apiKey: process.env.FIREBASE_API_KEY,
  //   projectId: process.env.projectId,
  //   messagingSenderId: process.env.messagingSenderId,
  //   appId: process.env.appId,
  //   FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  //   API_HOST: process.env.API_HOST,
  //   ONESIGNAL_APP_ID: process.env.ONESIGNAL_APP_ID,
  //   ONESIGNAL_REST_KEY: process.env.ONESIGNAL_REST_KEY,
  // },
// };
