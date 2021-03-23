const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { User } = require('./models/User')


const config = require('./config/key');

//application/s-www-form-rul-rulencoded 분석해서 가져올수 있도록
app.use(bodyParser.urlencoded({extended: true}));

//aplication/json 형태를 분석해서 가져올수 있도록
app.use(bodyParser.json());

mongoose.connect(config.mogoURI,{
    useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MogoDB Connected'))
  .catch(err => console.log(err))



app.get('/',(req,res) => res.send('Hello World! 하이'))

app.listen(port,() => console.log(`Example app listening on port ${port}!`))




app.post('/register',(req, res) => {
    //회원 가입 할 때 필요한 정보들을  client 에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.

    const user = new User(req.body)

    user.save((err,userInfo) => {
        if(err) return res.json({success : false, err})
        return res.status(200).json({
            success:true
        })
    });


})