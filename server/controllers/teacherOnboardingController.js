const TeacherOnboarding = require("../models/TeacherOnboarding");

exports.saveTeacherOnboarding = async (req, res) => {
  try {
    const userId = req.user.id;

    const onboarding = await TeacherOnboarding.findOneAndUpdate(
      { user: userId },
      { user: userId, ...req.body },
      { upsert: true, new: true }
    );

    res.json({ message: "Teacher onboarding saved", onboarding });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.getTeacherOnboarding = async (req, res) => {
  try {
    const onboarding = await TeacherOnboarding.findOne({
      user: req.user.id
    });

    res.json(onboarding);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
