// 引入express模块
let express = require("express")
// 引入body-parser模块
let bodyParser = require("body-parser")
// 引入路由
let router = require("./router/router")


// 使用express模块
let app = express()
// 配置bodyParse
let jsonParse = bodyParser.json()
let urlencoded = bodyParser.urlencoded({extended:false})

app.use(jsonParse)
app.use(urlencoded)

app.all('*',function(req,res,next){
    res.header( 'Access-Control-Allow-Origin', '*' );
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range, application/javascript;charset=UTF-8')
    res.header("Access-Control-Allow-Origin","*")
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    next()
})
// 后台接口
app.post("/getNews",router.getNews)
app.post("/getNewsByPage",router.getNewsByPage)
app.post("/getNewsById",router.getNewsById)
app.post("/addNews",router.addNews)
app.post("/deletNews",router.deletNews)

// 监听服务器端口
app.listen(3000,function(){
    console.log("app port: 3000")
})