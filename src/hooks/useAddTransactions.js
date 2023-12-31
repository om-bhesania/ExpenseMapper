//useAddTransactions

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useAddTransactions = () => {
  const transactionCollectionRef = collection(db, "transactions");
  const ContactCollectionRef = collection(db, "contactUs");
  const TaskCollectionRef = collection(db, "Tasks");
  const { userID } = useGetUserInfo();

  const addTransaction = async ({
    description,
    amount,
    transactionType,
    category,
  }) => {

    await addDoc(transactionCollectionRef, {
      userID,
      description,
      amount,
      transactionType,
      createdAt: serverTimestamp(),
      category,
    });
  };
  const addContactUs = async ({
    name,
    email,
    message,
  }) => {

    await addDoc(ContactCollectionRef, {
      userID,
      name,
      email,
      message,
      createdAt: serverTimestamp(),
    });
  };
    const addTask = async ({
      newTask,
    }) => {
      await addDoc(TaskCollectionRef, {
        userID,
        newTask,
        createdAt: serverTimestamp(),
      });
    };
    return { addTransaction, addContactUs ,addTask};
  };