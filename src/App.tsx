import './App.scss';
import {AppRouter} from "./routes/AppRouter";
import {BrowserRouter as Router} from "react-router-dom";
import {ConfigProvider, theme as antdTheme, ThemeConfig} from "antd";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {appConfig, lightConfig} from "./config/app.config";
import {useApp} from "./store/app.store";
import fa_IR from "antd/es/locale/fa_IR";
import {NotifyProvider} from "./store/notify.store";


function App() {
    const {theme} = useApp();

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
            },
            DatePicker: {
                colorText: theme.fadeTextColor,
                activeBorderColor: theme.primaryColor,
                hoverBorderColor: theme.primaryColor,
                colorBorder: theme.primaryColor,
                colorBgContainer: theme.cardBg,
                colorTextDescription: theme.fadeTextColor,
                colorTextPlaceholder: theme.fadeTextColor,
                colorBgElevated: theme.cardBgLighter
            },
            Select: {
                colorText: theme.fadeTextColor,
                activeBorderColor: theme.primaryColor,
                hoverBorderColor: theme.primaryColor,
                colorBorder: theme.primaryColor,
                colorBgContainer: theme.cardBg,
                colorTextDescription: theme.fadeTextColor,
                colorTextPlaceholder: theme.fadeTextColor,
                optionSelectedBg: theme.mainBackgroundColor,
                optionActiveBg: theme.mainBackgroundColor,
                optionSelectedColor: theme.defaultTextColor,
                selectorBg: theme.cardBg,
                multipleItemBg: theme.cardBg,
                colorBgElevated: theme.cardBgLighter
            },
            Divider: {
                colorSplit: theme.primaryColor,
                colorText: theme.fadeTextColor,
                colorTextHeading: theme.fadeTextColor
            },
            Modal: {
                colorBgElevated: theme.cardBg
            },
            Message: {
                contentBg: theme.cardBg
            },
            Notification: {
                colorBgElevated: theme.cardBg
            }
        },
    }

    return (
        <ConfigProvider theme={themeConfig} direction={"rtl"} locale={fa_IR}>
            <NotifyProvider>
                <Router>
                    <AppRouter/>
                </Router>
            </NotifyProvider>
        </ConfigProvider>
    )
}

export default App
