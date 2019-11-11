// 引入数据操作方法
let query = require("../mysql")

module.exports = {
    getNews: async function () {
        let sql = 'select * from news order by createTime desc'
        let result = await query(sql,'').catch(function(err){
            return false
        })
        return result    
    },
	getNewsById: async function (data) {
		let sql = 'select * from news where id = ?'
		let result = await query(sql,data).catch(function(err){
			return false
		})
		return result
	},
    getNewsByPage: async function (data) {
        let sql = 'select * from news order by createTime desc limit ? ,?;'
        let result = await query(sql,data).catch(function(err){
            return false
        })
		console.log(result)
        return result
    },
	addNews: async function (data) {
		let sql = 'insert into news(title,time,detial) values(?)'
		let result = await query(sql,[data]).catch((err)=>{
			return false
		})
		return result
	},
	deletNews: async function(data){
		let sql = 'delete from news where id = ?'
		let result = await query(sql,data).catch(function(err){
			return false
		})
		return result
	},
	updateNews: async function(data){
		let sql = 'update news set title= ? ,time= ?,detial =? where id = ?'
		let result = await query(sql,[data]).catch(function(err){
			return false
		})
		return result
	}

}