// this is code of server.js from backend

const express = require('express')
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')


dotenv.config() 

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'Sutram';
const port = 3000
app.use(bodyParser.json())
app.use(cors())

client.connect()

app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('DATA');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

app.post('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('DATA');
  const insertPass = await collection.insertOne(password)
  res.send({"success" : true, "Result" : insertPass})
})

app.delete('/', async (req, res) => {
  const password = req.body
  const db = client.db(dbName);
  const collection = db.collection('DATA');
  const deletedPass = await collection.deleteOne(password)
  res.send({"success" : true, "Result" : deletedPass})
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
////////////////////////////////////////////////////////////////