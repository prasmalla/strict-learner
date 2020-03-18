const admin = require('firebase-admin')
const functions = require('firebase-functions')
const serviceAccount = require('./serviceAccountKey.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://sympl-5850a.firebaseio.com'
})

let db = admin.firestore()

exports.getBoards = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  db.collection('boards')
    .get()
    .then((snapshots) => {
      const boards = []
      snapshots.forEach((doc) => {
        const board = doc.data()
        board.id = doc.id
        boards.push(board)
      })
      res.json(boards)
    })
    .catch((err) => {
      console.log('Error getting documents', err)
    })
})

exports.getTasks = functions.https.onRequest((req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  db.collection('tasks')
    .get()
    .then((snapshots) => {
      const tasks = []
      snapshots.forEach((doc) => {
        const task = doc.data()
        task.id = doc.id
        tasks.push(task)
      })
      res.json(tasks)
    })
    .catch((err) => {
      console.log('Error getting documents', err)
    })
})
