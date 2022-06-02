const service = require('../service/other')

class OtherController {
	// 查询商品列表
	async getTotal (ctx, next) {
		let result = {
			success: true,
			message: '',
			data: null
		}
		const res = await service.getTotal()
		result.data = res
		ctx.body = result
	}
}

module.exports = new OtherController()