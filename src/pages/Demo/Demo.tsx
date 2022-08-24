

import React, { FC } from 'react'
// https://www.cnblogs.com/samve/p/12347658.html
// typescript 不过是 javascript 严格的语法模式  
// 所有的变量声明来源和类型 
// Typescript原始数据类型：
// string
// number
// boolean
// null
// undefined 
// enum   枚举类型 
// symbol    
// 空值一般采用void表示，void可以表示变量，也可以表示函数返回值。
// any 任意类型
// Array 数组  []
// Object 对象  {}



// 1.FC  React.FC是函数式组件，是在TypeScript使用的一个泛型，FC就是FunctionComponent的缩写，事实上React.FC可以写成React.FunctionComponent 
// 2.React.FC 包含了 PropsWithChildren 的泛型，不用显式的声明 props.children 的类型。React.FC<> 对于返回类型是显式的，而普通函数版本是隐式的（否则需要附加注释
// 3.React.FC提供了类型检查和自动完成的静态属性：displayName，propTypes和defaultProps（注意：defaultProps与React.FC结合使用会存在一些问题）。
// 4.我们使用React.FC来写 React 组件的时候，是不能用setState的，取而代之的是useState()、useEffect等 Hook API


// Typescript中对象类型-接口：  可描述类的一部分抽象行为，也可描述对象的结构形状。
// public  公有变量
// private  私有变量
// protected 被保护的变量  
class Comment{
    constructor(
        public id:string,
        public name:string,
        public age:number
    ){

    }
}
const Demo:FC<{id:number,age:number,name:string }> = ({
    id,
    age,
    name
}) => {

    let a = 100;
    let b = "Hello"
    let c ;

    let d:number = 2000;
    let e:boolean = !!0;
    let g:string = '2000';

    const x : string | number = "wh2206"
    const z : boolean|any = "Hello TS"

    const obj : object = {}
    const list1 : Array<string> = ['o']
    const list2 : number[] = [12,3,4,4,4,5]

    // Typescript中对象类型-接口：  interface  /  type 
    // 可描述类的一部分抽象行为，也可描述对象的结构形状
    interface  Istate1 {
        name:string,
        age:number
    }
    const obj1:Istate1 = {
        name:'yoyo',
        age:29,
    }
    // 可选属性
    interface Istate2 {
        name: string;
        age?: number;
    }
    const obj2:Istate2 = {
        name:"zkl",
        age:30, 
    }

    // 属性个数不确定的时候， any必须是任意类型
    interface Istate3 {
        name: string|number;
        age?: number;
        [propName: string]: any;
    }

    const obj3:Istate3 = {
        name:"zkl",
        age:10,
        id:1,
        word:"222"
    }

    // 只读属性
    interface Istate4{
        name: string;
        readonly age: number;
    }
    const obj4:Istate4 = {
        name:"huahua",
        age:30
    }
    // obj4.age = 60;

    // Typescript数组类型
    // 1) 可采用"类型[]"法表示；
    // 2) 可采用数组泛型“Array<类型>”表示法；
    // 3) 可采用接口表示法。

    const arr1:any = [1,2,3,4,5]
    const arr2:Array<string> = ["G"]
    const arr3:number[] = [1,2,3]
    const arr4:any[] = []
    // 接口表示法
    interface Istate{
        name: string;
        age: number;
    }
    const arr5:Array<Istate> = [
        {
            name:"12",
            age:20
        }
    ]
    const arr6:Istate[] = []

    // public 公有变量
    // private 私有变量 
    const arr7:Comment[] = [
       new Comment('1',"zk",300),
    ]
    
    // 7、Typescript函数类型：
    // 函数约束：有函数本身的参数约束，返回值约束；
    // 还有函数本身赋值的变量的约束；
    // 可采用重载的方式才支持联合类型的函数关系。

    // 申明式类型的函数
    function funType(name: string, age: number): number{
        return age;
    }

    // 函数参数不确定
    function funType2(name: string, age: number, sex?: string): number{
        return age;
    }

    // 函数参数的默认值
    function funType3(name="Tom", age=18): void {
        // return '';
    }

    function todosome(){

    }

    // 表达式类型的函数
    const funType4 = function(name: string, age: number): number{
        return age;
    }

    const funType5: 
    (name: string, age: number) => number  = function(name: string, age: number): number{
        return age;
    }

    interface IfunType6{
        (name: string, age: number): number;
    }

    const funType6: IfunType6 = function(name: string, age: number): number{
        return age;
    }

    // 8、Typescript类型断言： as 
    // 类型断言可以用来手动指定一个值的类型。
    // 语法：<类型>值或者值 as 类型。
    // (name as string).length;

    // 9、Typescript类型别名：
    // 类型别名可以用来给一个类型起一个新名字。
    // 采用关键字，比如“type name = string | number”。
    // 例子中name就表示可以设置字符串或者数值类型。
    // 也可用type来约束取值只能是某些字符串中的一个，如：
    // type eventNames = "click" | "scroll" | "mousemove"

    const str: string|number|boolean = "1";
    
    type strType = string|number|boolean ;
    const str2 : strType = '12'

    // 对于接口也可以采用类型别名
    interface MuchType1{
        name: string;
    }

    interface MuchType2{
        age: number;
    }

    type MuchType = MuchType1 | MuchType2;
    const obj33: MuchType = {
        name: "Jay",
        age: 22
    }

    
    return (
        <div>Demo</div>
    )
}

export default Demo