import express from "express";
import { getAdminJobs,getAllJob,getJobById,postJob } from "../controllers/job.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router=express.Router();

router.route("/post").post(isAuthenticated,postJob);
router.route("/get").get(isAuthenticated,getAllJob);
router.route("/getadminjobs").post(isAuthenticated,getAdminJobs);

router.route("/get/:id").get(isAuthenticated,getJobById);


export default router;
