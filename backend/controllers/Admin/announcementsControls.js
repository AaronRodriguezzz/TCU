import Announcement from "../../models/Announcements.js";
import mongoose from "mongoose";
import sendResponse from "../../utils/sendResponse.js";

// Create Announcement
export const createAnnouncement = async (req, res) => {
  try {
    const announcement = new Announcement(req.body);
    await announcement.save();
    return sendResponse(res, 201, true, announcement, "Announcement created successfully");
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, false, null, "Failed to create announcement");
  }
};

// Get All Announcements
export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    return sendResponse(res, 200, true, announcements, "Announcements fetched successfully");
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, false, null, "Failed to fetch announcements");
  }
};

// Get Single Announcement
export const getAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return sendResponse(res, 400, false, null, "Invalid ID");

    const announcement = await Announcement.findById(id);
    if (!announcement) return sendResponse(res, 404, false, null, "Announcement not found");

    return sendResponse(res, 200, true, announcement, "Announcement fetched successfully");
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, false, null, "Failed to fetch announcement");
  }
};

// Update Announcement
export const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return sendResponse(res, 400, false, null, "Invalid ID");

    const updated = await Announcement.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) return sendResponse(res, 404, false, null, "Announcement not found");

    return sendResponse(res, 200, true, updated, "Announcement updated successfully");
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, false, null, "Failed to update announcement");
  }
};

// Delete Announcement
export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return sendResponse(res, 400, false, null, "Invalid ID");

    const deleted = await Announcement.findByIdAndDelete(id);
    if (!deleted) return sendResponse(res, 404, false, null, "Announcement not found");

    return sendResponse(res, 200, true, null, "Announcement deleted successfully");
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, false, null, "Failed to delete announcement");
  }
};
