import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";

import Logo from "../../../assets/images/eda-logo.png";
import StarsTop from "../../../assets/images/stars-top.png.png";
import StarsBottom from "../../../assets/images/stars-bottom.png";

const EDUCATION = [
  "Less than high school diploma",
  "High school diploma",
  "Bachelor's degree",
  "Master's degree",
  "Doctorate degree",
];

const OnboardingStep4 = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex flex-col">

      {/* ⭐ STARS */}
      <img src={StarsTop} className="hidden lg:block absolute right-6 top-0 w-36" alt="" />
      {/* <img src={StarsBottom} className="hidden lg:block absolute left-6 bottom-10 w-36" alt="" /> */}

      {/* LOGO */}
      <div className="px-6 sm:px-8 pt-6">
        <img src={Logo} alt="EdA" className="h-7 sm:h-8" />
      </div>

      {/* PROGRESS */}
      <div className="mt-6 sm:mt-8 flex justify-center px-4">
        <div className="flex items-center gap-4 sm:gap-6">

          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex items-center gap-2 sm:gap-3">
              <div
                className={`h-8 w-8 sm:h-9 sm:w-9 rounded-full flex items-center justify-center border text-xs sm:text-sm
                  ${
                    n === 4
                      ? "bg-yellow-400 border-yellow-400 text-black"
                      : "bg-gray-200 border-gray-300 text-gray-500"
                  }`}
              >
                {n}
              </div>

              {n !== 4 && (
                <div className="w-8 sm:w-12 h-[2px] bg-gray-300" />
              )}
            </div>
          ))}

        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="mt-10 sm:mt-12 w-full flex justify-center px-4">
       <div className="w-full max-w-[720px] basis-[content] mx-auto flex flex-col gap-6">

          {/* HEADING */}
          <h1 className="text-2xl sm:text-3xl font-semibold">
            What’s your highest level of education?
          </h1>

          {/* OPTIONS */}
          <div className="space-y-3">

            {EDUCATION.map((item) => {
              const active = selected === item;

              return (
                <button
                  key={item}
                  onClick={() => setSelected(item)}
                  className={`
                    w-full flex justify-between items-center
                    border rounded-xl px-4 py-3 text-sm
                    transition
                    ${
                      active
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-gray-300 hover:bg-gray-100"
                    }
                  `}
                >
                  {item}

                  <span
                    className={`
                      h-4 w-4 rounded-full border
                      ${
                        active
                          ? "border-yellow-500 bg-yellow-400"
                          : "border-gray-400"
                      }
                    `}
                  />
                </button>
              );
            })}

          </div>
        </div>
      </div>

      {/* FOOTER BUTTONS */}
      <div className="flex justify-between px-6 sm:px-10 pb-10 mt-auto">

        {/* BACK */}
        <button
          onClick={() => navigate("/onboarding-step-3")}
          className="flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition text-sm"
        >
          <FiArrowLeft />
          Back
        </button>

        {/* FINISH */}
        <button
          disabled={!selected}
          onClick={() => navigate("/dashboard")}
          className={`
            flex items-center gap-2 px-6 sm:px-8 py-3 rounded-md font-medium
            ${
              !selected
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-yellow-400 hover:bg-yellow-500"
            }
          `}
        >
          Finished
          <FiArrowRight />
        </button>

      </div>
    </div>
  );
};

export default OnboardingStep4;
