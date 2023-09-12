import { theme } from "antd";
import type {ThemeConfig} from "antd";
import AppConfig from "./app.config";

const config: ThemeConfig = {
    algorithm: theme.defaultAlgorithm,
    token: {
        motion: true,
        colorPrimary: AppConfig.primaryColor,
        fontFamily: "IRAN-sans"
    },
    components: {
        // custom styles for each component
    },
}

export default config;