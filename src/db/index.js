const mysql = require('mysql')
const ENV = require('../config/config.default')

// 连接池
const pool = mysql.createPool({
	host: ENV.MYSQL_HOST,
	user: ENV.MYSQL_USER,
	post: ENV.MYSQL_PORT,
	password: ENV.MYSQL_PWD,
	database: ENV.MYSQL_DB
})

//对数据库进行增删改查操作的基础
let query = function (sql, values) {
	return new Promise((resolve, reject) => {
		pool.getConnection(function (err, connection) {
			if (err) {
				resolve(err)
			} else {
				connection.query(sql, values, (err, rows) => {
					if (err) {
						reject(err)
					} else {
						resolve(rows)
					}
					connection.release()
				})
			}
		})
	})

}

let createTable = function (sql) {
	return query(sql, [])
}

let findAllData = function (table, id) {
	let _sql = "SELECT * FROM ?? order by id desc"
	return query(_sql, [table])
}

let findUserByName = function (table, username) {
	let _sql = "SELECT * FROM ?? WHERE username = ? "
	return query(_sql, [table, username])
}


let findDataById = function (table, id) {
	let _sql = "SELECT * FROM ?? WHERE is_del = 0 and id = ? "
	return query(_sql, [table, id])
}


let findDataByPage = function (table, data) {
	let { name, gender, position, limitStart, pageSize } = data
	let _sql = "SELECT * FROM ?? WHERE is_del = 0 "
	let where = ""
	if (name !== "") {
		where += " and name like  '%" + name + "%'"
	}
	if (gender !== "") {
		where += " and gender = " + gender
	}
	if (position !== "") {
		where += " and position = " + position
	}
	if(!pageSize){
		where += " order by id desc"
	}else{
		where += " order by id desc LIMIT " + limitStart + ", " + pageSize
	}
	_sql += where
	return query(_sql, [table])
}
let findGoodsByPage = function (table, data) {
	let { name, classify,limitStart, pageSize } = data
	let _sql = "SELECT * FROM ?? WHERE is_del = 0 "
	let where = ""
	if (name !== "") {
		where += " and name like  '%" + name + "%'"
	}
	if (classify !== "") {
		where += " and classify =  '" + classify + "'"
	}
	if(!pageSize){
		where += " order by id desc"
	}else{
		where += " order by id desc LIMIT " + limitStart + ", " + pageSize
	}
	_sql += where
	return query(_sql, [table])
}
let findOrdersByPage = function (table, data) {
	let { goodId, personId,limitStart, pageSize } = data
	let _sql = "SELECT * FROM ?? WHERE is_del = 0 "
	let where = ""
	if (goodId !== "") {
		where += " and goodId =  '" + goodId + "'"
	}
	if (personId !== "") {
		where += " and personId =  '" + personId + "'"
	}
		where += " order by id desc LIMIT " + limitStart + ", " + pageSize
	_sql += where
	return query(_sql, [table])
}

let insertData = function (table, values) {
	let _sql = "INSERT INTO ?? SET ?"
	return query(_sql, [table, values])
}


let updateData = function (table, values, id) {
	let _sql = "UPDATE ?? SET ? WHERE id = ?"
	return query(_sql, [table, values, id])
}

let updatePwdByName = function (table, password, username) {
	let _sql = "UPDATE ?? SET password = ? WHERE username = ?"
	return query(_sql, [table, password, username])
}


let deleteDataById = function (table, id) {
	let _sql = "DELETE FROM ?? WHERE id = ?"
	return query(_sql, [table, id])
}


let select = function (table, keys) {
	let _sql = "SELECT ?? FROM ?? "
	return query(_sql, [keys, table])
}

let count = function (table, data) {
	let { name, gender, position} = data
	let _sql = "SELECT COUNT(*) total FROM ?? WHERE is_del = 0 "
	let where = ""
	if (name !== "") {
		where += "and name like  '%" + name + "%'"
	}
	if (gender !== "") {
		where += " and gender = " + gender
	}
	if (position !== "") {
		where += " and position = " + position
	}
	where += " order by id desc"
	_sql += where
	return query(_sql, [table])
}
let goodsCount = function (table, data) {
	let { name, classify} = data
	let _sql = "SELECT COUNT(*) total FROM ?? WHERE is_del = 0 "
	let where = ""
	if (name !== "") {
		where += "and name like  '%" + name + "%'"
	}
	if (classify !== "") {
		where += " and classify =  '" + classify + "'"	
	}
	where += " order by id desc"
	_sql += where
	return query(_sql, [table])
}
let ordersCount = function (table, data) {
	let { goodId, personId} = data
	let _sql = "SELECT COUNT(*) total FROM ?? WHERE is_del = 0 "
	let where = ""
	if (goodId !== "") {
		where += "and goodId =  '" + goodId + "'"
	}
	if (personId !== "") {
		where += " and personId =  '" + personId + "'"	
	}
	where += " order by id desc"
	_sql += where
	return query(_sql, [table])
}
let otherCount = function (table, line) {
	let _sql = "SELECT SUM(??) FROM ?? WHERE is_del = 0 "
	return query(_sql, [line, table])
}
let joinOrder = function (data) {
	let { goodId, personId} = data
	let _sql = "SELECT b.NAME goodName, b.price, b.img, c.NAME personName FROM orders a LEFT JOIN goods b ON a.goodId = b.id LEFT JOIN person c ON a.personId = c.id WHERE a.personId = "+personId+"  AND a.goodId = "+goodId
	return query(_sql, [])
}
module.exports = {
	query,
	createTable,
	findAllData,
	findUserByName,
	findDataById,
	findDataByPage,
	deleteDataById,
	insertData,
	updateData,
	updatePwdByName,
	select,
	count,
	findGoodsByPage,
	goodsCount,
	otherCount,
	findOrdersByPage,
	ordersCount,
	joinOrder
}