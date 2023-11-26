import { useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [transactionTotals, setTransactionTotals] = useState({
    balance: 0.0,
    income: 0.0,
    expenses: 0.0,
  });
  const [sinIncome, setSinIncome] = useState({});
  const [sinExpenses, setSinExpenses] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTransactionType, setSelectedTransactionType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [tasks, setTasks] = useState([]);
  const { userID } = useGetUserInfo();

  const transactionCollectionRef = collection(db, "transactions");
  const taskCollectionRef = collection(db, "Tasks"); // Assuming the collection name is "Tasks"

  const filterTransactions = () => {
    // Implement your filtering logic here
    const filtered = transactions.filter((t) => {
      const transactionDate = new Date(t.createdAt.toDate()); // Assuming createdAt is the timestamp field in your data

      return (
        (!selectedDate || isSameDay(transactionDate, new Date(selectedDate))) &&
        (!selectedTransactionType || t.transactionType === selectedTransactionType) &&
        (!selectedCategory || t.category === selectedCategory)
      );
    });

    setFilteredTransactions(filtered);
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const getTransactions = async () => {
    setIsLoading(true);

    let unsubscribeTransactions;
    let unsubscribeTasks;

    try {
      // Fetch transactions
      let queryTransactions = query(
        transactionCollectionRef,
        where("userID", "==", userID),
        orderBy("createdAt")
      );

      if (selectedDate) {
        const startDate = new Date(selectedDate + "T00:00:00");
        const endDate = new Date(selectedDate + "T23:59:59");

        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
          queryTransactions = query(
            queryTransactions,
            where("createdAt", ">=", startDate),
            where("createdAt", "<=", endDate)
          );
        } else {
          console.error("Invalid date format for selectedDate");
        }
      }

      if (selectedTransactionType) {
        queryTransactions = query(
          queryTransactions,
          where("transactionType", "==", selectedTransactionType)
        );
      }

      if (selectedCategory) {
        queryTransactions = query(
          queryTransactions,
          where("category", "==", selectedCategory)
        );
      }

      unsubscribeTransactions = onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];
        let totalIncome = 0;
        let totalExpenses = 0;
        let singleIncome = {};
        let singleExpenses = {};

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });

          if (data.transactionType === "expense") {
            totalExpenses += Number(data.amount);
            singleExpenses[id] = Number(data.amount);
          } else {
            totalIncome += Number(data.amount);
            singleIncome[id] = Number(data.amount);
          }
        });

        setTransactions(docs);
        let balance = totalIncome - totalExpenses;

        setTransactionTotals({
          balance,
          expenses: totalExpenses,
          income: totalIncome,
        });

        setSinIncome(singleIncome);
        setSinExpenses(singleExpenses);
        filterTransactions();
      });

      // Fetch tasks (modified to filter tasks for the currently logged-in user)
      let queryTasks = query(
        taskCollectionRef,
        where("userID", "==", userID),
        orderBy("createdAt")
      );

      unsubscribeTasks = onSnapshot(queryTasks, (snapshot) => {
        let taskDocs = [];

        snapshot.forEach((doc) => {
          const taskData = doc.data();
          const taskId = doc.id;

          taskDocs.push({ ...taskData, id: taskId });
        });

        setTasks(taskDocs);
      });
    } catch (err) {
      console.error(err.message);
      setIsLoading(false);
    }

    return () => {
      unsubscribeTransactions && unsubscribeTransactions();
      unsubscribeTasks && unsubscribeTasks();
    };
  };

  const applyFilters = () => {
    getTransactions();
  };

  const resetFilters = () => {
    setSelectedDate(null);
    setSelectedTransactionType(null);
    setSelectedCategory(null);
    getTransactions();
  };

  useEffect(() => {
    getTransactions();
  }, [userID, selectedDate, selectedTransactionType, selectedCategory]);

  return {
    isLoading,
    transactions,
    filteredTransactions,
    transactionTotals,
    sinIncome,
    sinExpenses,
    selectedDate,
    setSelectedDate,
    selectedTransactionType,
    setSelectedTransactionType,
    selectedCategory,
    setSelectedCategory,
    tasks, // Added tasks to the return object
    applyFilters,
    resetFilters,
  };
};
