const Router = require('koa-router')
const ModifyController = require('../controller/modify')
const router = new Router({
	prefix:'/api' // 统一前缀
})

// 修改密码
router.post('/modifyPwd',ModifyController.modifyPwd)	

module.exports = router