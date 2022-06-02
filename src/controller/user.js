const service = require('../service/user')
const {jwtSecretKey} = require('../config/config.default')
const bcrypt = require('bcryptjs') // 加解密
const jwt = require('jsonwebtoken')

class UserController {
	// 注册
	async register(ctx,next){
		let result = {
			success: false,
			message: '',
			data: null
		  }
		// 获取数据
		let { username, password, email} = ctx.request.body
		if(!username || !password || !email){
			result.message = '请输入注册信息'
			ctx.body = result
			return
		}

		// 查询用户名是否重复
		const user = await service.login(username)
		if(user.length > 0){
			result.message = '用户名已存在'
			ctx.body = result
			return
		}
		// 输入密码加密后再存储
		password = bcrypt.hashSync(password,10)
		// 存入数据库
		const res = await service.register(username, password)
		if(res.affectedRows == 1){
			result.success = true
			result.data = true
		}else{
			result.message = '注册失败'
		}
		ctx.body = result
		
	}
	// 登录
	async login(ctx,next){
		let result = {
			success: false,
			message: '',
			data: null
		  }
		// 获取数据
		const { username, password} = ctx.request.body
		if(!username || !password){
			result.message = '请输入登录信息'
			ctx.body = result
			return
		}
		// 操作数据库
		const res = await service.login(username)
		if(res.length != 1){
			result.message = '登录失败'
			ctx.body = result
			return
		}
		// 对比：bcrypt.compareSync('原始密码', '加密之后的密码')
		let comparePwd =  bcrypt.compareSync(password,res[0].password)
		if(!comparePwd){
			result.message = '密码错误'
			ctx.body = result
			return
		}
		// 登陆成功后生成Token返回客户端
		let token = jwt.sign({
			username,password
		},jwtSecretKey,{
			expiresIn: 3600 * 24 * 7 // 7天
		})

		result.success = true
		result.data = {
			id:res[0].id,
			username:res[0].username,
			token: 'Bearer '+ token // Bearer必须有，用来解析的
		}
		ctx.body = result
	}

}

module.exports = new UserController()