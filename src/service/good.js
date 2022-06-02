const db = require("../db/index")

class GoodController{
	async getGoodsList(data){
		// let list = await db.findAllData('person')
		let total = await db.goodsCount('goods', data)
		let limitStart = (data.currentPage - 1) * data.pageSize < 0 ? 0 : (data.currentPage - 1) * data.pageSize
		data.limitStart = limitStart
		let list = await db.findGoodsByPage('goods',data)
		return {
			list,
			total:total[0].total,
		}
	}
	async addGood(data){
		let result = await db.insertData('goods',data)
		return result
	}
	async deleteGood(id){
		let result = await db.updateData('goods',{is_del:1},id)
		return result
	}
    async getGoodsClassify(){
        let result = await db.findAllData('classify')
		return result
    }
}

module.exports = new GoodController()