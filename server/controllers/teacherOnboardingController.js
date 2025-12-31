const TeacherOnboarding = require("../models/TeacherOnboarding");

// --- SAVE or UPDATE Teacher Onboarding ---

exports.saveTeacherOnboarding = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      country,
      profession,
      experience,
      expertise, // array
      defaultLanguage,
      courseFormat, // array
      audience, // array
    } = req.body;

    const onboardingData = {
      user: userId,
      country,
      profession,
      experience,
      expertise: expertise || [],
      defaultLanguage,
      courseFormat: courseFormat || [],
      audience: audience || [],
    };

    const onboarding = await TeacherOnboarding.findOneAndUpdate(
      { user: userId },
      onboardingData,
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      message: "Teacher onboarding saved successfully",
      onboarding,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

/**
 * GET Teacher Onboarding
 */
exports.getTeacherOnboarding = async (req, res) => {
  try {
    const onboarding = await TeacherOnboarding.findOne({
      user: req.user.id,
    });

    res.status(200).json({
      success: true,
      onboarding,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const TeacherOnboarding = require("../models/TeacherOnboarding");

// exports.saveTeacherOnboarding = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const onboarding = await TeacherOnboarding.findOneAndUpdate(
//       { user: userId },
//       { user: userId, ...req.body },
//       { upsert: true, new: true }
//     );

//     res.json({ message: "Teacher onboarding saved", onboarding });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.getTeacherOnboarding = async (req, res) => {
//   try {
//     const onboarding = await TeacherOnboarding.findOne({
//       user: req.user.id,
//     });

//     res.json(onboarding);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
