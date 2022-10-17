// Node Topics
import {renderPage} from "../util/templateEngine.js";
import {Router} from "express"

const router = Router()

const nodeTopics = renderPage("/Node/node.html", {
    tabTitle: "| Node |",
    cssLink: `<link rel="stylesheet" href="/pages/Node/node.css">`
})


router.get("/node", (req, res) => {
    res.send(nodeTopics)
})

export default router