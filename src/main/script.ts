import './config/moduleAlias'
import { initializeApp } from '@/main/app'
// import { databaseConnections } from '@/main/config'

// const db = databaseConnections.sqlite

const script = async () => {
  await initializeApp()
}

script()
