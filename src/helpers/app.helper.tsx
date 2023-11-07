import {appConfig, colors} from "../config/app.config";
import moment from "jalali-moment";

const pathNamesMap = {
    home: 'خانه',
    event: 'رویداد',
    create: 'جدید',
    timeline: 'جدول زمانی',
    edit: 'ویرایش'
}

const pathIconsMap = {
    home: 'bi bi-house-door',
    event: 'bi bi-calendar-event',
    create: 'bi bi-plus-circle',
    timeline: 'bi bi-calendar2-range',
    edit: 'bi bi-pen'
}

const getPageNameByPath = (route: string) => {
    // return fist name after /.
    return route.split("/")[1];
}

const handleGetBreadcrump = (path) => {
    const pathNames =
        path
            .split('/')
            .filter(el => el !== '')
            .filter(el => {
                return Object.keys(pathNamesMap).includes(el);
            });

    let basepath = '/';
    return pathNames.map(el => {
        basepath += el + '/';
        return {
            // href: basepath ,
            title: (
                <>
                    <i style={{fontSize: appConfig.defaultFontSize}}
                       className={pathIconsMap[el] + " ms-2 me-2"}></i>
                    <span className={"ms-2"}>{pathNamesMap[el]}</span>
                </>
            )
        }
    });
}

const getRandomNumber = (upTo: number) => {
    return Math.floor(Math.random() * upTo);
}

const getRandomColor = () => {
    const colorsLength = colors.length;
    const randomIndex = getRandomNumber(colorsLength);
    return colors[randomIndex];
}

const getPersianDateAsText = (date?: string) => {
    if (!date) return '';

    date = toEnDigit(date.split(',')[0]);
    const convertedDate = moment(date);
    return convertedDate.fromNow();
}

function toEnDigit(s) {
    return s.replace(/[\u0660-\u0669\u06f0-\u06f9]/g,
        function (a) {
            return a.charCodeAt(0) & 0xf
        }
    )
}

export {getPageNameByPath, handleGetBreadcrump, getRandomColor, getPersianDateAsText};