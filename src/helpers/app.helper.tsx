import {appConfig} from "../config/app.config";

const pathNamesMap = {
    home: 'خانه',
    event: 'رویداد',
    create: 'جدید',
    timeline: 'تایم لاین'
}

const pathIconsMap = {
    home: 'bi bi-house-door',
    event: 'bi bi-calendar-event',
    create: 'bi bi-plus-circle',
    timeline: 'bi bi-calendar2-range'
}


const getPageNameByPath = (route: string) => {
    // return fist name after /.
    return route.split("/")[1];
}

const handleGetBreadcrump = (path) => {
    const pathNames = path.split('/').filter(el => el !== '');

    let basepath = '/';
    return pathNames.map(el => {
        basepath += el;
        return {
            href: basepath,
            title: (
                <>
                    <i style={{ fontSize: appConfig.defaultFontSize}} className={pathIconsMap[el] + " ms-2"}></i>
                    <span>{pathNamesMap[el]}</span>
                </>
            )
        }
    });
}

export {getPageNameByPath, handleGetBreadcrump};