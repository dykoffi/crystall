import { checkToken } from "cqx-secure";
import express from "express";
import PTypes from "../../configs/db/types"
import { createCategory } from "./category.dto";
import categoryService from "./category.service"
import checkDTO from "../../middlewares/checkDTO";

const router: express.Router = require("express").Router();
const category = new categoryService();

type PError = PTypes.PrismaClientValidationError | PTypes.PrismaClientKnownRequestError | Error

router

    .use(checkToken("Admin"))

    /**
     * @descr Create new category
     * @route POST /category
     * @access public
     */
    .use(checkDTO(createCategory))
    .post("/", async (req: express.Request, res: express.Response) => {


        category.addOne(req.body)
            .then((data) => { res.status(201).json({ data, message: "object category created successfully" }); })
            .catch((error: PError) => {
                console.error(error);
                res.status(500).json({ error: error, message: "Something wrong" });
            });

    })

    /**
    * @descr get all category
    * @route GET /category
    * @access public
    */

    .get("/", async (req: express.Request, res: express.Response) => {

        category.getAll({ where: req.query, orderBy: { id_: "asc" } })
            .then((data) => { res.json(data); })
            .catch((error: Error) => {
                console.error(error);
                res.status(500).json({ error: "InternalError", message: "Something wrong" });
            });

    })

    /**
    * @descr Show specify category identified by id
    * @route GET /category/id
    * @access public
    */

    .get("/:id", async (req: express.Request, res: express.Response) => {

        category.getById(Number(req.params.id))
            .then((data) => {
                res.status(data === null ? 404 : 200).json(data);
            })
            .catch((error: Error) => {
                console.error(error);
                res.status(500).json({ error: "InternalError", message: "Something wrong" });
            });

    })

    /**
    * @descr Modify specify category identified by id
    * @route PUT /category/id
    * @access public
    */

    .put("/:id", async (req: express.Request, res: express.Response) => {

        category.updateById(Number(req.params.id), req.body)
            .then((data) => {
                res.status(201).json({ data, message: "object category updated successfully" });
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
    * @descr Delete specify category identified by id
    * @route DELETE /category/id
    * @access public
    */

    .delete("/:id", async (req: express.Request, res: express.Response) => {

        category.deleteById(Number(req.params.id))
            .then((data) => {
                res.status(201).json({ data, message: "object category deleted successfully" });
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
