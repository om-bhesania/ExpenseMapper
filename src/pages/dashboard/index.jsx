import {
  Text,
  Flex,
  Grid,
  GridItem,
  Stack,
  Box,
  Heading,
  useToast,
  Stat,
  StatHelpText, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, Button, Skeleton,
} from '@chakra-ui/react';
import { Metric, Badge, BadgeDelta } from "@tremor/react";
import { Areachart } from "../../components/extras/areachart";
import { useGetTransactions } from "../../hooks/useGetTransactions"
import { useDeleteTransaction } from '../../hooks/useDeleteTransactions';
import { format } from 'date-fns';



const Dashboard = () => {
  const toast = useToast();
  const { transactions, transactionTotals, isLoading } = useGetTransactions();
  const { balance, income, expenses } = transactionTotals;
  const { deleteTransaction } = useDeleteTransaction();
  function addCommas(number) {
    let numString = number.toString();
    numString = numString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return numString;
  }

  const handleDelete = async (transactionID) => {
    try {
      await deleteTransaction(transactionID);

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
  const {
    selectedDate,
    setSelectedDate,
    selectedTransactionType,
    setSelectedTransactionType,
    selectedCategory,
    setSelectedCategory,
    applyFilters,
    resetFilters,
    filteredTransactions
  } = useGetTransactions();

  const handleApplyFilters = () => {
    applyFilters();
  };

  const handleResetFilters = () => {
    setSelectedDate(null)
    setSelectedTransactionType(null)
    setSelectedCategory(null)
    resetFilters();
  };
  const formatFirestoreTimestamp = (timestamp) => {
    if (!timestamp || !timestamp.toDate || typeof timestamp.toDate !== 'function') {
      return ''; // Handle invalid input gracefully
    }

    return format(timestamp.toDate(), 'MMMM dd, yyyy hh:mm a', {
      timeZone: 'Asia/Kolkata',
    });
  };
  return (
    <>

      <Flex
        p={{ base: "1%", md: "5%" }}
        justifyContent="center"
        alignItems="center"
        mt={{ base: '0', md: "-90px" }}

      >
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(5, 1fr)" }}
          templateRows={{ base: "repeat(3, 1fr)", md: "repeat(4, 1fr)" }}
          gap={{ base: 0, md: 5 }}
          w={{ base: "80%", md: "100%" }}
        >
          {/* Top row */}

          <Stack direction="column" display={{ base: "block", md: "none" }}>
            {isLoading ? (
              <Skeleton height='7em' mt={5} />
            ) : (
              <>
                <GridItem colSpan={1} rowSpan={{ md: '1', base: '1' }} p={{ base: 3, md: 5 }}>
                  <Flex
                    direction="column"
                    justifyContent="center"
                    alignItems="baseline"
                    boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;"
                    p={5}
                    gap={2}
                    borderRadius={20}
                  >

                    <Badge size="xs" deltaType="moderateIncrease" color="blue">
                      <Stack direction="row" gap={2} justifyContent="center" alignItems="center">
                        <i className="fa-solid fa-signal-stream" />
                        <Text>Total Balance</Text>
                      </Stack>
                    </Badge>
                    {isLoading ? ( // Check if data is loading
                      <Stack>
                        <Skeleton height='20px' borderRadius={20} />
                      </Stack>
                    ) : (
                      <>
                        <Metric as='h1' fontSize='2xl' color="gray">₹ {addCommas(balance)}</Metric>
                      </>)}
                  </Flex>
                </GridItem>
              </>)}
            {isLoading ? (
              <Skeleton height='7em' mt={5} />
            ) : (
              <>
                <GridItem colSpan={1} rowSpan={{ md: '1', base: '1' }} p={{ base: 3, md: 5 }}>
                  <Flex
                    direction="column"
                    justifyContent="center"
                    alignItems="baseline"
                    boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;"
                    p={5}
                    gap={2}
                    borderRadius={20}
                  >
                    <BadgeDelta size="xs" deltaType="moderateIncrease">
                      <Text textAlign="center" as='p' >Total Income</Text>
                    </BadgeDelta>
                    {isLoading ? ( // Check if data is loading
                      <Stack>
                        <Skeleton height='20px' borderRadius={20} />
                      </Stack>
                    ) : (
                      <>
                        <Metric as='h1' fontSize='2xl' color="black" >₹{addCommas(income)}</Metric>
                      </>)}
                  </Flex>
                </GridItem>
              </>)}
            {isLoading ? (
              <Skeleton height='7em' mt={5} />
            ) : (
              <>
                <GridItem colSpan={1} rowSpan={{ md: '1', base: '1' }} p={{ base: 3, md: 5 }}>
                  <Flex
                    direction="column"
                    justifyContent="center"
                    alignItems="baseline"
                    boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;"
                    p={5}
                    gap={2}
                    borderRadius={20}
                  >
                    <BadgeDelta size="xs" deltaType="moderateDecrease">
                      <Text textAlign="center" as='p' >Total Expense</Text>
                    </BadgeDelta>
                    {isLoading ? ( // Check if data is loading
                      <Stack>
                        <Skeleton height='20px' borderRadius={20} />
                      </Stack>
                    ) : (
                      <>
                        <Metric as='h1' fontSize='2xl' color="black">₹ {addCommas(expenses)}</Metric>
                      </>)}
                  </Flex>
                </GridItem>
              </>)}
          </Stack> {isLoading ? (
            <Skeleton height='7em' mt={5} />
          ) : (
            <>
              <GridItem colSpan={1} p={{ base: 3, md: 5 }} display={{ base: "none", md: "block" }}>
                <Flex
                  direction="column"
                  justifyContent="center"
                  alignItems="baseline"
                  boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;"
                  p={5}
                  gap={2}
                  borderRadius={20} fontFamily={'monospace'}
                >
                  <Badge size="xs" deltaType="moderateIncrease" color="blue">
                    <Stack direction="row" gap={2} justifyContent="center" alignItems="center">
                      <i className="fa-solid fa-signal-stream" />
                      <Text>Total Balance</Text>
                    </Stack>
                  </Badge>
                  {isLoading ? ( // Check if data is loading
                    <Stack>
                      <Skeleton height='20px' borderRadius={20} />
                    </Stack>
                  ) : (
                    <>
                      <Metric as='h1' fontSize='2xl' color="gray">₹{addCommas(balance)}</Metric>
                    </>)}
                </Flex>
              </GridItem>
            </>)}
          {isLoading ? (
            <Skeleton height='7em' mt={5} />
          ) : (
            <>
              <GridItem colSpan={1} p={{ base: 3, md: 5 }} display={{ base: "none", md: "block" }}>
                <Flex
                  direction="column"
                  justifyContent="center"
                  alignItems="baseline"
                  boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;"
                  p={5}
                  gap={2}
                  borderRadius={20}
                  fontFamily={'monospace'}
                >
                  <BadgeDelta size="xs" deltaType="moderateIncrease">
                    <Text textAlign="center" as='p' >Total Income </Text>
                  </BadgeDelta>
                  {isLoading ? ( // Check if data is loading
                    <Stack>
                      <Skeleton height='20px' borderRadius={20} />
                    </Stack>
                  ) : (
                    <>
                      <Metric as='h1' fontSize='2xl' color="black" >₹{addCommas(income)}</Metric>
                    </>)}
                </Flex>
              </GridItem>
            </>)}
          {isLoading ? (
            <Skeleton height='7em' mt={5} />
          ) : (
            <>
              <GridItem colSpan={1} p={{ base: 3, md: 5 }} display={{ base: "none", md: "block" }}>
                <Flex
                  direction="column"
                  justifyContent="center"
                  alignItems="baseline"
                  boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;"
                  p={5}
                  gap={2}
                  borderRadius={20} fontFamily={'monospace'}
                >
                  <BadgeDelta size="xs" deltaType="moderateDecrease">
                    <Text textAlign="center" as='p' >Total Expense</Text>
                  </BadgeDelta>
                  <Metric as='h1' fontSize='2xl' color="black" >₹{addCommas(expenses)}</Metric>
                </Flex>
              </GridItem>
            </>)}
          {/* Recent Transactions */}
          <GridItem colSpan={{ base: 1, md: 2 }} rowSpan={{ base: 1, md: 5 }} p={{ base: 4, md: 5 }} h={"50em"} mt={{ base: '-11.5em', md: '20px' }} borderRadius={20}
            boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 15px'}
          >



            <Flex align={'center'} justify={"space-between"} mb={"20px"} p={1} >
              <Heading as="h1" fontSize={{ base: "xl", md: "2xl" }} color="GrayText">
                Recent Transactions
              </Heading>
              <Popover>
                <PopoverTrigger>
                  <i className="fa-sharp fa-regular fa-filter-list fa-xl" style={{ cursor: "pointer", color: "black" }} />
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverHeader>Filter Options</PopoverHeader>
                  <PopoverBody>
                    <Stack spacing={3}>
                      <label>Date:</label>
                      <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />

                      <label>Transaction Type:</label>
                      <select value={selectedTransactionType} onChange={(e) => setSelectedTransactionType(e.target.value)}>
                        <option value="">Select Transaction Type</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                      </select>

                      <label>Category:</label>
                      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                        <option value="">Select a Category</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="grocery">Grocery</option>
                        <option value="entertainment">entertainment</option>
                        <option value="grocery">grocery</option>
                        <option value="medicine">medicine</option>
                        <option value="food">Food</option>
                        <option value="utilitybill">utilitybill</option>
                        <option value="recharge">recharge</option>
                        <option value="subscription">subscription</option>
                        <option value="tax">tax</option>
                        <option value="other">others</option>
                      </select>
                    </Stack>
                  </PopoverBody>
                  <PopoverFooter>
                    <Button colorScheme="blue" onClick={handleApplyFilters}>
                      Apply Filters
                    </Button>
                    <Button variant="ghost" onClick={handleResetFilters}>
                      Reset Filters
                    </Button>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>

              {/* */}
            </Flex>
            <hr />
            {isLoading ? (
              <Stack>
                <Skeleton height='3em' mt={5} />
                <Skeleton height='3em' mt={5} />
                <Skeleton height='3em' mt={5} />
                <Skeleton height='3em' mt={5} />
                <Skeleton height='3em' mt={5} />
                <Skeleton height='3em' mt={5} />
                <Skeleton height='3em' mt={5} />
                <Skeleton height='3em' mt={5} />
                <Skeleton height='3em' mt={5} />
              </Stack>
            ) : (
              <>
                <Box overflowY={'scroll'} h={"700"} p={3} w={"100%"}>
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((t) => (
                      // Render filtered transactions
                      <Box key={t.id} mt={4} bg="white" p={4} borderRadius={8} boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 10px 0px;"  >
                        <Text fontSize="xs" color="GrayText" fontWeight={400} >
                          <Flex justify="space-between" align="center" >
                            <Stat >
                              <Stack direction={'row'} gap={1} >
                                <StatHelpText>
                                  <Badge color={t.transactionType === 'expense' ? 'red' : 'green'}>
                                    {addCommas(t.category)}
                                  </Badge>
                                </StatHelpText>
                              </Stack>
                            </Stat>
                            <i className='fa-solid fa-trash-can fa-xl' onClick={() => handleDelete(t.id)} style={{ cursor: "pointer", color: "black" }} />
                          </Flex>
                        </Text>
                        <Text fontSize={{ md: '1em', base: '0.7em' }} color={'#3b3b3b'} fontWeight="500">
                          {t.description}
                        </Text>

                        <Flex mt={2} justify="space-between" align="center" h={"2rem"}>
                          <Text fontSize={{ base: "1.2em", md: '1.6em' }} color={'#3b3b3b'} fontWeight="600" fontFamily={'monospace'}>
                            ₹{addCommas(t.amount)}
                          </Text>
                          <Flex direction={"column"} gap={2} alignItems={"flex-end"} >
                            <Text color={t.transactionType === 'expense' ? 'red' : 'green'} fontWeight={500}>
                              {t.transactionType}
                            </Text>
                            <Text as={"p"} color={"GrayText"} fontSize={{ base: "0.6em", md: "0.7em" }} flexBasis={0} >
                              {formatFirestoreTimestamp(t.createdAt)}
                            </Text>
                          </Flex>
                        </Flex>
                      </Box>
                    ))
                  ) : (
                    // If no filters, render all transactions

                    transactions.map((t) => (
                      <Box key={t.id} mt={4} bg="white" p={4} borderRadius={8} boxShadow="rgba(0, 0, 0, 0.15) 0px 5px 10px 0px;"  >
                        <Text fontSize="xs" color="GrayText" fontWeight={400} >
                          <Flex justify="space-between" align="center" >
                            <Stat >
                              <Stack direction={'row'} gap={1} >
                                <StatHelpText>
                                  <Badge color={t.transactionType === 'expense' ? 'red' : 'green'}>
                                    {addCommas(t.category)}
                                  </Badge>
                                </StatHelpText>
                              </Stack>
                            </Stat>
                            <i className='fa-solid fa-trash-can fa-xl' onClick={() => handleDelete(t.id)} style={{ cursor: "pointer", color: "black" }} />
                          </Flex>
                        </Text>
                        <Text fontSize={{ md: '1em', base: '0.8em' }} color={'#3b3b3b'} fontWeight="500">
                          {t.description}
                        </Text>
                        <Flex mt={2} justify="space-between" align="center" h={"2rem"}>
                          <Text fontSize="1.2em" fontWeight="bold" fontFamily={'monospace'}>
                            ₹{addCommas(t.amount)}
                          </Text>
                          <Flex direction={"column"} gap={2} alignItems={"flex-end"} >
                            <Text color={t.transactionType === 'expense' ? 'red' : 'green'} fontWeight={500}>
                              {t.transactionType}
                            </Text>
                            <Text as={"p"} color={"GrayText"} fontSize={{ base: "0.6em", md: "0.7em" }} flexBasis={0} >
                              {formatFirestoreTimestamp(t.createdAt)}
                            </Text>
                          </Flex>
                        </Flex>
                      </Box>

                    ))
                  )}
                </Box>
              </>)}
          </GridItem>



          {/* extras */}
          <GridItem colSpan={{ base: 1, md: 3 }} rowSpan={{ base: 1, md: 6 }} p={{ base: 3, md: 5 }} borderRadius={20} >
            {isLoading ? ( // Check if data is loading
              <Stack>
                <Skeleton height='30em' />
              </Stack>
            ) : (
              <>
                <Areachart />
              </>)}
          </GridItem>
        </Grid>
      </Flex >
    </>
  )
}

export default Dashboard;


/*
        */