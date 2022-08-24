import styles from './index.less';


// 全局的样式 
import "@/styles/index.scss"

// redux
import { Provider } from 'react-redux'
import { store } from '@/redux/store';

// mobx
import {Provider as MboxProvider} from 'mobx-react'
import { mStore } from '@/mobx/store';

// antd 
import 'antd/dist/antd.css';



export default function IndexPage(props:any) {
    return (
        <MboxProvider {...mStore}>
            <Provider store={store}>
                <div className={styles.allBox} >
                    {props.children}
                </div>
            </Provider>
        </MboxProvider>
    );
}
