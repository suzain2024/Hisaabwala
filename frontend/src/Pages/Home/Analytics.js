import React from "react";
// import CardBox from "./CardBox";
import { Container, Row } from "react-bootstrap";
import CircularProgressBar from "../../components/CircularProgressBar.js";
import LineProgressBar from "../../components/LineProgressBar.js";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
// import MovingIcon from '@mui/icons-material/Moving';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Analytics = ({ transactions }) => {
  // total number of transactions
  const TotalTransactions = transactions.length;

  // filter for transactions where type is credit (income)
  const totalIncomeTransactions = transactions.filter(
    (item) => item.transactionType === "credit"
  );

  // filter for transactions where type is expense
  const totalExpenseTransactions = transactions.filter(
    (item) => item.transactionType === "expense"
  );

  // calculate percentage of income transactions
  let totalIncomePercent =
    (totalIncomeTransactions.length / TotalTransactions) * 100;

  // calculate percentage of expense transactions
  let totalExpensePercent =
    (totalExpenseTransactions.length / TotalTransactions) * 100;

  // calculate total turnover (sum of all transaction amounts)
  const totalTurnOver = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  // total income amount (sum of credit amounts)
  const totalTurnOverIncome = transactions
    .filter((item) => item.transactionType === "credit")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  // total expense amount (sum of expense amounts)
  const totalTurnOverExpense = transactions
    .filter((item) => item.transactionType === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  // calculate income amount percentage from total turnover
  const TurnOverIncomePercent = (totalTurnOverIncome / totalTurnOver) * 100;

  // calculate expense amount percentage from total turnover
  const TurnOverExpensePercent = (totalTurnOverExpense / totalTurnOver) * 100;

  // define all categories used in the app
  const categories = [
    "Groceries",
    "Rent",
    "Salary",
    "Tip",
    "Food",
    "Medical",
    "Utilities",
    "Entertainment",
    "Transportation",
    "Other",
  ];

  // define a color mapping for each category
  const colors = {
    "Groceries": '#FF6384',
    "Rent": '#36A2EB',
    "Salary": '#FFCE56',
    "Tip": '#4BC0C0',
    "Food": '#9966FF',
    "Medical": '#FF9F40',
    "Utilities": '#8AC926',
    "Entertainment": '#6A4C93',
    "Transportation": '#1982C4',
    "Other": '#F45B69',
  };

  return (
    <>
      <Container className="mt-5 ">
        <Row>
          {/* card showing total transactions and income/expense count with circular progress */}
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-header bg-black text-white">
                <span style={{ fontWeight: "bold" }}>Total Transactions:</span>{" "}
                {TotalTransactions}
              </div>
              <div className="card-body">
                <h5 className="card-title " style={{color: "green"}}>
                  Income: <ArrowDropUpIcon/>{totalIncomeTransactions.length}
                </h5>
                <h5 className="card-title" style={{color: "red"}}>
                  Expense: <ArrowDropDownIcon />{totalExpenseTransactions.length}
                </h5>

                {/* circular progress bar showing % of income transactions */}
                <div className="d-flex justify-content-center mt-3">
                  <CircularProgressBar
                    percentage={totalIncomePercent.toFixed(0)}
                    color="green"
                  />
                </div>

                {/* circular progress bar showing % of expense transactions */}
                <div className="d-flex justify-content-center mt-4 mb-2">
                  <CircularProgressBar
                    percentage={totalExpensePercent.toFixed(0)}
                    color="red"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* card showing total income/expense in amount with circular progress */}
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-header bg-black text-white ">
                <span style={{ fontWeight: "bold" }}>Total TurnOver:</span>{" "}
                {totalTurnOver}
              </div>
              <div className="card-body">
                <h5 className="card-title" style={{color: "green"}}>
                  Income: <ArrowDropUpIcon /> {totalTurnOverIncome} <CurrencyRupeeIcon />
                </h5>
                <h5 className="card-title" style={{color: "red"}}>
                  Expense: <ArrowDropDownIcon />{totalTurnOverExpense} <CurrencyRupeeIcon />
                </h5>

                {/* circular progress bar showing % of income in amount */}
                <div className="d-flex justify-content-center mt-3">
                  <CircularProgressBar
                    percentage={TurnOverIncomePercent.toFixed(0)}
                    color="green"
                  />
                </div>

                {/* circular progress bar showing % of expense in amount */}
                <div className="d-flex justify-content-center mt-4 mb-4">
                  <CircularProgressBar
                    percentage={TurnOverExpensePercent.toFixed(0)}
                    color="red"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* card showing income category-wise using line progress bar */}
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-header  bg-black text-white">
                <span style={{ fontWeight: "bold" }}>Categorywise Income</span>{" "}
              </div>
              <div className="card-body">
                {categories.map(category => {
                  // filter income of current category
                  const income = transactions.filter(
                    transaction => transaction.transactionType === "credit" && transaction.category === category
                  ).reduce((acc, transaction) => acc + transaction.amount, 0);

                  // calculate income percentage of this category from total turnover
                  const incomePercent = (income / totalTurnOver) * 100;

                  return (
                    <>
                      {/* render line bar if category income is more than 0 */}
                      {income > 0 && (
                        <LineProgressBar
                          label={category}
                          percentage={incomePercent.toFixed(0)}
                          lineColor={colors[category]}
                        />
                      )}
                    </>
                  )
                })}
              </div>
            </div>
          </div>

          {/* card showing expense category-wise using line progress bar */}
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="card h-100">
              <div className="card-header  bg-black text-white">
                <span style={{ fontWeight: "bold" }}>Categorywise Expense</span>{" "}
              </div>
              <div className="card-body">
                {categories.map(category => {
                  // filter expense of current category
                  const expenses = transactions.filter(
                    transaction => transaction.transactionType === "expense" && transaction.category === category
                  ).reduce((acc, transaction) => acc + transaction.amount, 0);

                  // calculate expense percentage of this category from total turnover
                  const expensePercent = (expenses / totalTurnOver) * 100;

                  return (
                    <>
                      {/* render line bar if category expense is more than 0 */}
                      {expenses > 0 && (
                        <LineProgressBar
                          label={category}
                          percentage={expensePercent.toFixed(0)}
                          lineColor={colors[category]}
                        />
                      )}
                    </>
                  )
                })}
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Analytics;
