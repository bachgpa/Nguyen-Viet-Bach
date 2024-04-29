import "./problems.css";
import Problem1 from "./problem1";
import { Problem2 } from "./problem2";
import { useState } from "react";

export default function Problems() {
  const [problem, setProblem] = useState(<Problem1 />);
  function removeAllProblem() {
    const allOptions = document.querySelectorAll(".option");
    allOptions.forEach((option) => {
      option.classList.remove("choosed");
    });
  }
  function chooseProblem(target, option) {
    removeAllProblem();
    target.classList.add("choosed");
    switch (option) {
      case "option1":
        setProblem(<Problem1 />);
        break;
      case "option2":
        setProblem(<Problem2 />);
        break;
      default:
        console.log("no option choosed");
    }
    // console.log("option:", target);
  }
  return (
    <div className="problems">
      <div className="choose_problem">
        <div
          className="option choosed"
          onClick={(e) => {
            chooseProblem(e.target, "option1");
          }}
        >
          Problem 1
        </div>
        <div
          className="option "
          onClick={(e) => {
            chooseProblem(e.target, "option2");
          }}
        >
          Problem 2
        </div>
        <div
          className="option "
          onClick={(e) => {
            chooseProblem(e.target, "option3");
          }}
        >
          Problem 3
        </div>
      </div>
      <div className="problem_solving">{problem}</div>
    </div>
  );
}
