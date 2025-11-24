var express = require('express');
const logger = require('morgan');
const axios = require('axios'); // npm install axios --save
const list = require('./data');
const firebase = require('./firebase')

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({'extended' : true}))
app.use(logger('dev'))
app.use(express.static('public')); // html, image 등 정적파일 제공 폴더 지정


app.get('/',(req,res)=> {
    res.sendFile('index.html');
})


//curl localhost:3000/user/tommy
app.get('/user/:id',(req,res)=> {
    res.send(`User id is ${req.params.id}`); // Or res.send('User id is ' + req.params.id);
})


app.get('/user',(req,res)=> {
    res.send(`User id is ${req.query.id}`);
})

// curl -X POST localhost:3000/user -d '{"id" : "jyc", "name" : "Jae Young"}' -H "Content-Type: application/json"
app.post('/user',(req,res)=> {
    console.log(req.body.name);
    res.send(req.body);
})

app.get('/music_list', (req,res) => {
    res.json(list);
})


app.get('/likes', async (req, res) => {
    const db = firebase.firestore();
    const snapshot = await db.collection('likes').get().catch(e=> console.log(e));
    let results = [];
    if (snapshot.empty) {
        console.log("No result");
        res.json([]);
        return;
    } else {
        snapshot.forEach(doc => {
        results.push(doc.data())
        //console.log(doc.id, '=>', doc.data());
    })
    res.json(results);
    }
})
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});