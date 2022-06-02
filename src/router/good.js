const Router = require('koa-router')
const GoodController = require('../controller/good')
const router = new Router({
	prefix:'/api' // 统一前缀
})

// 获取全部用户
router.post('/getGoodsList',GoodController.getGoodsList)	
router.post('/addGood',GoodController.addGood)	
router.post('/deleteGood',GoodController.deleteGood)	
router.get('/getGoodsClassify',GoodController.getGoodsClassify)	


module.exports = router