const service = require('../service/person')

class PersonController {
	// 查询人员列表
	async getUserList (ctx, next) {
		let result = {
			success: true,
			message: '',
			data: null
		}
		const data = ctx.request.body
		const res = await service.getUserList(data)
		if(!data.pageSize){
			result.data = {
				...res,
			}
		}else{
			result.data = {
				...res,
				currentPage:data.currentPage,
				pageSize:data.pageSize
			}
		}
		ctx.body = result

	}
	// 添加人员
	async addUser (ctx, next) {
		let result = {
			success: true,
			message: '',
			data: null
		}
		let data = ctx.request.body
		const res = await service.addUser(data)
		if (res.affectedRows == 1) {
			result.data = true
		} else {
			result.message = '添加失败'
		}
		ctx.body = result
	}
	async deleteUser (ctx, next) {
		let result = {
			success: true,
			message: '',
			data: null
		}
		let { id } = ctx.request.body
		const res = await service.deleteUser(id)
		if (res.affectedRows == 1) {
			result.data = true
		} else {
			result.message = '删除失败'
		}
		ctx.body = result
	}
}

module.exports = new PersonController()