import { checkToken } from "cqx-secure";
import express from "express";
import PTypes from "../../configs/db/types"
import activityService from "./activity.service"

const router: express.Router = require("express").Router();
const activity = new activityService();

type PError = PTypes.PrismaClientKnownRequestError | Error

router

    .use(checkToken("Admin"))

    /**
     * @descr Create new activity
     * @route POST /activity
     * @access public
     */

    .post("/", async (req: express.Request, res: express.Response) => {

        activity.addOne({ name: req.body.name, user_: { connect: { id_: parseInt(req.body.userId) } }, taxes_: { connect: req.body.taxesIds }, category_: { connect: { id_: parseInt(req.body.categoryId) } } })
            .then((data) => { res.status(201).json({ data, message: "object activity created successfully" }); })
            .catch((error: Error) => {
                console.error(error);
                res.status(500).json({ error: "InternalError", message: "Something wrong" });
            });

    })

    /**
    * @descr get all activity
    * @route GET /activity
    * @access public
    */

    .get("/", async (req: express.Request, res: express.Response) => {

        activity.getAll({ where: req.query, orderBy: { id_: "asc" } })
            .then((data) => { res.json(data); })
            .catch((error: Error) => {
                console.error(error);
                res.status(500).json({ error: "InternalError", message: "Something wrong" });
            });

    })

    /**
    * @descr Show specify activity identified by id
    * @route GET /activity/id
    * @access public
    */

    .get("/:id", async (req: express.Request, res: express.Response) => {

        activity.getById(Number(req.params.id))
            .then((data) => {
                res.status(data === null ? 404 : 200).json(data);
            })
            .catch((error: Error) => {
                console.error(error);
                res.status(500).json({ error: "InternalError", message: "Something wrong" });
            });

    })

    /**
    * @descr Modify specify activity identified by id
    * @route PUT /activity/id
    * @access public
    */

    .put("/:id", async (req: express.Request, res: express.Response) => {

        activity.updateById(Number(req.params.id), req.body)
            .then((data) => {
                res.status(201).json({ data, message: "object activity updated successfully" });
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
    * @descr Delete specify activity identified by id
    * @route DELETE /activity/id
    * @access public
    */

    .delete("/:id", async (req: express.Request, res: express.Response) => {

        activity.deleteById(Number(req.params.id))
            .then((data) => {
                res.status(201).json({ data, message: "object activity deleted successfully" });
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
