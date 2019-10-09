const express = require('express')
const JwtUtil = require('./jwt'); // 引入jwt token工具

var fs = require("fs")  //读取本地文件
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

//进行请求拦截:除了前front里面的，对back里面的都进行拦截
app.use(function (req, res, next){
    //一共三个接口不需要拦截：
    //  /imgCode   /lone /api/fr/articles
    console.log(req.headers);
    console.log(req.headers.token);
    console.log(req.url);
    
    //下面这个正则匹配的是前fr分页的请求
    var reg = /\/api\/fr\/articlesf\/(undefined||[1-9]+)\/[1-9]/;
    //console.log( req.url.match(reg) );
    var pss = req.url.match(reg) ; //匹配的项

    var reg1 = /\/api\/discussc\/(undefined||[1-9]+)\/[1-9]/;
    //console.log( req.url.match(reg) );
    var pss1 = req.url.match(reg1) ; //匹配的项

    if (req.url == '/api/fr/articlesTotalCount' ||
        pss != null ||
        req.url == '/api/imgCode' ||
        req.url == '/api/lone' ||
        req.url == '/api/Van' ||
        pss1 != null  ||  //评论的分页查看不用阻拦
        req.url == '/api/discussCount' ||
        req.url == '/api/discussz'  //评论的增加不用阻拦
        ) {
        next();
    }else{
        let token = req.headers.token;
        let jwt = new JwtUtil(token);
        let result = jwt.verifyToken();
        console.log('result是：',result);
        // 如果考验通过就next，否则就返回登陆信息不正确
        if (result == 'err') {
            console.log(result);
            res.send({status: 403, msg: '登录已过期,请重新登录',res: result});
            // res.render('login.html');
        } else {
            next();
        }
    }

});

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

const Discuss = mongoose.model('Discuss', new mongoose.Schema({
    Name: {type: String},
    content:  {type: String},
    parentId:   {type : String},    //指向mongoose自动生成的_id
}));

//删除一条评论
app.delete('/api/discuss/:id', async(req, res)  => {
    await Discuss.findOneAndRemove({_id:req.params.id});  //上面的那个id相对应
    res.send({
        status : true
    });
})

//增加一条评论
app.post('/api/discussz', async(req, res) => {
    const discuss = await Discuss.create(req.body);     
    res.send(discuss)
})

//获取评论总数
app.post('/api/discussCount', async(req, res) => {
    let Data = await Discuss.find({parentId : "0"})
    let count = Data.length
    res.send({status: 200 ,totalCount:  count})
})

//分页查看评论  ：  每5个一级评论为一页
app.post('/api/discussc/:pageIndex/:pageSize', async(req, res) => {
    let getPage = parseInt(req.params.pageIndex) - 1
    let getLimit = parseInt(req.params.pageSize)

    let discuss = await Discuss.find({
        parentId: "0"        //只查看父级评论
    }).limit(getLimit).skip(getPage* getLimit).sort({_id:-1}).exec()
    //然后查看这五条父级评论的子评论

    //console.log(discuss)

    let rdatas = []     //最终返回的数据
    //格式为：
    //[ {Name: xx, content: xx}, children: [递归地 ]    ]

    let data = {}
    var z = []
    for (var i = 0; i < discuss.length; i++){
        
        data = {}
        data.Name = discuss[i].Name;
        data.content = discuss[i].content;
        data._id = discuss[i]._id
        data.label = "游客[" + discuss[i].Name + "]:    " + discuss[i].content;
        data.children = []

        rdatas.push(data)
        z.push(data)
    }

    //开始广度优先搜索
    while (z.length != 0){
        var ediscuss = z.pop()
        let childDiscuss = await Discuss.find({
            parentId : ediscuss._id        //只查看父级评论
        }).exec()
        
        let tempdate = {}
        
        //console.log("其id是:");
        //console.log(ediscuss._id);

        for (var i = 0; i < childDiscuss.length ; i++){

            tempdate = {}
            tempdate.Name = childDiscuss[i].Name;
            tempdate.content = childDiscuss[i].content;
            tempdate._id = childDiscuss[i]._id
            tempdate.label = "游客[" + childDiscuss[i].Name + "]:    " + childDiscuss[i].content;
            tempdate.children = []

            //console.log(tempdate);
            
            ediscuss.children.push(tempdate)
            z.push(tempdate)
        }
    }
    
    //console.log(rdatas[0].children)     //递归第二次，不对。
    

    res.send({status: 200, discuss:rdatas});
})

//获取文件中获取 ： 首页
app.get('/api/Van', async(req, res) => {
    fs.readFile('./server/Van.json', function (err, data) {   //读取路径是：以启动server.js的位置为基准的
        if (err) {
            res.send(false);
        }
        var Van = data.toString();//将二进制的数据转换为字符串
        Van = JSON.parse(Van);//将字符串转换为json对象
        res.send(Van);  // title , body1, body2
    });
})

//修改文件： 修改首页
app.put('/api/Van/put', async(req, res)  => {
    fs.readFile('./server/Van.json', function (err, data) {   //读取路径是：以启动server.js的位置为基准的
        if (err) {
            res.send(false);
        }
        var Van = data.toString();//将二进制的数据转换为字符串
        Van = JSON.parse(Van);//将字符串转换为json对象
        
        Van.title = req.body.title;
        Van.body1 = req.body.body1;
        Van.body2 = req.body.body2;
        var str = JSON.stringify(Van);
        fs.writeFile('./server/Van.json',str,function(err){
            if(err){
                console.error(err);
            }
            console.log('--------------------修改成功');
            res.send(str);
        })
    });

})

//新增文章  /api/资源/方法  Restful风格
app.post('/api/articles', async(req, res) => {
    //const article = await Article.create(req.body);     
    var title = req.body.title;
    var body = req.body.body;
    var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth()+1;
    var day = myDate.getDate();
    var hour = myDate.getHours();       //获取当前小时数(0-23)
    var minute = myDate.getMinutes();     //获取当前分钟数(0-59)
    var newDay = year + "-" + month + "-" + day + "日:" + hour +":" + minute + "分"; 
    
    var data = {}
    data.title = title;
    data.body = body;
    data.time = newDay;
    const article = await Article.create(data);     

    //前端传入数据过来，开始创建一条记录。
    //req.body 传入额外的字段，不会被赋值.  
    //console.log(req.body);
    //console.log(article);
    res.send(article)
})


//获取文章总数的接口
app.get('/api/articlesTotalCount', async(req,res) => {
    let Data = await Article.find({})
    let count = Data.length
    res.send({status: 200 ,totalCount:  count})
})

//分页获取文章列表的接口
app.post('/api/articlesf/:pageIndex/:pageSize', async(req,res) => {
    let getPage = parseInt(req.params.pageIndex) - 1
    let getLimit = parseInt(req.params.pageSize)

    let articlesf = await Article.find(
            JSON.stringify(req.body)  == "{}" ? {} : {
                //文章搜索功能 
                $and:[   //多条件，数组
                    //$regex: "" 为空的时候，能匹配所有的
                    {"time": {$regex: req.body.time}},  //正则的模糊查询
                    {"title": {$regex: req.body.title}},
                    {"body": {$regex: req.body.body}},
                ]
            }   
        ).limit(getLimit).skip(getPage* getLimit).sort({_id:-1}).exec()

    let articlesfff = await Article.find(
        JSON.stringify(req.body)  == "{}" ? {} : {
            //文章搜索功能 
            $and:[   //多条件，数组
                //$regex: "" 为空的时候，能匹配所有的
                {"time": {$regex: req.body.time}},  //正则的模糊查询
                {"title": {$regex: req.body.title}},
                {"body": {$regex: req.body.body}},
            ]
        }   
    )
    
    let tlen = articlesfff.length

    res.send({status: 200, articlesf:articlesf, total: tlen});
})

//获取文章总数的接口
app.get('/api/fr/articlesTotalCount', async(req,res) => {
    let Data = await Article.find({})
    let count = Data.length
    res.send({status: 200 ,totalCount:  count})
})

//分页获取文章列表的接口
app.get('/api/fr/articlesf/:pageIndex/:pageSize', async(req,res) => {
    let getPage = parseInt(req.params.pageIndex) - 1
    let getLimit = parseInt(req.params.pageSize)

    let articlesf = await Article.find({},{time:1,title:1,body:1}).sort({_id:-1}).limit(getLimit).skip(getPage* getLimit).exec()
    res.send({status: 200, articlesf:articlesf});

})


//前端获取文件列表接口,无需验证,在拦截器上去除
app.get('/api/fr/articles', async(req, res) => {
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

//用户根据login.conf里面的口令登录
app.post('/api/lone', async(req, res)  => {
    fs.readFile('./server/login.conf', function (err, data) {   //读取路径是：以启动server.js的位置为基准的
        if (err) {
            res.send(false);
        }
        if (data.toString() === req.body.pass){
            // 登陆成功，添加token验证
            let sid = req.body.pass + req.body.seccode; //密码 和 验证码组成其sid
            let jwt = new JwtUtil(sid); //将用户sid传入，生成token
            let token = jwt.generateToken();
            res.send({status:200,msg:'登陆成功',token:token});
        }else{
            res.send({status:404,msg:'口令错误'})
        }
    });
})

//获取验证码
app.get('/api/imgCode', async(req, res)  => {
        var code = "";
		var codeLength = 4; //验证码的长度  
		const random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
			'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数  
		for(let i = 0; i < codeLength; i++) { //循环操作  
			let index = Math.floor(Math.random() * 36); //取得随机数的索引（0~35）  
			code += random[index]; //根据索引取得随机数加到code上  
		}
        this.checkCode = code; //把code值赋给验证码  
        res.send(code);

})

app.listen('3000', () => {
    console.log("hello");
})