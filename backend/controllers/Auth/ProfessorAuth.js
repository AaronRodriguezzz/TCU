// controllers/authController.js
import Professor from "../../models/Professor.js";
import sendResponse from "../../utils/sendResponse.js";

// Login Controller
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    // Check if user exists
    const user = await Professor.findOne({ "profile.email": email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log('Password mismatch');
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    console.log(user);

    return sendResponse(res, 201, true, user, "Login successful");

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


