const service = require('../service/good')

class GoodController {
	// 查询商品列表
	async getGoodsList (ctx, next) {
		let result = {
			success: true,
			message: '',
			data: null
		}
		const data = ctx.request.body
		const res = await service.getGoodsList(data)
		if(!data.pageSize){
			result.data = {
				...res
			}
		}else{
			result.data = {
				...res,
				currentPage: data.currentPage,
				pageSize: data.pageSize
			}
		}
	
		ctx.body = result

	}
	// 添加商品
	async addGood (ctx, next) {
		let result = {
			success: true,
			message: '',
			data: null
		}
		let data = ctx.request.body
		const res = await service.addGood(data)
		if (res.affectedRows == 1) {
			result.data = true
		} else {
			result.message = '添加失败'
		}
		ctx.body = result
	}
	// 删除商品
	async deleteGood (ctx, next) {
		let result = {
			success: true,
			message: '',
			data: null
		}
		let { id } = ctx.request.body
		const res = await service.deleteGood(id)
		if (res.affectedRows == 1) {
			result.data = true
		} else {
			result.message = '删除失败'
		}
		ctx.body = result
	}
	// 获取分类
	async getGoodsClassify (ctx, next) {
		let result = {
			success: true,
			message: '',
			data: null
		}
		const res = await service.getGoodsClassify()
		var treeData = [];
		var map = {};
		res.forEach(function (item) {
			map[item.id] = item;
		})
		res.forEach(function (item) {
			var parent = map[item.pid];
			if (parent) {
				(parent.children || (parent.children = [])).push(item);
			} else {
				treeData.push(item);
			}
		})
		result.data = treeData
		ctx.body = result
	}
}

module.exports = new GoodController()