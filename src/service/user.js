const db = require("../db/index")

class UserService{
	async register(username, password){
		let result = await db.insertData('user',{username,password})
    	return result
	}

	async login(username){
		let result = await db.findUserByName('user',username)
		return result
	}


}

module.exports = new UserService()