// CLI Page
import {renderPage} from "../util/templateEngine.js";
import {Router} from "express";

const router = Router()

const cliPage = renderPage("/cli/cli.html", {
    tabTitle: "Command Line Interface",
    cssLink: `<link rel="stylesheet" href="/pages/cli/cli.css">`
})
router.get("/cli", (req, res) => {
    res.send(cliPage)
})

export default router
