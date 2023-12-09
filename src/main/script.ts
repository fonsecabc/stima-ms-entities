import './config/moduleAlias'
import { initializeApp } from '@/main/app'
import { databaseConnections } from '@/main/config'

const db = databaseConnections.sqlite

const script = async () => {
  await initializeApp()

  const query = ''
  await db.execute(query, []).then(console.log)
}

script()
