import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TeacherNavbar from "../../components/teacher/TeacherNavbar";
import Footer from "../../components/studentcomponents/Footer";

const CreateAssessment = () => {
  const navigate = useNavigate();
  

  const [assessment, setAssessment] = useState({
    course: "",
    module: "",
    title: "",
    description: "",
    passPercentage: 40,
    questions: [],
  });

  const addQuestion = () => {
    setAssessment({
      ...assessment,
      questions: [
        ...assessment.questions,
        {
          question: "",
          type: "mcq",
          options: ["", "", "", ""],
          correctAnswer: "",
          marks: 1,
          open: true,
        },
      ],
    });
  };

  const handleSubmit = async () => {
    await fetch("http://localhost:5000/api/assessment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(assessment),
    });

    navigate("/teacher/assessment");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* <TeacherNavbar /> */}

      <main className="flex-1 px-12 py-12 space-y-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">
            Basic Information
          </h2>

          <div className="grid grid-cols-2 gap-6">
            <input
              placeholder="Title"
              className="border border-gray-200 rounded-lg px-4 py-2"
              onChange={(e) =>
                setAssessment({ ...assessment, title: e.target.value })
              }
            />
            <input
              placeholder="Module"
              className="border border-gray-200 rounded-lg px-4 py-2"
              onChange={(e) =>
                setAssessment({ ...assessment, module: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-6">
          {assessment.questions.map((q, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
            >
              <p className="font-medium text-gray-900 mb-4">
                Question {index + 1}
              </p>

              <textarea
                placeholder="Enter question"
                className="w-full border border-gray-200 rounded-lg px-4 py-2 mb-4"
                onChange={(e) => {
                  const updated = [...assessment.questions];
                  updated[index].question = e.target.value;
                  setAssessment({ ...assessment, questions: updated });
                }}
              />

              <select
                className="border border-gray-200 rounded-lg px-4 py-2 mb-4"
                onChange={(e) => {
                  const updated = [...assessment.questions];
                  updated[index].type = e.target.value;
                  setAssessment({ ...assessment, questions: updated });
                }}
              >
                <option value="mcq">MCQ</option>
                <option value="type">Type Answer</option>
              </select>

              {q.type === "mcq" &&
                q.options.map((opt, i) => (
                  <input
                    key={i}
                    placeholder={`Option ${i + 1}`}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 mb-2"
                  />
                ))}
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={addQuestion}
            className="bg-gray-100 px-6 py-2 rounded-lg font-medium"
          >
            + Add Question
          </button>

          <button
            onClick={handleSubmit}
            className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-lg font-medium"
          >
            Save Assessment
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateAssessment;
