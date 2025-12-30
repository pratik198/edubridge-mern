const Onboarding = require("../models/Onboarding");


// CREATE or UPDATE
exports.saveOnboarding = async (req, res) => {
  try {
    const userId = req.user.id;

    const data = {
      user: userId,
      role: req.user.role,
      ...req.body
    };

    const onboarding = await Onboarding.findOneAndUpdate(
      { user: userId },
      data,
      { upsert: true, new: true }
    );

    res.json({ message: "Onboarding saved", onboarding });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// GET USER ONBOARDING
exports.getMyOnboarding = async (req, res) => {
  try {
    const onboarding = await Onboarding.findOne({ user: req.user.id });

    res.json(onboarding);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
