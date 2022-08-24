import {get,post} from './request';

// 接口的服务层 
export const Ajax = {
    // 注册
    register:(data:any)=>post("/users/register",data),
    //登录
    login:(data:any)=>post("/users/login",data),
    // token登录
    tokenlogin:(data:any,params:any,headers:any)=>post("/users/tokenlogin",data,params,headers),
    // 获取验证码
    sendcaptcha:(data:any)=>post("/users/sendcaptcha",data),
    // 验证码登录
    captchalogin:(data:any)=>post("/users/captchalogin",data),
    // 验证码修改密码
    checkcaptcha:(data:any)=>post("/users/checkcaptcha",data),
    // 知道密码修改密码
    changeuserinfo:(data:any)=>post('/users/changeuserinfo',data),
    // 获取用户信息
    getuserinfo:(data:any)=>post('/users/getuserinfo',data),
    // 获取用户权限列表
    getrolelist:(data:any)=>post('/users/getrolelist',data),
    // 上传图片
    uploadfiles:(data:any)=>post('http://120.48.35.240:7001/users/uploadfiles',data),
    // 获取用户列表
    getuserlist:(data:any)=>post('/users/getuserlist',data),
    // 添加用户
    adduser:(data:any)=>post('/users/adduser',data),
    // 删除用户
    deluser:(data:any)=>post('/users/deluser',data),
    // 修改用户
    updateuser:(data:any)=>post('/users/updateuser',data),
    // 获取学科
    getxuekelist:(data:any)=>post('/getxueke',data),
    // 添加学科
    addxueke:(data:any)=>post('/addxueke',data),
    // 删除学科
    delxueke:(data:any)=>post('/delxueke',data),
    // 修改学科
    updatexueke:(data:any)=>post('/updatexueke',data),
    // 获取班级列表
    getclasslist:(data:any)=>post('/getclasslist',data),
    // 添加班级
    addclass:(data:any)=>post('/addclass',data),
    // 删除班级
    delclass:(data:any)=>post('/delclass',data),
    // 修改班级
    updateclass:(data:any)=>post('/updateclass',data),
    // 添加公告
    addanno:(data:any)=>post('/addanno',data),
    // 获取公告列表
    getanno:(data:any)=>post('/getanno',data),
    // 修改公告
    updateanno:(data:any)=>post('/updateanno',data),
    // 删除公告
    delanno:(data:any)=>post('/delanno',data),
    // 添加意见
    addadvise:(data:any)=>post('/addadvise',data),
    // 获取意见
    getadvise:(data:any)=>post('/getadvise',data),
    // 删除意见
    deladvise:(data:any)=>post('/deladvise',data),
    // 添加面试题
    addms:(data:any)=>post('/addms',data),
    // 获取面试题列表
    getmslist:(data:any)=>post('/getmslist',data),
    // 删除面试题
    delms:(data:any)=>post('/delms',data),
    // 修改面试题热度
    updatems:(data:any)=>post('/updatems',data),
    //面试题添加评论
    addmscomment:(data:any)=>post('/addmscomment',data),
    // 获取面试题评论列表
    getmscommentlist:(data:any)=>post('/getmscomment',data),
    // 删除面试题评论
    delmscomment:(data:any)=>post('/delmscomment',data),
    // 添加喜欢
    addlike:(data:any)=>post('/addlike',data),
    // 获取喜欢列表
    getlikelist:(data:any)=>post('/getlike',data),
    // 删除喜欢
    dellike:(data:any)=>post('/dellike',data),
    // 添加考勤
    addkaoqin:(data:any)=>post('/addkaoqin',data),
    // 获取考勤列表
    getkaoqinlist:(data:any)=>post('/getkaoqin',data),
    // 修改考勤
    updatekaoqin:(data:any)=>post('/updatekaoqin',data),
    // 提交成绩
    addchengji:(data:any)=>post('/addchengji',data),
    // 获取成绩列表
    getchengjilist:(data:any)=>post('/getchengji',data),
    // 添加商品
    addshop:(data:any)=>post('/addshop',data),
    //查询商品
    getshop:(data:any)=>post('/getshop',data),
    //修改商品
    updateshop:(data:any)=>post('/updateshop',data),
    //删除商品
    delshop:(data:any)=>post('/delshop',data),
}
