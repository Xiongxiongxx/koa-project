const db = require("../db/index")

class ModifyController{
	async modifyPwd(username, newPwd){
		let result = await db.updatePwdByName('user', newPwd ,username)
		return result
	}
	async findUser(username){
		let result = await db.findUserByName('user', username)
		return result
	}

}

module.exports = new ModifyController()