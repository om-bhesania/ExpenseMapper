import { useEffect, useState } from "react";
import { Card, AreaChart, Title } from "@tremor/react";
import { useGetTransactions } from "../../hooks/useGetTransactions";
export const Areachart = () => {
  const { transactions, sinIncome, sinExpenses } = useGetTransactions();
  const [value, setValue] = useState(null);
  useEffect(() => {
  }, [transactions]);

  const renderLineChart = () => {
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const data = transactions
      .filter((transaction) => transaction.createdAt.toDate() >= last7Days)
      .map((transaction) => ({
        id: transaction.id,
        date: transaction.createdAt.toDate(),
        income: sinIncome[transaction.id] || 0,
        expense: sinExpenses[transaction.id] || 0,
        label: new Date(transaction.createdAt.toDate()).toLocaleString("en-IN", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          timeZone: "Asia/Kolkata",
        }),
      }));

    const dates = data.map((item) => item.label);

    return (
      <AreaChart
        data={data}
        index="label"
        categories={["income", "expense"]}
        colors={["emerald", "red"]}
        onValueChange={(v) => setValue(v)}
        connectNulls={true}
        xaxis={{ type: "category", label: "date", values: dates, }}
        yaxis={{ type: "number", label: "Amount" }}
        style={{ height: "33em" , display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", fontFamily:'monospace' }}
      >
        <pre>{JSON.stringify(value)}</pre>
      </AreaChart>
    );
  };
  return (
    <>
      <Card style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <Title>Income and Expense Over the Last 7 Days</Title>
        {renderLineChart()}
      </Card>


    </>
  );
};

