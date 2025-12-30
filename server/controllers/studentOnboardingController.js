const StudentOnboarding = require("../models/StudentOnboarding");

exports.saveStudentOnboarding = async (req, res) => {
  try {
    const userId = req.user.id;

    const onboarding = await StudentOnboarding.findOneAndUpdate(
      { user: userId },
      { user: userId, ...req.body },
      { upsert: true, new: true }
    );

    res.json({ message: "Student onboarding saved", onboarding });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


exports.getStudentOnboarding = async (req, res) => {
  try {
    const onboarding = await StudentOnboarding.findOne({
      user: req.user.id
    });

    res.json(onboarding);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
