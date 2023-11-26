//useDeleteTransactions

import { db } from "../config/firebase-config";
import { deleteDoc, doc } from "firebase/firestore";
import { useGetUserInfo } from "./useGetUserInfo";
import { getDoc } from "firebase/firestore";

export const useDeleteTransaction = () => {
  const { userID } = useGetUserInfo();

  const deleteTransaction = async (transactionID) => {
    try {
      const transactionDocRef = doc(db, "transactions", transactionID);

      // Check if the transaction belongs to the current user before deleting
      const transactionDoc = await getDoc(transactionDocRef);
      if (transactionDoc.exists() && transactionDoc.data().userID === userID) {
        await deleteDoc(transactionDocRef);
        console.log("Transaction deleted successfully");
      } else {
        console.log("Transaction not found or unauthorized to delete");
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const taskDocRef = doc(db, 'Tasks', taskId);
      const taskDoc = await getDoc(taskDocRef);

      if (taskDoc.exists() && taskDoc.data().userID === userID) {
        await deleteDoc(taskDocRef);
        console.log('Task deleted successfully');
      } else {
        console.log('Task not found or unauthorized to delete');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      throw new Error('Failed to delete task');
    }
  };

  return { deleteTransaction, deleteTask };
};
