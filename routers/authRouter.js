import {Router} from "express"
import {renderPage} from "../util/templateEngine.js";
import bcrypt from "bcrypt";
import {db} from "../app.js";
import mysql from "mysql";

const router = Router()

const authPage = renderPage("auth/auth.html", {
    tabTitle: "| Auth |",
    cssLink: `<link rel="stylesheet" href="/pages/auth/auth.css">`
})

router.get("/auth", (req, res) => {
    res.send(authPage)
})


export default router