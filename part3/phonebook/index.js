const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

// app.use(morgan('tiny'))
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms ',
      tokens.body(req, res)
    ].join(' ')
}))

let data = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get('/info',(req,res)=>{
    res.send(`Phonebook has info for ${data.length} people<br/>${new Date()}`)
})

app.get('/api/persons',(req,res)=> {
    res.json(data)
})

app.get('/api/persons/:id',(req,res)=>{
    const id = Number(req.params.id)
    const dataPerson = data.find(item => item.id === id)
    if(dataPerson){
        res.json(dataPerson)
    }else{
        res.status(404).end()
    }
    
})

app.delete('/api/persons/:id',(req,res)=>{
    const id = Number(req.params.id)
    data = data.filter(item => item.id !== id)
    res.status(204).end()
})

let generateRandomId = () => {
    return Math.round(Math.random()*10000000)
}

app.post('/api/persons', (req,res)=>{
    let body = req.body
    if(!body.name || !body.number){
        return res.status(400).json({error: 'content missing'})
    }
    if(data.find(item => item.name.trim() === body.name.trim() )){
        return res.status(400).json({error: 'name must be unique'})
    }
    data.push({
        id: generateRandomId(),
        name: body.name.trim(),
        number: body.number.trim()
    })
    res.json(data)
})

app.listen(3001, ()=> {
    console.log('listening to port 3001')
})