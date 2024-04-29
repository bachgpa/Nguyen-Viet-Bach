import "./problem1.css";
// import useState
import { useState } from "react";

export default function Problem1() {
  const [result, setResult] = useState(0);
  // 3 WAYS TO SUM N
  function cach1(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum += array[i];
    }
    setResult(sum);
    return sum;
  }
  function cach2(array) {
    const sum = array.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue,
      0
    );
    setResult(sum);
    return sum;
  }
  function cach3(array) {
    let sum = 0;
    for (const num of array) {
      sum += num;
    }
    setResult(sum);
    return sum;
  }

  function CountSum(option) {
    const problem1Input = document.querySelector(
      "#problem_1_input_1st"
    );
    const methodDescription = document.querySelector(
      ".description_for_method"
    );
    const errorField =
      document.querySelector(".error_field");
    if (problem1Input.value) {
      const containsLetter = /[a-zA-Z]/.test(
        problem1Input.value
      );

      if (containsLetter) {
        document.querySelector(".error_field").innerHTML =
          "Vui lòng nhập dãy số nguyên";
        methodDescription.innerHTML = "";
      } else {
        const cleanedStr = problem1Input.value.replace(
          /[^\d\s.,]/g,
          ""
        );
        const arr = cleanedStr.split(/[,\s.]+/);
        const arrToSum = arr.map((item) => {
          const num = parseFloat(item);
          return isNaN(num) ? 0 : num;
        });
        switch (option) {
          case "style1":
            cach1(arrToSum);
            methodDescription.innerHTML = `
            <div>function cach1(array) { <br>
              let sum = 0;<br>
              for (let i = 0; i < array.length; i++) {<br>
                sum += array[i];<br>
              }<br>
              setResult(sum);<br>
              return sum;<br>
            }<div>`;
            break;
          case "style2":
            cach2(arrToSum);
            methodDescription.innerHTML = `
            <div> const sum = array.reduce(<br>
              (accumulator, currentValue) =><br>
                accumulator + currentValue,
              0<br>
            );<br>
            setResult(sum);<br>
            return sum;<div>`;
            break;
          case "style3":
            cach3(arrToSum);
            methodDescription.innerHTML = `
            <div> let sum = 0;<br>
            for (const num of array) {<br>
              sum += num;<br>
            }<br>
            setResult(sum);<br>
            return sum;<div>`;
            break;
          default:
            setResult(0);
        }
      }
    } else {
      errorField.innerHTML = "Vui lòng nhập dãy số nguyên";
    }
  }
  return (
    <form className="problem1">
      <div className="description_problem1">
        Nhập dãy số nguyên cách nhau bởi dấu cách, dấu chấm,
        dấu phẩy hoặc dấu chấm phẩy để tính tổng
      </div>
      <input
        placeholder="Insert here"
        id="problem_1_input_1st"
        type="text"
        name="problem1Sum"
        onChange={() => {
          document.querySelector(
            ".description_for_method"
          ).innerHTML = "";
          document.querySelector(".error_field").innerHTML =
            "";
          setResult(0);
        }}
      />
      <div className="error_field"></div>
      <div className="button_problem1_container">
        <button
          className="button_problem1"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            CountSum("style1");
          }}
        >
          Cách 1
        </button>
        <button
          className="button_problem1"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            CountSum("style2");
          }}
        >
          Cách 2
        </button>
        <button
          className="button_problem1"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            CountSum("style3");
          }}
        >
          Cách 3
        </button>
      </div>
      <div className="result_problem1">
        Result: {result}
      </div>
      <div className="description_for_method"></div>
    </form>
  );
}
