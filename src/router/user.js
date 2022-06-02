const Router = require('koa-router')
const UserController = require('../controller/user')
const db = require("../db/index")
const router = new Router({
	prefix:'/api/users' // 统一前缀
})
const path = require('path')

// 注册
router.post('/register',UserController.register)

// 登录
router.post('/login',UserController.login)	

// 上传图片
router.post('/upload',  async ctx=>{
	let result = {
		success: true,
		message: '',
		data: null
	}
	const file = ctx.request.files.file;
	const basename = path.basename(file.path); 
	// ctx.origin: 当前服务器真实路径
	// ctx.body = { url: `${ctx.origin}/uploads/${basename}`,file:file } //ctx.origin 就是 localhost:端口号
	// let res = await db.insertData('image',{url: `/uploads/${basename}`})
	result.data = {
		url: `${ctx.origin}/uploads/${basename}`
	}
	ctx.body = result
})

module.exports = router