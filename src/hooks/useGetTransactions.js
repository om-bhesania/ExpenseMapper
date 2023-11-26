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
  const [tasks, setNewTasks] = useState([]);
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

  const { userID } = useGetUserInfo();

  const transactionCollectionRef = collection(db, "transactions");
  const TaskCollectionRef = collection(db, "Tasks");

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
    setIsLoading(true); // Set loading to true when fetching data
    let unsubscribe;
    try {
      // Build the base query
      let queryTransactions = query(
        transactionCollectionRef,
        where("userID", "==", userID),
        orderBy("createdAt")
      );

      // Apply filters based on selectedDate
      if (selectedDate) {
        const startDate = new Date(selectedDate + "T00:00:00");
        const endDate = new Date(selectedDate + "T23:59:59");

        if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
          // Both startDate and endDate are valid dates
          queryTransactions = query(
            queryTransactions,
            where("createdAt", ">=", startDate),
            where("createdAt", "<=", endDate)
          );
        } else {
          console.error("Invalid date format for selectedDate");
        }
      }

      // Apply filters based on selectedTransactionType
      if (selectedTransactionType) {
        queryTransactions = query(
          queryTransactions,
          where("transactionType", "==", selectedTransactionType)
        );
      }

      // Apply filters based on selectedCategory
      if (selectedCategory) {
        queryTransactions = query(
          queryTransactions,
          where("category", "==", selectedCategory)
        );
      }

      unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
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
        filterTransactions(); // Apply filters after fetching transactions
        setIsLoading(false); // Set loading to false after data is loaded
      });
    } catch (err) {
      console.error(err.message);
      setIsLoading(false); // Set loading to false in case of an error
    }

    return () => unsubscribe();
  };

  const getTasks = async () => {
    setIsLoading(true);
    let unsubscribe;
    try {
      // Assuming TaskCollectionRef is defined somewhere in your code
      const queryTasks = query(
        TaskCollectionRef,
        where("userID", "==", userID),
        orderBy("createdAt")
      );

      unsubscribe = onSnapshot(queryTasks, (snapshot) => {
        let docs = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          docs.push({ ...data, id });
        });
        setNewTasks(docs);
        setIsLoading(false);
      });
    } catch (err) {
      console.error("Error fetching tasks:", err.message);
      setIsLoading(false);
    }
    return () => unsubscribe();
  };

  const applyFilters = () => {
    // Re-fetch transactions with filters
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
    applyFilters,
    resetFilters,
    getTasks,
    tasks,
  };
};