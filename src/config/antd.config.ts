import { theme } from "antd";
import type {ThemeConfig} from "antd";
import {appConfig, lightConfig} from "./app.config";

const lightAntdConfig: ThemeConfig = {
    algorithm: theme.defaultAlgorithm,
    token: {
        motion: true,
        colorPrimary: lightConfig.primaryColor,
        fontFamily: "IRAN-sans",
        borderRadius: appConfig.defaultBorderRadius,
        colorBgBase: lightConfig.mainBackgroundColor
    },
    components: {
        // custom styles for each component
    },
}

const darkAntdConfig: ThemeConfig = {

}

export {lightAntdConfig, darkAntdConfig};