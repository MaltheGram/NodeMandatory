import express from "express"
import bodyParser from "body-parser"
import {renderPage} from "./util/templateEngine.js";
import mysql from "mysql"
import dotenv from "dotenv"
import bcrypt from "bcrypt"

import router from "./routers/authRouter.js";
import cliRouter from "./routers/cliRouter.js";
import httpRouter from "./routers/httpRouter.js"
import nodeRouter from "./routers/nodeRouter.js";
import jsRouter from "./routers/jsRouter.js";
import restApiRouter from "./routers/restApiRouter.js";
import adminRouter from "./routers/adminRouter.js";

dotenv.config()

const app = express()

app.use(router)
app.use(cliRouter)
app.use(httpRouter)
app.use(nodeRouter)
app.use(jsRouter)
app.use(restApiRouter)
app.use(adminRouter)

export const db = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
})

db.getConnection((error, connection) => {
    if (error) throw error
    console.log("Database connected successfully")
})


app.use(express.static("public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

const PORT = process.env.PORT || 8080


// Root
const frontpage = renderPage("/frontpage/frontpage.html", {
    tabTitle: "| Home |"
})

app.get("/", (req, res) => {
    res.send(frontpage)
})

// Auth
// Registration post

const adminPage = renderPage("admin/admin.html", {
    tabTitle: "| Admin |"
})
// Signup Post
app.post("/auth/admin", async (req, res) => {
    const user = req.body.name
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    db.getConnection(async (error, connection) => {
        if (error) throw (error)

        const sqlSearch = "SELECT * FROM USERS WHERE user_name = ? "
        const searchQuery = mysql.format(sqlSearch, [user])

        const sqlInsert = "INSERT INTO USERS VALUES (0, ?, ?)"
        const insertQuery = mysql.format(sqlInsert, [user, hashedPassword])

        await connection.query(searchQuery, async (error, result) => {
            if (error) throw error
            console.log("------> Search Results")
            console.log(result.length)

            if (result.length !== 0) {
                connection.release
                console.log("------> User already exists")
                res.sendStatus(409)
            } else {
                await connection.query(insertQuery, (error, result) => {
                    connection.release()

                    if (error) throw error
                    console.log("-----> Created new user")
                    console.log(result.insertId)
                    res.redirect("/")
                })
            }

        })

    })
})
// Login post
app.post("/login/admin", (req, res) => {
    const user = req.body.name
    const password = req.body.password

    db.getConnection(async (error, connection) => {
        if (error) throw (error)
        const sqlSearch = "Select * from users where user_name = ?"
        const search_query = mysql.format(sqlSearch, [user])
        await connection.query(search_query, async (err, result) => {
            connection.release()

            if (error) throw (error)
            if (result.length === 0) {
                console.log("--------> User does not exist")
                res.sendStatus(404)
            } else {
                const hashedPassword = result[0].user_password
                //get the hashedPassword from result
                if (await bcrypt.compare(password, hashedPassword)) {
                    console.log("---------> Login Successful")
                    res.send(adminPage)
                } else {
                    console.log("---------> Password Incorrect")
                    res.redirect("/auth")
                } //end of bcrypt.compare()
            }//end of User exists i.e. results.length==0
        }) //end of connection.query()
    }) //end of db.connection()
}) //end of app.post()

// Posting docs
app.post("/login/auth/admin", (req, res) => {
    const content = req.body.content

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

app.listen(PORT, () => {
    console.log("Server running on", PORT)
})