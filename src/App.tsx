import './App.scss';
import {AppRouter} from "./routes/AppRouter";
import {BrowserRouter as Router} from "react-router-dom";
import {ConfigProvider, theme as antdTheme, ThemeConfig} from "antd";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {appConfig, lightConfig} from "./config/app.config";
import {useApp} from "./store/app.store";


function App() {
    const { theme } = useApp();

    const themeConfig: ThemeConfig = {
        algorithm: antdTheme.defaultAlgorithm,
        token: {
            motion: true,
            colorPrimary: lightConfig.primaryColor,
            fontFamily: "IRAN-sans",
            borderRadius: appConfig.defaultBorderRadius,
            colorBgBase: lightConfig.mainBackgroundColor,
            colorText: theme.defaultTextColor,
            colorTextBase: theme.defaultTextColor
        },
        components: {
            Input: {
                colorText: theme.fadeTextColor,
                activeBorderColor: theme.primaryColor,
                hoverBorderColor: theme.primaryColor,
                colorBorder: theme.primaryColor,
                colorBgContainer: theme.cardBg,
                colorTextDescription: theme.fadeTextColor,
                colorTextPlaceholder: theme.fadeTextColor,
                fontSize: appConfig.defaultFontSize,
                fontSizeLG: appConfig.defaultFontSize
            },
            DatePicker: {
                colorText: theme.fadeTextColor,
                activeBorderColor: theme.primaryColor,
                hoverBorderColor: theme.primaryColor,
                colorBorder: theme.primaryColor,
                colorBgContainer: theme.cardBg,
                colorTextDescription: theme.fadeTextColor,
                colorTextPlaceholder: theme.fadeTextColor,
            },
            Select: {
                colorText: theme.fadeTextColor,
                activeBorderColor: theme.primaryColor,
                hoverBorderColor: theme.primaryColor,
                colorBorder: theme.primaryColor,
                colorBgContainer: theme.cardBg,
                colorTextDescription: theme.fadeTextColor,
                colorTextPlaceholder: theme.fadeTextColor,
            },
            Divider: {
                colorSplit: theme.primaryColor,
                colorText: theme.fadeTextColor,
                colorTextHeading: theme.fadeTextColor,
                fontSize: appConfig.smallFontSize,
                fontSizeLG: appConfig.smallFontSize
            },
            Button: {
                fontSize: appConfig.defaultFontSize,
                fontSizeLG: appConfig.defaultFontSize
            }
        },
    }

    return (
        <ConfigProvider theme={themeConfig} direction={"rtl"}>
            <Router>
                <AppRouter/>
            </Router>
        </ConfigProvider>
    )
}

export default App
