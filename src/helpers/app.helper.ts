

const getPageNameByPath = (route: string) => {
    // return fist name after /.
    return route.split("/")[1];
}

export {getPageNameByPath};