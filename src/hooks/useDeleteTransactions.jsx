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

  return { deleteTransaction };
};
