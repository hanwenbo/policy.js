# policy.js
js验证policy语法

php版本 ： https://github.com/hanwenbo/policy

本库主要用于FaShop项目内使用，不建议其他人直接使用

## 安装
```bash
npm install fashop-policy --save
```

## 引入和使用
```js
import Policy from "fashop-policy"

var policy =  new Policy
// 支持添加多组
policy.addPolicy({"Statement": [{"Action": ["user/*","goods/info"], "Effect": "Allow"}]})
policy.addPolicy({"Statement": [{"Action": ["user/*","goods/list"], "Effect": "Deny"}]})

if(policy.verify('goods/info') === true){
    // 有权限...
    // 执行.........
}else{
    // 不显示菜单
    // 或者显示占位信息
}

// 测试
policy.verify('goods/info').should.be.equal(true)
policy.verify('goods/list').should.be.equal(false)

// 验证表现层，用于多个权限同时验证，当都满足条件时才显示某个节点
let string  = '(( goods/*  && !goods/list) && goods/info  && goods/info && goods/infoXx) || * || goods/info';

policy.viewVerify(string)

```
更便捷的语句式操作，请见github的fashop-admin项目

## 测试
> 自动执行test目录下的所有文件
```bash 
mocha
```

## 发布
```bash
npm publish
```
发布的时候注意源

源管理工具：NRM

安装
`sudo npm install -g nrm`

查看源列表
`nrm ls`

使用某个源
`nrm use npm`


## 开发
 - 编译基于rollup
 - 支持浏览器和nodejs

## 疑问

由于不熟悉js

不明白为什么class不能定义属性如：
```js
class XX{
    name;
    sex;
}
```
在umi.js下就可以

但在rollup下编译就过不去，需要通过构造函数去this.xxxx赋值

如果谁知道，请告诉我

class了解参考：http://es6.ruanyifeng.com/#docs/class

### 感谢
![img](https://ws4.sinaimg.cn/large/006tKfTcly1g139x67vvrj30ry0nan43.jpg)
