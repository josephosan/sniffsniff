import {FormBuilderField} from "../@types/app";

const appConfig = {
    // break point
    appBreakPoint: 700,

    // sidebar width
    sidebarWidth: 256,

    // border radius
    defaultBorderRadius: 10,

    // padding
    defaultPadding: 10,

    // icon size
    defaultIconSize: 23,
    smallIconSize: 14,

    // font size
    hugeFontSize: 20,
    largeFontSize: 16,
    defaultFontSize: 14,
    smallFontSize: 10,

    // animation speed
    defaultAnimationSpeed: 0.15,

    // ignore names for auth
    ignoreNamesForAuth: ['login', 'rotate', 'register'],

    // server config
    paginationLimit: 10
}

const lightConfig = {
    mode: 'light',
    cardBg: '#ffffff',
    cardBgLighter: '#fbfbfb',
    mainBackgroundColor: '#f7f8fa',
    defaultTextColor: '#797979',
    fadeTextColor: '#808080',
    primaryColor: '#F0B86E',

    itemHoverColor: '#F6F6F6',
};

const darkConfig = {
    mode: 'dark',
    cardBg: '#282E3F',
    cardBgLighter: '#2d3346',
    mainBackgroundColor: '#1F1E24',
    defaultTextColor: '#FFFFFF',
    fadeTextColor: '#C3C5CA',
    primaryColor: '#F0B86E',

    itemHoverColor: '#3B435B',
};

const statusColors = {
    'success': '#65B741',
    'warning': '#FB8B24',
    'info': '#6DB9EF',
}

const colors = [
    '#61A3BA',
    '#C70039',
    '#748E63',
    '#FFCD4B',
    '#CDFAD5',
    '#141E46',
    '#CE5A67',
    '#B931FC',
    '#FFA33C',
    '#2d2a2e',
];

const apiConfig = {
    API_BASE_URL: 'http://46.102.143.25:5000/v1'
}

// filters
const defaultFilterFields: FormBuilderField[] = [
    {
        type: 'select',
        name: 'order',
        required: false,
        placeholder: 'ترتیب',
        options: [
            {
                label: 'صعودی',
                value: 'ASC'
            },
            {
                label: 'نزولی',
                value: 'DESC'
            },
        ]
    },
];

export {
    appConfig,
    lightConfig,
    darkConfig,
    colors,
    apiConfig,
    statusColors,
    defaultFilterFields
};
