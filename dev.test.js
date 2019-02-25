/**
 * 开发环境下测试库是否能跑通
*/

// import Policy from './policy'
// ([\w|\d|\*]+\/[\w|*]+)|\* 过滤 ( goods/*  && goods/list) || goods/info  && goods/info || *

let policy = require('./src/policy')

policy.addPolicy({"Statement": [{"Action": ["goods/*","goodscategory/*","goodsspec/*","goodsspecvalue/*"], "Effect": "Allow"}]})

let string  = '( goods/*  && !goods/list) || goods/info  && goods/info && goods/infoXx || *';
var patt = /([\w|\d|\*]+\/[\w|*]+)|\*/g;
let matchList = string.match(patt);

matchList.map((item)=>{
    string=string.replace(/([\w|\d|\*]+\/[\w|*]+)|\*/,policy.verify(item) === true ? "true" : "false");//把'is'替换为空字符串
})

console.log(matchList,string)

console.log(!false)
