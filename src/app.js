const Koa = require('koa')
const app = new Koa()
const path = require('path')
const {APP_PORT,jwtSecretKey} = require('./config/config.default')

// 解析body
const KoaBody = require('koa-body')
// app.use(KoaBody())
app.use(KoaBody({
    multipart: true, //支持图片文件
    formidable: {
        uploadDir: path.join(__dirname, '/public/uploads'), //设置上传目录
        keepExtensions: true, //保留拓展名
    }
}))

// 解决跨域
const cors = require('koa2-cors')
app.use(cors())
// 配置以下请求头后前端可不解决跨域问题
app.use(async (ctx, next)=> {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type');
    ctx.set('Access-Control-Allow-Methods', 'GET, POST');
    ctx.set('Access-Control-Allow-Credentials', 'true');
    await next();
  });
// 错误处理
const jsonerror = require('koa-json-error')
app.use(jsonerror())

// token
const koajw = require('koa-jwt')

// users/uploads 开头的路由不需要经过jwt认证
app.use(koajw({
	secret:jwtSecretKey
}).unless({path:[/^\/api\/users/,/^\/uploads/,/^\/api\/upload/]}))

// 2、引入koa-static实现生成图片链接
//该中间件帮助我们生成一个静态服务, 指定了一个文件夹, 文件夹下所有文件可以通过http 服务来访问
const koaStatic=require('koa-static')
app.use(koaStatic(path.join(__dirname, 'public'))) //接收的参数就是指定的目录, 然后现在就把图片生成链接了

// 路由
const userRouter = require('./router/user')
const modifyRouter = require('./router/modify')
const personRouter = require('./router/person')
const goodRouter = require('./router/good')
const otherRouter = require('./router/other')
const orderRouter = require('./router/order')

// app.use只能接受函数作为参数，不能接收对象
app.use(userRouter.routes(), userRouter.allowedMethods())
app.use(modifyRouter.routes(), modifyRouter.allowedMethods())
app.use(personRouter.routes(), personRouter.allowedMethods())
app.use(goodRouter.routes(), goodRouter.allowedMethods())
app.use(otherRouter.routes(), otherRouter.allowedMethods())
app.use(orderRouter.routes(), orderRouter.allowedMethods())


// 匹配不到页面的全部跳转404
// app.use(async (ctx,next)=>{
// 	await next()
// 	if(parseInt(ctx.status) === 404){
// 		ctx.response.redirect("/404")
// 	}
// })

//统一错误异常处理
app.use(async (ctx, next) => {
	try {
	  await next();
	} catch (err) {
        console.log('err',err)
	  // will only respond with JSON
	  ctx.status = err.statusCode || err.status || 500;
	  ctx.body = {
		message: err.message
	  };
	}
  })

  app.onerror = (err) => {
	console.log('捕获到了!', err.message);
  }

app.listen(APP_PORT,()=>{
	console.log(`app server is running at http://localhost:${APP_PORT}`)
})