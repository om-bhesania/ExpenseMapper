import { useState } from "react";
import {
  doc,
  updateDoc,
  setDoc,
  getDoc,
  getDocs,
  where,
  collection,
} from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useEditTransactions = () => {
  const { userID } = useGetUserInfo();
  const [editError, setEditError] = useState(null);

  const editTransaction = async (transactionID, updatedData) => {
    try {
      const transactionDocRef = doc(db, "transactions", transactionID);

      // Check if the transaction belongs to the current user before editing
      const transactionDoc = await getDoc(transactionDocRef);

      if (transactionDoc.exists() && transactionDoc.data().userID === userID) {
        await updateDoc(transactionDocRef, updatedData);
        console.log("Transaction edited successfully");
      } else {
        console.log("Transaction not found or unauthorized to edit");
      }
    } catch (error) {
      console.error("Error editing transaction:", error);
      setEditError(error.message);
    }
  };

  const addTransaction = async (newTransactionData) => {
    try {
      const transactionsCollectionRef = collection(db, "transactions");

      // Add the userID to the new transaction data
      const transactionDataWithUserID = {
        ...newTransactionData,
        userID: userID,
      };

      await setDoc(doc(transactionsCollectionRef), transactionDataWithUserID);
      console.log("Transaction added successfully");
    } catch (error) {
      console.error("Error adding transaction:", error);
      setEditError(error.message);
    }
  };

  const getTransactions = async () => {
    try {
      const transactionsCollectionRef = collection(db, "transactions");
      const querySnapshot = await getDocs(
        collection(transactionsCollectionRef, where("userID", "==", userID))
      );
      const transactions = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return transactions;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setEditError(error.message);
    }
  };

  return { editTransaction, addTransaction, getTransactions, editError };
};
