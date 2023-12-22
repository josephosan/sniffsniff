import {colors} from '../config/app.config';
import moment from 'jalali-moment';

const pathNamesMap = {
    home: 'خانه',
    event: 'رویداد',
    create: 'جدید',
    timeline: 'جدول زمانی',
    edit: 'ویرایش',
    organization: 'سازمان',
    setting: 'تنظیمات',
    project: 'پروژه',
    users: 'کاربران',
    term: 'ترم',
    invite: 'دعوت'
};

const pathIconsMap = {
    home: 'bi bi-house-door',
    event: 'bi bi-calendar-event',
    create: 'bi bi-plus-circle',
    timeline: 'bi bi-calendar2-range',
    edit: 'bi bi-pen',
    organization: 'bi bi-building',
    setting: 'bi bi-gear',
    project: 'bi bi-kanban',
    users: 'bi bi-people',
    term: 'bi bi-backpack',
    invite: 'bi bi-person-plus'
};

const getPageNameByPath = (route: string) => {
    // return fist name after /.
    return route.split('/')[1];
};

const notClickableRouteNames = ['project'];

const handleGetBreadcrump = (path) => {
    const pathNames = path
        .split('/')
        .filter((el) => el !== '')
        .filter((el) => {
            return Object.keys(pathNamesMap).includes(el);
        });

    // adding home icon
    const home = {
        icon: 'bi bi-house-door',
        href: '/dashboard',
        key: 'dashboard',
        clickable: true
    }

    let basepath = '/';
    let result = pathNames.map((el) => {
        basepath += el + '/';
        return {
            href: basepath,
            title: pathNamesMap[el],
            icon: pathIconsMap[el],
            clickable: !notClickableRouteNames.includes(el)
        };
    });

    result = [home, ...result];

    return result;
};

const getRandomNumber = (upTo: number) => {
    return Math.floor(Math.random() * upTo);
};

const getRandomColor = () => {
    const colorsLength = colors.length;
    const randomIndex = getRandomNumber(colorsLength);
    return colors[randomIndex];
};

const getPersianDateAsText = (date?: string) => {
    if (!date) return '';

    date = toEnDigit(date.split(',')[0]);
    const convertedDate = moment(date);
    return convertedDate.fromNow();
};

function toEnDigit(s) {
    return s.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, function (a) {
        return a.charCodeAt(0) & 0xf;
    });
}

function hsvToHex(original) {
    if (/[0-9A-Fa-f]{6}/g.test(original)) {
        return original;
    } else {
        let {h, s, v} = original;

        // Convert HSV to RGB
        let c = v * s;
        let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
        let m = v - c;

        let r, g, b;
        if (h >= 0 && h < 60) {
            [r, g, b] = [c, x, 0];
        } else if (h >= 60 && h < 120) {
            [r, g, b] = [x, c, 0];
        } else if (h >= 120 && h < 180) {
            [r, g, b] = [0, c, x];
        } else if (h >= 180 && h < 240) {
            [r, g, b] = [0, x, c];
        } else if (h >= 240 && h < 300) {
            [r, g, b] = [x, 0, c];
        } else {
            [r, g, b] = [c, 0, x];
        }

        // Convert RGB to HEX
        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);

        return `#${((1 << 24) | (r << 16) | (g << 8) | b)
            .toString(16)
            .slice(1)}`;
    }
}

export {
    getPageNameByPath,
    handleGetBreadcrump,
    getRandomColor,
    getPersianDateAsText,
    hsvToHex,
};
