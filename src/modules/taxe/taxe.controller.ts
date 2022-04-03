import { checkToken } from "cqx-secure";
import express from "express";
import PTypes from "../../configs/db/types"
import taxeService from "./taxe.service"

const router: express.Router = require("express").Router();
const taxe = new taxeService();

type PError = PTypes.PrismaClientKnownRequestError | Error

router

    .use(checkToken("Admin"))

    /**
     * @descr Create new taxe
     * @route POST /taxe
     * @access public
     */

    .post("/", async (req: express.Request, res: express.Response) => {

        taxe.addOne({ ...req.body, annual_value: Number(req.body.annual_value) })
            .then((data) => { res.status(201).json({ data, message: "object taxe created successfully" }); })
            .catch((error: Error) => {
                console.error(error);
                res.status(500).json({ error: "InternalError", message: "Something wrong" });
            });

    })

    /**
    * @descr get all taxe
    * @route GET /taxe
    * @access public
    */

    .get("/", async (req: express.Request, res: express.Response) => {

        taxe.getAll({ where: req.query, orderBy: { id_: "asc" } })
            .then((data) => { res.json(data); })
            .catch((error: Error) => {
                console.error(error);
                res.status(500).json({ error: "InternalError", message: "Something wrong" });
            });

    })

    /**
    * @descr Show specify taxe identified by id
    * @route GET /taxe/id
    * @access public
    */

    .get("/:id", async (req: express.Request, res: express.Response) => {

        taxe.getById(Number(req.params.id))
            .then((data) => {
                res.status(data === null ? 404 : 200).json(data);
            })
            .catch((error: Error) => {
                console.error(error);
                res.status(500).json({ error: "InternalError", message: "Something wrong" });
            });

    })

    /**
    * @descr Modify specify taxe identified by id
    * @route PUT /taxe/id
    * @access public
    */

    .put("/:id", async (req: express.Request, res: express.Response) => {

        taxe.updateById(Number(req.params.id), { ...req.body, annual_value: Number(req.body.annual_value) })
            .then((data) => {
                res.status(201).json({ data, message: "object taxe updated successfully" });
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
    * @descr Delete specify taxe identified by id
    * @route DELETE /taxe/id
    * @access public
    */

    .delete("/:id", async (req: express.Request, res: express.Response) => {

        taxe.deleteById(Number(req.params.id))
            .then((data) => {
                res.status(201).json({ data, message: "object taxe deleted successfully" });
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
