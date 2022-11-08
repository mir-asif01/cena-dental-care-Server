const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Cena dental care server running');
})

app.listen(port,()=>{
    console.log(`This is app running on port ${port}`)
})