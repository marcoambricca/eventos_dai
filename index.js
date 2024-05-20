import express from "express";
import cors from "cors";
import ProvinceRouter from "./src/controllers/province-controller.js"
import EventCategoryRouter from "./src/controllers/event-category-controller.js"
import LocationRouter from "./src/controllers/location-controller.js"

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/province", ProvinceRouter);
app.use("/api/event_category", EventCategoryRouter);
app.use("/api/location", LocationRouter);

app.listen(port, () => {
    console.log(`"server" Listening on port ${port}`);
})