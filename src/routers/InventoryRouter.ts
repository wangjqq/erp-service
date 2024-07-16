import express from "express";
import { addProduct } from "../controller/InventoryController";

const InventoryRouter = express.Router();

InventoryRouter.post("/addProduct", addProduct);

export default InventoryRouter;
