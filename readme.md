对应的前端项目：https://github.com/Xiongxiongxx/vue3-manager.git

### 项目基本结构：

第一层：router层，路由层，它的任务就是配置路由；

第二层：controller层，控制层，它的任务就是参数校验和，处理业务逻辑和返回数据；

第三层：service层，它的任务是和数据库交接。

router嵌套controller，controller嵌套service，service连接数据库。

启动项目： npm run dev

### 中间件：

npm i koa-body@4.1.0 // 解析请求数据

npm i koa-json // 返回给前端的json对象

npm i koa2-cors // 解决跨域

npm i koa-json-error // 处理错误

npm i koa-jwt // 生成token

npm i jsonwebtoken // 生成token

npm i koa-multer // 图片上传

npm i koa-static@5.0.0 // 实现生成图片链接

npm i koa-icefire-upload // 支持批量上传图片、批量上传文件

npm install uuid // 生成随机字符串

npm install dotenv // 配置环境变量




