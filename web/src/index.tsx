import ReactDOM from 'react-dom/client';
import App from './App';
import Source from './Source';
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
            <Source />
            <App />
        </HashRouter>
    </Provider>
);