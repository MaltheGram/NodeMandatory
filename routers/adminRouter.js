import {renderPage} from "../util/templateEngine.js";
import {Router} from "express"
import {db} from "../app.js";
import mysql from "mysql";
import bcrypt from "bcrypt";

const router = Router()

const adminPage = renderPage("admin/admin.html", {
    tabTitle: "| Admin |",
})

router
    .get("/auth/admin", (req, res) => {
        res.send(adminPage)
    })


export default router
