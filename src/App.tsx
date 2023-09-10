import './App.scss'
import {AppRouter} from "./routes/AppRouter";
import {BrowserRouter as Router} from "react-router-dom";
import {ConfigProvider} from "antd";
import config from "./config/antd.config";


function App() {
    return (
        <ConfigProvider theme={ config }>
            <Router>
                <AppRouter/>
            </Router>
        </ConfigProvider>
    )
}

export default App
