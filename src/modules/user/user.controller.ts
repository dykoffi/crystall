import { checkToken, cryptG } from "cqx-secure";
import express from "express";
import PTypes from "../../configs/db/types"
import userService from "./user.service"

const router: express.Router = require("express").Router();
const user = new userService();

type PError = PTypes.PrismaClientKnownRequestError | Error

router


    .post("/connection", async (req: express.Request, res: express.Response) => {

        user.connect(req.body.login, req.body.pwd)
            .then((data) => { res.json(data); })
            .catch((error: Error) => {
                console.error(error);
                res.status(500).json({ error: "InternalError", message: "Something wrong" });
            });
    })

    .use(checkToken("Admin"))

    /**
     * @descr Create new user
     * @route POST /user
     * @access public
     */

    .post("/", async (req: express.Request, res: express.Response) => {

        let password = req.body.password
        delete req.body.password

        user.addOne(
            {
                ...req.body, connection_:
                    { create: { login: cryptG(req.body.contribuableId), pwd: cryptG(password) } }
            })
            .then((data) => { res.status(201).json({ data, message: "object user created successfully" }); })
            .catch((error: Error) => {
                console.error(error);
                res.status(500).json({ error: "InternalError", message: "Something wrong" });
            });

    })

    /**
    * @descr get all user
    * @route GET /user
    * @access public
    */

    .get("/", async (req: express.Request, res: express.Response) => {

        user.getAll({ where: req.query, orderBy: { id_: "asc" } })
            .then((data) => { res.json(data); })
            .catch((error: Error) => {
                console.error(error);
                res.status(500).json({ error: "InternalError", message: "Something wrong" });
            });

    })

    /**
    * @descr Show specify user identified by id
    * @route GET /user/id
    * @access public
    */

    .get("/:id", async (req: express.Request, res: express.Response) => {

        user.getById(Number(req.params.id))
            .then((data) => {
                res.status(data === null ? 404 : 200).json(data);
            })
            .catch((error: Error) => {
                console.error(error);
                res.status(500).json({ error: "InternalError", message: "Something wrong" });
            });

    })

    /**
    * @descr Modify specify user identified by id
    * @route PUT /user/id
    * @access public
    */

    .put("/:id", async (req: express.Request, res: express.Response) => {

        let password = req.body.password
        delete req.body.password

        user.updateById(
            Number(req.params.id), req.body)
            .then((data) => {
                res.status(201).json({ data, message: "object user updated successfully" });
            })
            .catch((error: PError) => {

                console.error(error);
                if ("code" in error && error.code === "P2025") {
                    res.status(404).json({ error: "NotFound", message: error.meta });
                } else {
                    res.status(500).json({ error: "InternalError", message: "Something wrong" });
                }

            });

    })

    /**
    * @descr Delete specify user identified by id
    * @route DELETE /user/id
    * @access public
    */

    .delete("/:id", async (req: express.Request, res: express.Response) => {

        user.deleteById(Number(req.params.id))
            .then((data) => {
                res.status(201).json({ data, message: "object user deleted successfully" });
            })
            .catch((error: PError) => {
                console.error(error);
                if ("code" in error && error.code === "P2025") {
                    res.status(404).json({ error: error.name, message: error.meta });
                } else {
                    res.status(500).json({ error: "InternalError", message: "Something wrong" });
                }
            });
    });

export = router;
