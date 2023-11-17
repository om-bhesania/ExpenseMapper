import { useState } from "react";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useAddTransactions } from "../../hooks/useAddTransactions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faCapsules, faShoppingBasket, faHamburger, faFileInvoiceDollar, faMobileAlt, faCreditCard, faMoneyCheckAlt, faEllipsisH, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';

import './scss/tracker.css'
import {
    Heading,
    Text,
    Input,
    InputGroup,
    InputLeftAddon,
    Radio,
    RadioGroup,
    Stack,
    useToast,
    Box,
    Button, Select, Image, Tooltip
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import waitingBg from '../../assets/waiting.svg'
import AuthMobile from "../auth/indexMobile";

const Tracker = () => {
    const toast = useToast();
    const { name } = useGetUserInfo();
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [transactionType, setTransactionType] = useState("expense");
    const [customCategory, setCustomCategory] = useState("");
    const [selectedIcon, setSelectedIcon] = useState(null);
    const { addTransaction } = useAddTransactions();

    const categoryIcons = {
        entertainment: faGamepad,
        medicine: faCapsules,
        grocery: faShoppingBasket,
        food: faHamburger,
        utilitybill: faFileInvoiceDollar,
        recharge: faMobileAlt,
        subscription: faCreditCard,
        tax: faMoneyCheckAlt,
        Income: faIndianRupeeSign,
        other: faEllipsisH,
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const selectedCategory = customCategory || category;
            const selectedCategoryIcon = selectedIcon;
            await addTransaction({
                description,
                amount,
                category: selectedCategory,
                icon: selectedCategoryIcon.iconName,
                transactionType,
            });

            toast({
                title: `Transaction Added Successfully`,
                position: 'top',
                status: 'success',
                isClosable: true,
            });
            // Reset the form
            setDescription("");
            setAmount(0);
            setTransactionType("expense");
            setCategory("");
            setCustomCategory("");
        } catch (error) {
            console.error("Error adding transaction:", error);
            toast({
                title: `Something went wrong please try again`,
                position: 'top',
                status: 'error',
                isClosable: true,
            });
        }
    };
    const MAX_DESCRIPTION_LENGTH = 30;
    return (
        <>
            <div className="mainContainer">
                {name ? (
                    <>
                        <Box textAlign="center" mt={{ base: "-3em", md: "0px" }} mb={{ base: "3em", md: "1em" }}>
                            <Heading as="h1" fontSize={{ base: '2em', md: '4xl' }} mt={{ base: "2em", md: "0px" }} display={{ base: "none", md: "block" }}>
                                Welcome to Finance Tracker <span style={{ color: "#A3492F" }}>{name}</span>
                            </Heading>
                        </Box>
                        <div className="FormWrapper">
                            <form action="" className="" onSubmit={handleSubmit}>
                                <Text as="h2" fontSize="3xl" mt={{ base: "1em", md: "0px" }} fontWeight={600} color="GrayText" textAlign={{ base: "center", md: "left" }}>Please Enter the Transaction Details</Text>
                                <div className="desc">
                                    <Text id="labelHeaders">Description: </Text>
                                    <Tooltip label="Only 30 characters allowed" hasArrow placement="bottom" bg='gray.400'>
                                        <Input
                                            variant="flushed"
                                            type="text"
                                            name="Description"
                                            placeholder="Enter Description"
                                            value={description}
                                            onChange={(e) => {
                                                const inputText = e.target.value.slice(0, MAX_DESCRIPTION_LENGTH);
                                                setDescription(inputText);
                                            }}
                                            required
                                        />
                                    </Tooltip>
                                </div>
                                <div className="amount">
                                    <Text id="labelHeaders">Amount: </Text>
                                    <InputGroup size='sm'>
                                        <InputLeftAddon>₹</InputLeftAddon>
                                        <Input variant="flushed" name="Number" type="number" placeholder="Enter Amount" value={amount} required onChange={(e) => setAmount(e.target.value)} />
                                    </InputGroup>
                                </div>
                                <div className="category">
                                    <Text id="labelHeaders">Category: </Text>
                                    <Select
                                        variant="flushed"
                                        placeholder="Select category"
                                        value={category}
                                        onChange={(e) => {
                                            setCategory(e.target.value);
                                            setSelectedIcon(categoryIcons[e.target.value]);
                                        }}
                                        required
                                    >
                                        {Object.keys(categoryIcons).map((categoryKey) => ( 
                                        <option key={categoryKey} value={categoryKey}>
                                            {categoryKey !== 'other' && (
                                                <FontAwesomeIcon
                                                    icon={categoryIcons[categoryKey]}
                                                    style={{ marginRight: '5px' }}
                                                />
                                            )}
                                            {categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)}
                                        </option>
                                        ))}
                                    </Select>
                                    {category === 'other' && (
                                        <>
                                            <div className="customCategoryContainer" style={{ marginTop: 20 }}>
                                                <Text>Add Custom Category</Text>
                                                <Input
                                                    className="customCategory"
                                                    variant="flushed"
                                                    type="text"
                                                    name="CustomCategory"
                                                    placeholder="Enter custom category"
                                                    value={customCategory}
                                                    onChange={(e) => setCustomCategory(e.target.value)}
                                                    w={200}
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="radioBTN">
                                    <RadioGroup >
                                        <Stack display="flex" alignItems="center" justifyContent="center" spacing={{ base: 4, md: "1.3em" }} direction={{ base: 'row', md: 'column' }}>
                                            <Radio type="radio" id="Expense" value="expense" colorScheme='red' checked={transactionType === "expense"} onChange={(e) => setTransactionType(e.target.value)} >Expense</Radio>
                                            <Radio type="radio" id="Income" value="Income" colorScheme='green' checked={transactionType === "Income"} onChange={(e) => setTransactionType(e.target.value)} >Income</Radio>
                                        </Stack>
                                    </RadioGroup>
                                </div>

                                <Button
                                    leftIcon={<AddIcon />}
                                    type="submit"
                                    variant="outline"
                                    colorScheme="green"
                                    size="lg"
                                    _hover={
                                        {
                                            bg: "green.500",
                                            color: "white",
                                        }
                                    }
                                    h={{ md: '2em', base: '3em' }}
                                >  Add Transaction</Button>
                            </form>
                        </div>
                    </>
                ) : (
                    <Box w={{ md: '85%', base: "90%" }} p={'5'} display={'flex'} alignItems={'center'} justifyContent={'center'} flexDirection={{ md: "row", base: "column" }} m={'auto'} gap={{ md: "15em", base: "0em" }}>
                        <Stack w={"100%"}>
                            <Heading as={'h3'} size={'2xl'} fontWeight={'500'} color="orangered" fontFamily={'serif'} >Login Requierd!!</Heading>
                            <Text fontWeight={'500'} color="GrayText" fontSize={'2em'} fontFamily={'serif'}>Please Login to Access the tracker Page</Text>
                            <Box w={100} alignSelf={'flex-start'}>
                                <AuthMobile />
                            </Box>
                        </Stack>

                        <Image
                            src={waitingBg}
                            boxSize={{ sm: '30em', md: '40em', lg: '40em', base: '15em' }}
                            objectFit='fit' />
                    </Box>
                )}
            </div>
        </>
    );
};

export default Tracker;
