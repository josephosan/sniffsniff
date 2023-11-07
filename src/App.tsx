import './App.scss';
import {AppRouter} from './routes/AppRouter';
import {BrowserRouter as Router} from 'react-router-dom';
import {ConfigProvider, theme as antdTheme, ThemeConfig} from 'antd';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {appConfig, lightConfig} from "./config/app.config";
import {useApp} from "./store/app.store";
import {NotifyProvider} from "./store/notify.store";
import {useEffect} from "react";
import {getToken} from "./helpers/jwt.helper";


function App() {
    const { theme, setThemeMode } = useApp();

    useEffect(() => {
        const themeConfig = getToken('themeConfig');
        if (themeConfig)
            setThemeMode(JSON.parse(themeConfig))
    }, [])

    const themeConfig: ThemeConfig = {
        algorithm: antdTheme.defaultAlgorithm,
        token: {
            motion: true,
            colorPrimary: lightConfig.primaryColor,
            fontFamily: 'IRAN-sans',
            borderRadius: appConfig.defaultBorderRadius,
            colorBgBase: lightConfig.mainBackgroundColor,
            colorText: theme.defaultTextColor,
            colorTextBase: theme.defaultTextColor,
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
                fontSizeLG: appConfig.defaultFontSize,
            },
            DatePicker: {
                colorText: theme.fadeTextColor,
                activeBorderColor: theme.primaryColor,
                hoverBorderColor: theme.primaryColor,
                colorBorder: theme.primaryColor,
                colorBgContainer: theme.cardBg,
                colorTextDescription: theme.fadeTextColor,
                colorTextPlaceholder: theme.fadeTextColor,
                colorBgElevated: theme.cardBgLighter,
            },
            Select: {
                colorText: theme.fadeTextColor,
                activeBorderColor: theme.primaryColor,
                hoverBorderColor: theme.primaryColor,
                colorBorder: theme.primaryColor,
                colorBgContainer: theme.cardBg,
                colorTextDescription: theme.fadeTextColor,
                colorTextPlaceholder: theme.fadeTextColor,
                optionSelectedBg: theme.cardBgLighter,
                optionActiveBg: theme.mainBackgroundColor,
                optionSelectedColor: theme.defaultTextColor,
                selectorBg: theme.cardBg,
                multipleItemBg: theme.cardBgLighter,
                colorBgElevated: theme.cardBgLighter,
            },
            Divider: {
                colorSplit: theme.primaryColor,
                colorText: theme.fadeTextColor,
                colorTextHeading: theme.fadeTextColor,
                fontSize: appConfig.smallFontSize,
                fontSizeLG: appConfig.smallFontSize,
            },
            Button: {
                fontSize: appConfig.defaultFontSize,
                fontSizeLG: appConfig.defaultFontSize,
                colorTextHeading: theme.fadeTextColor,
            },
            Modal: {
                colorBgElevated: theme.cardBg,
            },
            Message: {
                contentBg: theme.cardBg,
            },
            Notification: {
                colorBgElevated: theme.cardBg,
            },
            Table: {
                colorBgContainer: theme.cardBgLighter,
                colorText: theme.fadeTextColor,
                footerColor: theme.fadeTextColor,
            },
            Breadcrumb: {
                lastItemColor: theme.defaultTextColor,
            },
            Steps: {
                colorSplit: theme.fadeTextColor,
            },
            Popover: {
                colorBgElevated: theme.mainBackgroundColor
            },
            ColorPicker: {
                colorText: theme.fadeTextColor,
                activeBorderColor: theme.primaryColor,
                hoverBorderColor: theme.primaryColor,
                colorBorder: theme.primaryColor,
                colorBgElevated: theme.cardBg
            }
        },
    };

    return (
        <ConfigProvider theme={themeConfig} direction={"rtl"}>
            <NotifyProvider>
                <Router>
                    <AppRouter/>
                </Router>
            </NotifyProvider>
        </ConfigProvider>
    );
}

export default App;
