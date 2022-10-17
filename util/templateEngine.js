import fs from "fs"

const navbarComponent = fs.readFileSync("./public/layout/navbar/navbar.html").toString()

export const renderPage = (path, options = {}) => {
    const page = fs.readFileSync("./public/pages/" + path).toString()

    return navbarComponent
            .replace("%%TAB_TITLE%%", options.tabTitle || "| M B G |")
            .replace("%%CSS_LINK%%", options.cssLink || "")
        + page
}