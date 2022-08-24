import React,{FC,useRef,useState,useEffect} from 'react'
import BG from '@/assets/images/503.png'
import {history} from 'umi'
import './index.scss'

const BadService:FC<any> = () => {
    const bgstar:any=useRef()
    let [count,setCount] = useState<number>(5)
    let timer:any=null
    let [spanNum,setSpanNum] = useState<any[]>([])
    // 跳转登录页面
    const gotowhere=()=>{
        history.push('/login')
    }
    // 倒计时
    const timeDown=()=>{
        setCount(count--)
        timer=setInterval(()=>{
            if(count>0){
                setCount(count--)
            }else{
                clearInterval(timer)
                timer=null
                gotowhere()
            }
        },1000)
    }
    // 生成span
    const spanNumInit=()=>{
        var width = bgstar.current.clientWidth;
        var height:any  = document.getElementById("bgstar")?.clientHeight;

        for(var i=0;i<520;i++){
            var left = Math.round(width * Math.random())
            var top = Math.round(height * Math.random())
            var rate = Math.random() * 2.5 // 频率 
            var scaler = Math.random() * 1.5  
            var r = 255;
            var g = 255;
            var b = 255;
            var opacity = Math.random() 

            spanNum.push({
                left:left+'px',
                top:top+'px',
                transform:`scale(${scaler})`,
                animationDelay:rate+'s',
                background:`rgba(${r},${g},${b},${opacity})`
            })
        }
        setSpanNum([...spanNum])        
    }
    // 页面生成时执行
    useEffect(()=>{
        timeDown()
        spanNumInit()
        // 销毁阶段
        return ()=>{
            clearInterval(timer)
            timer=null
        }
    },[])
    return (
        <div className="errorpage" ref={bgstar} id="bgstar">
            <div className="down" onClick={gotowhere}>剩余 { count } S </div>
            <img src={BG} alt="" className="myimg tada1" />
            {
                spanNum.map((l,i)=>{
                    return (
                        <span key={i} className="spandot" style={l}> </span>
                    )
                })
            }
        </div>
    )
}

export default BadService