import "./problem3.css";
// import "../../../public/tokens";

export default function Problem3() {
  //Props extends is not neccessery, can use BoxProps instead
  //BoxProps is not defined or imported
  //take the children out of the props, put the rest part into {...rest}, but {...rest} is doing nothing
  //return priority rate by name of blockchain
  //wrong logic on filter
  //balancePriority is not used
  //lhsPriority is not defined
  //money in the wallet should be positive number, not <=0
  //formattedBalances is not used in anywhere
  //curency is string, causing wrong caculate
  //WalletRow is not imported
  //the code only have the amount of currency, not the price, so caculate the usd value is not possible
  //{...rest} inside the div doing nothing

  return (
    <div className="problem3">
      <h1>Problem 3</h1>
      <p>Problems in the provided code are</p>
      <ul>
        <li>
          Props extends is not neccessery, can use BoxProps
          instead
        </li>
        <li>BoxProps is not defined or imported</li>
        <li>
          take the children out of the props, put the rest
          part into ...rest, but ...rest is doing nothing
        </li>
        <li>return priority rate by name of blockchain</li>
        <li>wrong logic on filter</li>
        <li>balancePriority is not used</li>
        <li>lhsPriority is not defined</li>
        <li>
          money in the wallet should be positive number
        </li>
        <li>formattedBalances is not used in anywhere</li>
        <li>curency is string, causing wrong caculate</li>
        <li>WalletRow is not imported</li>
        <li>
          The code only have the amount of currency, not the
          price, so caculate the usd value is not possible
        </li>
        <li>...rest inside the div doing nothing</li>
      </ul>
      <div>
        The refactored version of the code is in the file
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/bachgpa/codechallanges/blob/main/src/problems/problem3/index.js"
        >
          <span> "fixedProblem3.tsx"</span>
        </a>
      </div>
    </div>
  );
}
