import { firestore, auth, storage } from 'firebase-admin'

export interface FirebaseRepositoryContract {
    db: firestore.Firestore
    auth: auth.Auth
    storage: storage.Storage
}
