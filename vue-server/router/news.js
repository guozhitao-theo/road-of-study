// 引入数据库操作
let data = require("../controler/data/data")
module.exports = {
    getNews:async function(req,res){
        let result = await data.getNews()
        if(result){
            res.json({
                status:200,
                data:result,
                message:'新闻获取成功'
            })
        }else{
            res.json({
                status: 404,
                message: '获取新闻失败'
            })
        }
    },
    getNewsByPage: async function(req,res){
        let page = Number(req.body.page)
        let count = Number(req.body.count)
		console.log(page,count)
        if(!page){
            res.json({
                status: 500,
                message: '请输入数据'
            })
            return false
        }
        if(!count){
            res.json({
                status: 500,
                message: '请输入数据'
            })
            return false
        }
		let start = (page-1)*count
        let arr = [start,count]
        let result = await data.getNewsByPage(arr)
        if(result){
            res.json({
                status: 200,
                data: result,
                message: '新闻分页获取成功'
            })
        }else{
            res.json({
                status: 404,
                message: '获取新闻失败'
            })
        }
    }
}