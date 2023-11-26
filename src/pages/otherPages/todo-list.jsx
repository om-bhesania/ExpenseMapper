import { Box, Flex, Heading } from "@chakra-ui/react";

export const TodoList = () => {
  return (
    <>
      <Box  direction={'column'} border={'1px solid black'} display={'flex'} justifyContent={"center"} alignItems={"center"}>
        <Flex direction={'column'} align={'center'} justify={'center'}>
            <Heading as={'h1'} size={'xl'}  >Todo List</Heading>
            <form action="">
            <Flex align={'center'} justify={'center'} direction={'column'}>
                <input type='text' placeholder='Add a task...'/>

                <button type='submit'>Submit</button>
                
            </Flex>
            </form>
       </Flex>
      </Box>
      
    </>
  );
};
