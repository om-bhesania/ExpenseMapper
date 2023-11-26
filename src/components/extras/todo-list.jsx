import {
  Input,
  Box,
  Button,
  Heading,
  useToast,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  HStack,
  Flex,
  Tooltip,
  Image,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useAddTransactions } from '../../hooks/useAddTransactions';
import { useGetTransactions } from '../../hooks/useGetTransactions';
import { useDeleteTransaction } from '../../hooks/useDeleteTransactions';
import { useUpdateTransaction } from '../../hooks/useUpdateTransaction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faSquareMinus } from '@fortawesome/free-solid-svg-icons';
import AuthMobile from '../../pages/auth/indexMobile';
import waitingBg from '../../assets/waiting.svg'
const EditTaskModal = ({ isOpen, onClose, onSave, task }) => {
  const [editedTask, setEditedTask] = useState(task.newTask);

  const handleSave = () => {
    onSave(editedTask);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
            placeholder="Edit task..."
          />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="orange" onClick={handleSave}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export const Todo = () => {
  const { updateTask } = useUpdateTransaction();
  const { addTask } = useAddTransactions();
  const { tasks, userId } = useGetTransactions();
  const toast = useToast();
  const [newTask, setNewTask] = useState('');
  const { deleteTask } = useDeleteTransaction();
  const [clickedTasks, setClickedTasks] = useState(Array(tasks.length).fill(false));
  const [editTaskId, setEditTaskId] = useState(null);

  const userTasks = tasks.filter((task) => task.userId === userId);

  const handleTextDecorationToggle = (index) => {
    setClickedTasks((prevClickedTasks) => {
      const updatedClickedTasks = [...prevClickedTasks];
      updatedClickedTasks[index] = !updatedClickedTasks[index];
      return updatedClickedTasks;
    });
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  };

  const handleAddTask = async () => {
    try {
      const result = await addTask({ newTask });
      const newTasks = [...userTasks, result];
      setNewTask(newTasks);
      toast({
        title: 'Task Added Successfully',
        position: 'top',
        status: 'success',
        isClosable: true,
      });

      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
      toast({
        title: 'Something went wrong, please try again',
        position: 'top',
        status: 'error',
        isClosable: true,
      });
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      toast({
        title: 'Transaction Deleted Successfully',
        position: 'top',
        status: 'success',
        isClosable: true,
      });
    } catch (error) {
      console.error('Error deleting transaction:', error);
      toast({
        title: 'There was an error while deleting.... Please try again',
        position: 'top',
        status: 'error',
        isClosable: true,
      });
    }
  };

  const handleEdit = (taskId) => {
    setEditTaskId(taskId);
  };

  const handleSaveEdit = async (taskId, editedTask) => {
    try {
      await updateTask(taskId, editedTask);

      toast({
        title: 'Task Updated Successfully',
        position: 'top',
        status: 'success',
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating task:', error);
      toast({
        title: 'There was an error while updating the task. Please try again',
        position: 'top',
        status: 'error',
        isClosable: true,
      });
    } finally {
      setEditTaskId(null);
    }
  };

  return (
    <>
      {name ? (
        <>
          <Box
            gap={'1em'}
            p={4}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            flexDirection={'column'}
          >
            <Heading size={'lg'} mb={4} fontFamily={'Montserrat'}>
              Todo List
            </Heading>
            <Stack
              direction={['column', 'row']}
              w={['100%', '30%']}
              fontFamily={'Montserrat'}
              spacing={4}
            >
              <Input
                placeholder={'... add task'}
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                w={['100%', '70%']}
                required
              />
              <Button
                variant={'solid'}
                colorScheme={'orange'}
                bg={'orange.400'}
                transition={'ease-in 0.3s'}
                _hover={{
                  bg: 'orange.500',
                  color: 'white',
                }}
                onClick={handleAddTask}
                onKeyDown={handleEnterKeyPress}
                fontFamily={'sans-serif'}
                w={['100%', '30%']}
              >
                Add Task
              </Button>
            </Stack>
            {tasks.map((task, index) => (
              <Box
                key={index}
                transition={'ease-in 0.3s'}
                p={3}
                w={['100%', '45%']}
                borderWidth="1px"
                borderRadius="md"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                bg={clickedTasks[index] ? '#1CAA00' : 'transparent'}
                color={clickedTasks[index] ? '#CDCDCD' : '#000'}
                textDecoration={clickedTasks[index] ? 'line-through' : 'none'}
                cursor={'pointer'}
              >
                <Flex
                  bg={'none'}
                  w={['70%', '70%']}
                  gap={'0.4em'}
                  display={'flex'}
                  overflow={'hidden'}
                  alignItems={'flex-start'}
                  justify={'center'}
                  flexDirection={'column'}
                >
                  <Tooltip label={task.newTask} fontSize={['md', 'xl']} w={'100em'} p={3} fontFamily="Montserrat" fontWeight="600" color={'#FFFFFF'}>
                    <Text
                      cursor="pointer"
                      display={'flex'}
                      w={'100%'}
                      fontSize={['md', 'xl']}
                      fontFamily="Montserrat"
                      fontWeight="800"
                      transition={'ease-in 0.3s'}
                      color={clickedTasks[index] ? '#DBDBDB' : '#3b3b3b'}
                      flexGrow={1}
                      onClick={() => handleTextDecorationToggle(index)}
                    >
                      {task.newTask}
                    </Text>
                  </Tooltip>
                  <Text
                    w={'80%'}
                    fontSize={['2xs', 'xs']}
                    color="gray.400"
                    fontWeight="700"
                    fontFamily="sans-serif"
                  >
                    {task.createdAt && task.createdAt.toDate().toLocaleString()}
                  </Text>
                </Flex>
                <HStack spacing={{ 0: 0 }}>
                  <Button
                    bg={clickedTasks[index] ? 'transaprent' : 'transaprent'}
                    textDecoration={'none'}
                    transition={'ease-in 0.3s'}
                    variant={'outline'}
                    mr={-6}
                    border={'none'}
                    _hover={{
                      bg: 'none',
                      color: '#fdb037',
                      transform: 'rotate(180deg)',
                    }}
                    onClick={() => handleEdit(task.id)}
                  >
                    <FontAwesomeIcon icon={faGear} size="xl" color='#fdb037' />
                  </Button>
                  <Button
                    color={clickedTasks[index] ? '#000' : '#C4C4C4'}
                    textDecoration={'none'}
                    variant="outline"
                    transition={'ease-in 0.3s'}
                    colorScheme="red"
                    border={'none'}
                    _hover={{
                      bg: 'none',
                      color: '#fdb037',
                      transform: 'scale(1.1)',
                    }}
                    onClick={() => handleDelete(task.id)}
                  >
                    <EditTaskModal
                      isOpen={editTaskId === task.id}
                      onClose={() => setEditTaskId(null)}
                      onSave={(editedTask) =>
                        handleSaveEdit(task.id, editedTask)
                      }
                      task={task}
                    />
                    <FontAwesomeIcon icon={faSquareMinus} size="xl" style={{ color: "#c70000", }} />
                  </Button>
                </HStack>
              </Box>
            ))}
          </Box>
        </>
      ) : (
        <>
          <Box w={{ md: '85%', base: "90%" }} p={'5'} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={{ md: "row", base: "column" }} m={'auto'} gap={{ md: "15em", base: "0em" }}>
            <Stack w={"100%"}>
              <Heading as={'h3'} size={'2xl'} fontWeight={'500'} color="orange" fontFamily={'Montserrat'} >Login Requierd!!</Heading>
              <Text display={'flex'} gap={2} fontWeight={'500'} color="GrayText" fontSize={'2em'} fontFamily={'Montserrat'}>Please Login to Access the <Text color='orange' fontWeight={'600'}>Todo List</Text></Text>
              <Box w={100} alignSelf={'flex-start'}>
                <AuthMobile />
              </Box>
            </Stack>

            <Image
              src={waitingBg}
              boxSize={{ sm: '30em', md: '40em', lg: '40em', base: '15em' }}
              objectFit='fit' />
          </Box>
        </>
      )}

    </>
  );
};
