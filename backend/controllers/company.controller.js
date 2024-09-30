import { Company } from "../models/company.model.js";

// Company registration
export const registerCompany = async (req, res) => {
    try {
        const { CompanyName } = req.body;

        // Check for missing fields
        if (!CompanyName) {
            return res.status(400).json({
                message: "Company Name is required",
                success: false,
            });
        }

        let company = await Company.findOne({ name: CompanyName });
        if (company) {
            return res.status(400).json({
                message: "You cannot register the same company again",
                success: false,
            });
        }

        company = await Company.create({
            name: CompanyName,
            userId: req.id // Ensure req.id is set correctly by middleware
        });

        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Get all registered companies
export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // Assuming req.id contains the user's ID
        const companies = await Company.find({ userId });

        if (!companies || companies.length === 0) {
            return res.status(404).json({
                message: "No companies found",
                success: false,
            });
        }

        return res.status(200).json({ companies, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Get a particular company by ID
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }

        return res.status(200).json({ company, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Update company data
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const updateData = { name, description, website, location };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Company information updated successfully",
            company, // Include updated company details in the response
            success: true,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
