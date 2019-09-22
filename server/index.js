const express = require('express') 
const app = express()

//使用cors跨域，哪怕端口不一样，主机名不一样，也可以访问
app.use(require('cors')())  
app.use(express.json())     //识别前端（客户端）提交过来的json数据

//设定所有域名都可以跨域
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options'){
        res.send(200);  //让options尝试请求快速结束
    }else{
        next();
    }
}
);

const mongoose = require('mongoose')
//只要在本机安装了mongoose就可以，都不需要数据库创建，他会自动创建
mongoose.connect('mongodb://localhost:27017/element-admin',{
    useNewUrlParser:    true,
    useFindAndModify:   true,
    useCreateIndex: true,
})

const Article = mongoose.model('Article', new mongoose.Schema({
    time: {type: String},
    title:  {type: String},
    body:   {type : String},
}));

app.get('/', async(req, res) => {
    res.send('index')
})

//新增文章  /api/资源/方法  Restful风格
app.post('/api/articles', async(req, res) => {
    //console.log("daoA");
    const article = await Article.create(req.body);     
    //前端传入数据过来，开始创建一条记录。
    //req.body 传入额外的字段，不会被赋值.  
    //console.log(req.body);
    //console.log(article);
    res.send(article)
})

//获取文章列表的接口
app.get('/api/articles', async(req, res) => {
    const articles = await Article.find()
    res.send(articles);
})

//删除文章
app.delete('/api/articles/:id', async(req, res)  => {
    await Article.findByIdAndDelete(req.params.id);  //上面的那个id相对应
    res.send({
        status : true
    });
})

//文章详情
app.get('/api/articles/:id', async(req, res)  => {
    const article = await Article.findById(req.params.id);
    res.send(article);
})

//修改文章  post,put,patch都可以，前端方便用post，Restful一般规定put或者patch
app.put('/api/articles/:id', async(req, res)  => {
    const article = await Article.findByIdAndUpdate(req.params.id,req.body);
    res.send(article)
})

app.listen('3000', () => {
    console.log("hello");
})