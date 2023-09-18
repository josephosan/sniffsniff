import './App.scss';
import {AppRouter} from "./routes/AppRouter";
import {BrowserRouter as Router} from "react-router-dom";
import {ConfigProvider} from "antd";
import {lightAntdConfig} from "./config/antd.config";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    return (
        <ConfigProvider theme={ lightAntdConfig } direction={"rtl"}>
            <Router>
                <AppRouter/>
            </Router>
        </ConfigProvider>
    )
}

export default App
