import { db } from "../config/firebase-config";
import { doc, updateDoc } from "firebase/firestore";

export const useUpdateTransaction = () => {
  const updateTask = async (taskId, editedTask) => {
    try {
      const taskDocRef = doc(db, 'Tasks', taskId);

      await updateDoc(taskDocRef, {
        newTask: editedTask,
      });
    } catch (error) {
      console.error('Error updating task:', error);
      throw new Error('Failed to update task');
    }
  };

  return { updateTask };
};
