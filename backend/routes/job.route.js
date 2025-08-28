import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJos, getJob, getJobById, postJob } from "../controller/job.controller.js";

const router = express.Router();

router.route('/post').post(isAuthenticated , postJob);
router.route('/get').get(isAuthenticated , getJob);
router.route('/getadminjobs').get(isAuthenticated , getAdminJos);
router.route('/get/:id').get(isAuthenticated , getJobById);

export default router;