const express = require('express')
const cors = require('cors')
const app = express()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000
require('dotenv').config()

app.use(cors())
app.use(express.json())


app.get('/',(req,res)=>{
    res.send('Cena dental care server running');
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mtnbd39.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    // const serviceCollection = client.db('geniusCarDB').collection('services')
    const serviceCollection = client.db('cena_dental_care').collection('services')
  try {
    app.get('/services',async(req,res)=>{
        const query = {}
        const cursor = serviceCollection.find(query)
        const services = await cursor.toArray()
        res.send(services)
    })
    app.get('/services/:id', async (req, res) => {
        const id = req.params.id
        const query = { _id: ObjectId(id) }
        const service = await serviceCollection.findOne(query)
        res.send(service)
    })
  } finally {
   
  }
}
run().catch(console.dir);




app.listen(port,()=>{
    console.log(`This is app running on port ${port}`)
})