import 'firebase/messaging'
import firebase from 'firebase/app'
import localforage from 'localforage'
import { updateDeviceToken } from '../src/apis/auth-api'

const firebaseCloudMessaging = {
    tokenInlocalforage: async () => {
        return localforage.getItem('fcm_token')
    },

    userInlocalforage: async () => {
        return localforage.getItem('fcm_token_user')
    },

    init: async function (props) {
        let data = {
            apiKey: process.env.FIREBASE_API_KEY,
            projectId: process.env.projectId,
            messagingSenderId: process.env.messagingSenderId,
            appId: process.env.appId,
        }
        if (!firebase.apps.length) {

            firebase.initializeApp(data)
        }

        try {
            let user = await this.userInlocalforage()
            if (user && user.id == props.id) {
                const tokenInLocalForage = await this.tokenInlocalforage();
                if (tokenInLocalForage !== null) {

                    return tokenInLocalForage
                }
            }


            const messaging = firebase.messaging()
            await messaging.requestPermission()

            // console.log('isSupported', messaging.isSupported())
            const token = await messaging.getToken()
            updateDeviceToken(props.id, token)

            localforage.setItem('fcm_token', token)
            localforage.setItem('fcm_token_user', props)
            console.log('fcm_token', token)
            return token
        } catch (error) {
            console.log('fcmerror', error)
        }
    },
}

export { firebaseCloudMessaging }