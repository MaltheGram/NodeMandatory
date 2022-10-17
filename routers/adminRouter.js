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


/*.post("login/auth/admin/postContent", (req, res) => {
    const content = req.body

    db.getConnection(async (error, connection) => {
        if (error) throw (error)

        const sqlSearch = "SELECT * FROM POSTS WHERE user_name = ? "
        const searchQuery = mysql.format(sqlSearch, [content])

        const sqlInsert = "INSERT INTO POSTS VALUES (0, ?)"
        const insertQuery = mysql.format(sqlInsert, [content])

        await connection.query(searchQuery, async (error, result) => {
            {
                await connection.query(insertQuery, (error, result) => {
                    connection.release()

                    if (error) throw error
                    console.log("-----> Created new user")
                    console.log(result.insertId)
                    res.sendStatus(201)
                })
            }

        })


    })
})
*/
export default router
