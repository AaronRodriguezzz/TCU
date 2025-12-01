import Professor from "../../models/Professor.js";
import mongoose from "mongoose";
import sendResponse from "../../utils/sendResponse.js"; // adjust path if needed

// ------------------------------
// CREATE PROFESSOR
// ------------------------------
export const createProfessor = async (req, res) => {
  try {
    const professor = new Professor(req.body);
    await professor.save();
    return sendResponse(res, 201, true, professor, "Professor created successfully");
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, false, null, "Failed to create professor");
  }
};

// ------------------------------
// GET ALL PROFESSORS
// ------------------------------
export const getProfessors = async (req, res) => {
  try {
    const professors = await Professor.find();
    return sendResponse(res, 200, true, professors, "Professors fetched successfully");
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, false, null, "Failed to fetch professors");
  }
};

// ------------------------------
// GET SINGLE PROFESSOR
// ------------------------------
export const getProfessor = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, false, null, "Invalid ID");
    }

    const professor = await Professor.findById(id);
    if (!professor) {
      return sendResponse(res, 404, false, null, "Professor not found");
    }

    return sendResponse(res, 200, true, professor, "Professor fetched successfully");
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, false, null, "Failed to fetch professor");
  }
};

// ------------------------------
// UPDATE PROFESSOR
// ------------------------------
export const updateProfessor = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, false, null, "Invalid ID");
    }

    // Prevent overwriting password if blank
    if (!req.body.profile?.password || req.body.profile.password.trim() === "") {
      delete req.body.profile.password;
    }

    // Use findById first to trigger pre-save hooks (e.g., password hashing)
    const professor = await Professor.findById(id);
    if (!professor) {
      return sendResponse(res, 404, false, null, "Professor not found");
    }

    // Update fields
    for (const key in req.body) {
      if (key === "profile") {
        for (const field in req.body.profile) {
          professor.profile[field] = req.body.profile[field];
        }
      } else {
        professor[key] = req.body[key];
      }
    }

    console.log(professor);

    await professor.save();
    return sendResponse(res, 200, true, professor, "Professor updated successfully");
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, false, null, "Failed to update professor");
  }
};

// ------------------------------
// DELETE PROFESSOR
// ------------------------------
export const deleteProfessor = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return sendResponse(res, 400, false, null, "Invalid ID");
    }

    const deleted = await Professor.findByIdAndDelete(id);
    if (!deleted) {
      return sendResponse(res, 404, false, null, "Professor not found");
    }

    return sendResponse(res, 200, true, null, "Professor deleted successfully");
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, false, null, "Failed to delete professor");
  }
};
