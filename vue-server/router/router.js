// 引入新闻模块
let news = require("./news")

// 将模块合并成一个对象
let obj = Object.assign({},news)

// 将对象导出
module.exports = obj