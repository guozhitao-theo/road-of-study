// 引入 数据库模块
let mysql = require("mysql")
// 引入数据库配置
let mysqlConfig = require("../config/config")
// 创建数据库链接池
let pool = mysql.createPool(mysqlConfig.mysql)

// 数据库链接池链接建立
// 它的回调函数包含两个参数，
// err是链接状态 null表示链接完成 不是空说明报错了
// connection 内方法
let query = function(sql,data){
    return new Promise(function(resolve,reject){
        pool.getConnection(function(err,connection){
            if(!err){
                connection.query(sql,data,function(error,result){
                    if(!error){
                        // 成功了就将数据存入resolve
                        resolve(result)
                    }else{
                        console.log('数据库链接失败')
                        reject(error)
                    }
                    // 释放数据库链接
                    connection.release()
                })
            }else{
                console.log('检查数据库是否建立或者数据库配置是否正确')
            }
        })
    })
    
}
module.exports = query