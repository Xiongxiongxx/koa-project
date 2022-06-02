const service = require('../service/order')
const UUID = require('uuid')

class OrderController {
	// 查询商品列表
	async getOrdersList (ctx, next) {
		let result = {
			success: true,
			message: '',
			data: null
		}
		const data = ctx.request.body
		const res = await service.getOrdersList(data)
        result.data = {
            ...res,
            currentPage: data.currentPage,
            pageSize: data.pageSize
        }
	
		ctx.body = result

	}
	// 添加商品
	async addOrder (ctx, next) {
		let result = {
			success: true,
			message: '',
			data: null
		}
		let data = ctx.request.body

        data.orderId = UUID.v4()
		const res = await service.addOrder(data)
		if (res.affectedRows == 1) {
			result.data = true
		} else {
			result.message = '添加失败'
		}
		ctx.body = result
	}
	// 删除商品
	async deleteOrder (ctx, next) {
		let result = {
			success: true,
			message: '',
			data: null
		}
		let { id } = ctx.request.body
		const res = await service.deleteOrder(id)
		if (res.affectedRows == 1) {
			result.data = true
		} else {
			result.message = '删除失败'
		}
		ctx.body = result
	}
}

module.exports = new OrderController()