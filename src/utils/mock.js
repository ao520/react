

import Mock from 'mockjs'   //mock插件

// 定义数据类型
var data = Mock.mock({
    // 20条数据
    "data|20": [{
      // 商品种类
      "goodsClass": "@cname(5)",
      // 商品Id
      "goodsId|+1": 1,
      //商品名称
      "goodsName": "@ctitle(10)",
      //商品地址
      "goodsAddress": "@county(true)",
      //商品等级评价★
      "goodsStar|1-5": "★",
      //商品图片
      "goodsImg": "@Image('100x100','@color','小甜甜')",
      //商品售价
      "goodsSale|30-500": 30
  
    }]
  })
// 输出结果随机生成的数据（node index.js）
console.log(data);

// 定义数据类型
var data1 = Mock.mock({
    // 20条数据
    "data|100": [{
      // 商品种类
      "goodsClass": "@ctitle",
      // 商品Id
      "goodsId|+1": 1,
      //商品名称
      "goodsName": "@ctitle(10)",
      //商品地址
      "goodsAddress": "@county(true)",
      //商品等级评价★
      "goodsStar|1-5": "★",
      //商品图片
      "goodsImg": "@Image('100x100','@color','小甜甜')",
      //商品售价
      "goodsSale|30-500": 30,
  
      // 邮箱：
      "email": "@email",
      // 颜色
      "color": "@color",
  
      // name
      "name": "@cname",
  
      //img,参数1：背景色，参2：前景色，参3：图片的格式，默认png，参4：图片上的文字
  
      "img": "@image('100*100','@color')",
      //英文文本(句子)参1：句子的个数，参2：句子的最小个数  参3：句子的最大个数，没有参1时，参2参3才会生效
      "Etext":"@paragraph(1,1,3)",
  
      //中文文本(句子)参1：句子的个数，参2：句子的最小个数  参3：句子的最大个数，没有参1时，参2参3才会生效
      "Ctext":"@cparagraph(1,1,3)",
  
      //中国大区
      "cregion":"@region",
      // 省
      "cprovince":"@province",
      //市
      "ccity":"@city",
      //省 + 市
      "ss":"@city(true)",
      //县
      "country":"@county",
      //省市县
      "countrysx":"@county(true)",
      //邮政编码
      "code":"@zip"
  
    }]
  })
  
  console.log(data1)



//   mock 模拟接口  拦截ajax 请求
Mock.mock("/getdataone","get",config=>{
    return {
        msg:"获取成功",
        code:200,
        data 
    }
})

Mock.mock('/getdatalist',"get",config=>{
  console.log(config)
  return {
    msg:'获取数据成功',
    code:200,
    result:data1 
  }
})

// 删除
Mock.mock("/deldata1one","post",config=>{
  console.log(config)
  var body = JSON.parse(config.body)
  console.log(body)
  var data = data1.data.filter(item=>item.goodsId!=body.goodsId);
  data1.data = data;  //修改数据 
  return {
    code:200,
    msg:'删除成功',
  }
})

// 修改 
Mock.mock("/setdata1one","post",config=>{
  var body = JSON.parse(config.body)
  // var item = data1.data.filter(item=>item.goodsId==body.goodsId);  // 找到要修改的数据 
  // item.name = body.name;
  data1.data = data1.data.map(item=>{
    if(item.goodsId==body.goodsId){
      item.name = body.name 
    }
    return item;
  })
  
  return {
    code:200,
    msg:'修改成功',
  }
})
