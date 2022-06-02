const service = require('../service/modify')
const bcrypt = require('bcryptjs') // 加解密

class ModifyController {
	// 修改密码
	async modifyPwd(ctx,next){
		let result = {
			success: false,
			message: '',
			data: null
		  }
		let { username,	oldPwd, newPwd} = ctx.request.body
		const user = await service.findUser( username )
		// if(user.length <= 0){
		// 	result.message = '用户名不存在'
		// 	ctx.body = result
		// 	return
		// }
		// 判断提交的旧密码是否正确
		const compareResult = bcrypt.compareSync(oldPwd,user[0].password)
		if(!compareResult){
			result.message = '原密码错误'
			ctx.body = result
			return
		}
		// 判断提交的旧密码是否正确
		const compareNewOld = bcrypt.compareSync(newPwd,user[0].password)
		if(compareNewOld){
			result.message = '新密码不能与原密码一致'
			ctx.body = result
			return
		}
		// 输入密码加密后再存储
		newPwd = bcrypt.hashSync(newPwd,10)
		// 操作数据库
		const res = await service.modifyPwd( username, newPwd)
		if(res.affectedRows > 0){
			result.success = true
			result.data = true
		}
		ctx.body = result

	}

}

module.exports = new ModifyController()