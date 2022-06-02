const db = require("../db/index")

class PersonController{
	async getUserList(data){
		// let list = await db.findAllData('person')
		let total = await db.count('person', data)
		let limitStart = (data.currentPage - 1) * data.pageSize < 0 ? 0 : (data.currentPage - 1) * data.pageSize
		data.limitStart = limitStart
		let list = await db.findDataByPage('person',data)
		return {
			list,
			total:total[0].total,
		}
	}
	async addUser(data){
		let result = await db.insertData('person',data)
		return result
	}
	async deleteUser(id){
		let result = await db.updateData('person',{is_del:1},id)
		return result
	}
}

module.exports = new PersonController()