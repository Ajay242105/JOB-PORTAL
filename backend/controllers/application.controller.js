import { Application } from "../models/application.model.js";
import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";

// Function to apply for a job
export const applyJob = async (req, res) => {
    try {
        const userId = req.id;  // Ensure req.id is correctly set
        const jobId = req.params.id;

        // Check for missing job ID
        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required",
                success: false,
            });
        }

        // Check if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false,
            });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false,
            });
        }

        // Create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });
        job.application.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Job applied successfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Function to get applied jobs
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                populate: {
                    path: 'company',  // Ensure 'company' matches your schema
                    options: { sort: { createdAt: -1 } }
                }
            });

        // Check for no applications found
        if (applications.length === 0) {
            return res.status(404).json({
                message: "No applications found",
                success: false
            });
        }

        return res.status(200).json({
            applications,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Function for admin to see applicants
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            populate: { path: 'applicant' }
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Function to update application status
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: "Status is required",
                success: false
            });
        }

        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false,
            });
        }

        // Update the application status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
