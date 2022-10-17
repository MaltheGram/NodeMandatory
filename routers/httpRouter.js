// HTTP Methods
import {renderPage} from "../util/templateEngine.js";
import {Router} from "express"

const router = Router()

const httpPage = renderPage("/HTTP/http.html", {
    tabTitle: "| HTTP Methods |",
    cssLink: `<link rel="stylesheet" href="/pages/HTTP/http.css">`
})

router.get("/http", (req, res) => {
    res.send(httpPage)
})

export default router