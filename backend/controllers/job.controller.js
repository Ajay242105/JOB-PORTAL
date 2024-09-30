import { Job } from "../models/job.model.js";

//------------ Job Posting by Admin ------------------------
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        // Check for missing fields
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing",
                success: false,
            });
        }

        // Job Creating
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({ job, success: true }); // Added response for successful job creation
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//------------ For Students: Get All Jobs ------------------------
export const getAllJob = async (req, res) => {
    try {
        const keyword = req.query.keyword || ""; // Data filtering
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };

        // const jobs = await Job.find(query);//this will print only id,to get details info populate() is used
        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1});

        if (!jobs || jobs.length === 0) { // Check for no jobs found
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });
        }

        return res.status(200).json({
            jobs,
            success: true,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//------------ For Students: Get Job By ID ------------------------
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId); // Corrected variable name to jobId
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });
        }

        return res.status(200).json({
            job, // Changed to return the single job
            success: true,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//------------ For Admin: Get Jobs Created by Admin ------------------------
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;

        const jobs = await Job.find({ created_by: adminId }); // Fixed query to use created_by
        if (!jobs || jobs.length === 0) { // Check for no jobs found
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });
        }

        return res.status(200).json({
            jobs,
            success: true,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
