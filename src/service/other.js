const db = require("../db/index")

class OtherController{
	async getTotal(){
        let goodsTotal = await db.goodsCount('goods',{name:'',classify:''})
        let salesTotal = await db.otherCount('person', 'sales')
        let ordersTotal = await db.otherCount('person', 'orders')
        const data = {
            goodsTotal:goodsTotal[0].total,
            salesTotal:salesTotal[0]["SUM(`sales`)"],
            ordersTotal:ordersTotal[0]["SUM(`orders`)"]
        }
        return data
	}
}

module.exports = new OtherController()