// JavaScript Topics
import {renderPage} from "../util/templateEngine.js";
import {Router} from "express"

const router = Router()

const jsTopics = renderPage("/JavaScript/javascript.html", {
    tabTitle: "| JavaScript Topics |",
    cssLink: `<link rel="stylesheet" href="/pages/JavaScript/javascript.css">`
})

router.get("/javascript", (req, res) => {
    res.send(jsTopics)
})

export default router