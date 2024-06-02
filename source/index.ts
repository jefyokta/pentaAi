const express = require('express');
const gemini = require('./Controllers/Gemini')

const app = express()


app.get('/', (req: any, res: any) => {
    res.json('helloworld')

})

app.use('/gemini',gemini)

app.listen(3100,()=>{
    console.log('gas')
})