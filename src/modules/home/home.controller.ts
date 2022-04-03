import { cryptG, giveToken } from "cqx-secure";
import express = require("express");
import HomeService from "./home.service";

const router: express.Router = require("express").Router();
const home = new HomeService()

router

    /**
    * @descr Test API endpoint
    * @route GET /
    * @access public
    */

    .get("/", async (req: express.Request, res: express.Response) => {

        home.Hello().then(data => {
            res.json(data)
        })
        
    })

    /**
  * @descr Generate Admin token
  * @route GET /
  * @access public
  */

    .post("/Admin/token", async (req: express.Request, res: express.Response) => {

        if (cryptG(req.body.password) === "a6628f8b9a76dec7") {
            res.json({ token: await giveToken({}, "Admin") })
        } else {
            res.status(403).json({ message: "false password" })
        }
    })

export = router;
