const db = require("../db/index")

class OrderController{
	async getOrdersList(data){
		// let list = await db.findAllData('person')
		let total = await db.ordersCount('orders', data)
		let limitStart = (data.currentPage - 1) * data.pageSize < 0 ? 0 : (data.currentPage - 1) * data.pageSize
		data.limitStart = limitStart
		let list = await db.findOrdersByPage('orders',data)
		return {
			list,
			total:total[0].total,
		}
	}
	async addOrder(data){
        let good = await db.findDataById('goods', data.goodId)
        let person = await db.findDataById('person', data.personId)
        data.img = good[0].img
        data.goodName = good[0].name
        data.price = good[0].price
        data.personName = person[0].name
		let result = await db.insertData('orders',data)
		return result
	}
	async deleteOrder(id){
		let result = await db.updateData('orders',{is_del:1},id)
		return result
	}
   
}

module.exports = new OrderController()