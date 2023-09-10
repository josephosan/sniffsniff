import { theme } from "antd";
import type {ThemeConfig} from "antd";

const config: ThemeConfig = {
    algorithm: theme.defaultAlgorithm,
    token: {
        motion: true,
        colorBgBase: '#ff4d4f'
    },
    components: {
        // custom styles for each component
    },

}

export default config;