import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux"
import "antd/dist/reset.css"
import Store from "Redux/Store"
import {HashRouter} from "react-router-dom"
import App from "./App"

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
    <Provider store={Store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>
)