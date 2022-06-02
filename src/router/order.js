const Router = require('koa-router')
const orderController = require('../controller/order')
const router = new Router({
	prefix:'/api' // 统一前缀
})

// 获取全部用户
router.post('/getOrdersList',orderController.getOrdersList)	
router.post('/addOrder',orderController.addOrder)	
router.post('/deleteOrder',orderController.deleteOrder)	


module.exports = router