import * as admin from 'firebase-admin'
import serviceAccount from '../serviceAccountKey.json'
import { ServiceAccount } from 'firebase-admin'

const serviceAccountCred = serviceAccount as ServiceAccount

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountCred),
})

export default admin
