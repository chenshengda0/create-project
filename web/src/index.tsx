import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux"
import "antd/dist/reset.css"
import Store from "Redux/Store"
import {HashRouter} from "react-router-dom"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={Store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
);