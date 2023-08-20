import { FirebaseRepositoryContract } from '../../application/contracts'

import * as firebase from 'firebase-admin'

export class FirebaseRepository implements FirebaseRepositoryContract {
    private app: firebase.app.App
    public db: firebase.firestore.Firestore
    public auth: firebase.auth.Auth
    public storage: firebase.storage.Storage

    constructor(
        private readonly firebaseAdminSdk: any
    ) {
        this.app = firebase.apps.length ? firebase.app() : firebase.initializeApp({ credential: firebase.credential.cert(this.firebaseAdminSdk) })
        this.db = this.app.firestore()
        this.auth = this.app.auth()
        this.storage = this.app.storage()

        !(firebase.apps.length) && this.db.settings({ ignoreUndefinedProperties: true })
    }
}
