// REST API
import {renderPage} from "../util/templateEngine.js";
import {Router} from "express";

const router = Router()

const restApi = renderPage("/REST_API/rest_api.html", {
    tabTitle: "| Rest API |"
})

router.get("/rest-api", (req, res) => {
    res.send(restApi)
})

export default router