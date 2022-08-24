import LoginBox from './LoginBox'
const Login = () => {
    const vsrc = "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/3760b2031ff41ca0bd80bc7a8a13f7bb_preview.mp4"
    return (
        <div className='lgbox'>
            <video
                className='myvideo' 
                src={vsrc}
                autoPlay
                muted
                loop
            ></video>
            <div className="login-box">
                <LoginBox/>
            </div>
           
        </div>
    )
}

export default Login