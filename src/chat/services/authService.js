import ConnectyCube from 'connectycube'
import appConfig from '../../../appConfig'
import User from '../models/user'
import store from '../../redux/store'
// import { setCurrentUser } from '../actions/currentUser'
import { getImageLinkFromUID } from '../helpers/file'
import { chatAuthenticated } from '../../redux/actions/chatUser'
import { chatConnection } from '../../redux/actions/chatConnected'
import { chatUnreadCount } from '../../redux/actions/chatUnread'
import { pushMessage } from '../../redux/actions/messages'
// import { LogOut } from '../reducers/index'

class AuthService {
  static CURRENT_USER_SESSION_KEY = "CURRENT_USER_SESSION_KEY";
  static DEVICE_TOKEN_KEY = "DEVICE_TOKEN_KEY";

  async init() {
    const res = await ConnectyCube.init(...appConfig.connectyCubeConfig);
    return res;

    // await ConnectyCube.createSession({
    //     email:'test@test.com',
    //     password:'test'
    // })
    // return this.autologin()
  }

  // async autologin() {
  //     const checkUserSessionFromStore = await this.getUserSession()
  //     if (checkUserSessionFromStore) {
  //         const data = JSON.parse(checkUserSessionFromStore)
  //         await this.signIn({ login: data.login, password: data.password })
  //         return 'home'
  //     } else { return 'auth' }
  // }

  async login(params) {
    const session = await ConnectyCube.createSession(params);
    const currentUser = new User(session.user);
    session.user.avatar = getImageLinkFromUID(session.user.avatar);
    // work around
    session.user.full_name = session.user.login;
    store.dispatch(chatAuthenticated(session));
    const customSession = Object.assign({}, currentUser, {
      password: params.password,
    });
    this.setUserSession(customSession);
    this.connect(customSession.id, customSession.password);
  }

  // async signUp(params) {
  //     await ConnectyCube.createSession()
  //     await ConnectyCube.users.signup(params)
  //     return this.signIn(params)
  // }

  async connect(userId, password) {
    const isConnected = ConnectyCube.chat.isConnected;
    if (isConnected) {
      store.dispatch(chatConnection());
      this.getUnread()
    } else {
      await ConnectyCube.chat.connect({ userId, password }).then((error, contactlist) => {
        this.setUpListeners()
        store.dispatch(chatConnection());
        this.getUnread()
      })
    }

  }

  async getUnread() {
    await ConnectyCube.chat.message
      .unreadCount()
      .then(result => {
        store.dispatch(chatUnreadCount(result.total))
        console.log('unread', reasult)
      })
      .catch(error => { });
  }

  async setUpListeners() {
    ConnectyCube.chat.onMessageListener = this.onMessage.bind(this);
  }

  onMessage(userId, message) {
    let user = localStorage.getItem("user");
    user = user ? JSON.parse(user) : "";
    console.log(message, userId, user.connectycube_user.connectycube_id)
    if (!user || !user.connectycube_user || userId == user.connectycube_user.connectycube_id) {
      return
    }

    message.message = message.body
    message.device_token = user.device_token
    message.notif = true
    store.dispatch(pushMessage(message))

  }

  setUserSession(userSession) {
    return localStorage.setItem(AuthService.CURRENT_USER_SESSION_KEY, JSON.stringify(userSession))
  }

  getUserSession() {
    return localStorage.getItem(AuthService.CURRENT_USER_SESSION_KEY);
  }

  // async logout() {
  //     localStorage.clear()
  //     await ConnectyCube.logout()
  //     store.dispatch(LogOut())
  // }
}

const authService = new AuthService()

Object.freeze(authService)

export default authService