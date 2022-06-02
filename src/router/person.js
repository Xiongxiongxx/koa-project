const Router = require('koa-router')
const PersonController = require('../controller/person')
const router = new Router({
	prefix:'/api' // 统一前缀
})

// 获取全部用户
router.post('/getUserList',PersonController.getUserList)	
router.post('/addUser',PersonController.addUser)	
router.post('/deleteUser',PersonController.deleteUser)	

module.exports = router