// 引入数据库操作
let data = require("../controler/data/data")
let moment = require("moment")
// 引入multer 
let multer = require("multer")
let Storage = multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,'./fileloader');
    },
    filename:function(req,file,callback){
        callback(null,file.fieldname+'_'+Date.now()+'_'+file.originalname)
    }
})
let upload = multer({storage:Storage}).array('newsUploader')

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
	getNewsById:async function(req,res){
		console.log(req.body)
		let id = req.body.id
		console.log(id)
		if(!id){
			return res.json({
				status:404,
				message: '请确认数据的完整性'
			})
		}
		let result = await data.getNewsById(id)
		if(result){
			res.json({
				status:200,
				message:'查询成功',
				data: result
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
    },
	addNews: async function(req,res) {
		upload(req,res,async function(err){
			if(err){
				return res.json({
                    status:531,
                    message:'文件上传失败'
                })
			}else{
				let title = req.body.title
				let time = moment(req.body.time).format('YYYY-MM-DD')
				//let img = req.body.title
				let detial = req.body.detial
				console.log(title)
				console.log(time)
				console.log(detial)
				if(!title){
					return res.json({
						status: 404,
						message:'请确认数据的完整性'
					})
				}
				if(!time){
					return res.json({
						status: 404,
						message: '请确认数据的完整性'
					})
				}
				//if(!img){
				//	return res.json({
				//		status: 404,
				//		message: '请确认数据的完整性'
				//	})
				//}
				if(!detial){
					return res.json({
						status: 404,
						message: '请确认数据的完整性'
					})
				}
				let arr = [title,time,detial]
				console.log(arr)
				let result = await data.addNews(arr)
				console.log(result)
				if(result){
					return res.json({
						status: 200,
						message: '添加新闻成功'
					})
				}else{
					return res.json({
						status:500,
						message:'添加新闻失败'
					})
				}
			}
		})
	},
	updateNews: async function(req,res){
		let title = req.body.title
		let time = req.body.time
		let detial = req.body.detial
		let id = req.body.id
		if(!id){
			return res.json({
				status: 404,
				message:'请确认修改的信息id'
			})
		}
		if(!title){
			return res.json({
				status: 404,
				message:'请确认修改信息'
			})
		}
		if(!time){
			return res.json({
				status: 404,
				message: '请确认修改的信息'
			})
		}
		if(!time){
			return res.json({
				status: 404,
				message: '请确认修改的信息'
			})
		}
		let arr = [title,time,detial,id]
		let result = await data.deletNews(arr)
		if(result){
			return res.json({
				status: 200,
				message: '修改数据成功'
			})
		}else{
			return res.json({
				status: 500,
				message: '修改商品失败'
			})
		}
		
	},
	deletNews: async function(req,res){
		let id = req.body.id
		if(!id){
			return res.json({
				status: 404,
				message: ''
			})
		}
		let  result = await data.deletNews(id)
		console.log(result)
		if(result){
			return res.json({
				status:200,
				message:'删除成功'
			})
		}else{
			return res.json({
				status: 500,
				message:'删除失败'
			})
		}
	}
	
}