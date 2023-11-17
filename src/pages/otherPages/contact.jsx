import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Textarea,
  Tooltip,
  useClipboard,
  useColorModeValue,
  VStack,
  useToast,
} from '@chakra-ui/react';

import {
  BsGithub,
  BsLinkedin,
  BsPerson,
  BsTwitter,
} from 'react-icons/bs';

import { MdEmail, MdOutlineEmail } from 'react-icons/md';
import { useAddTransactions } from '../../hooks/useAddTransactions';

const Contact = () => {
  const { hasCopied, onCopy } = useClipboard('bhesaniaom@gmail.com');
  const toast = useToast();
  const { addContactUs } = useAddTransactions();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addContactUs({
        name,
        email,
        message,
      });

      toast({
        title: 'Message Sent Successfully',
        position: 'top',
        status: 'success',
        isClosable: true,
      });
    } catch (error) {
      console.error('Error adding transaction:', error);
      toast({
        title: 'Something went wrong, please try again',
        position: 'top',
        status: 'error',
        isClosable: true,
      });
    }
  };

  return (
    <Flex align="center" justify="center" id="contact">
      <Box borderRadius="lg" m={{ base: 5, md: 16, lg: 10 }} ml={"30px"}>
        <Box>
          <VStack spacing={{ base: 4, md: 8, lg: 20 }}>
            <Heading fontSize={{ base: '4xl', md: '5xl' }}>
              Get in Touch
            </Heading>

            <Stack spacing={{ base: 4, md: 8, lg: 20 }} direction={{ base: 'column-reverse', md: 'column-reverse' }}>
              <Stack  align="center" justify="space-around" direction={{ base: 'row', md: 'row' }}>
                <Tooltip label={hasCopied ? 'Email Copied!' : 'Copy Email'} closeOnClick={false} hasArrow>
                  <IconButton
                    aria-label="email"
                    variant="ghost"
                    size="lg"
                    fontSize="3xl"
                    icon={<MdEmail />}
                    _hover={{
                      bg: 'blue.500',
                      color: useColorModeValue('white', 'gray.700'),
                    }}
                    onClick={onCopy}
                    isRound
                  />
                </Tooltip>

                <Box as="a" href="#">
                  <IconButton
                    aria-label="github"
                    variant="ghost"
                    size="lg"
                    fontSize="3xl"
                    icon={<BsGithub />}
                    _hover={{
                      bg: 'blue.500',
                      color: useColorModeValue('white', 'gray.700'),
                    }}
                    isRound
                  />
                </Box>

                <Box as="a" href="#">
                  <IconButton
                    aria-label="twitter"
                    variant="ghost"
                    size="lg"
                    icon={<BsTwitter size="28px" />}
                    _hover={{
                      bg: 'blue.500',
                      color: useColorModeValue('white', 'gray.700'),
                    }}
                    isRound
                  />
                </Box>

                <Box as="a" href="#">
                  <IconButton
                    aria-label="linkedin"
                    variant="ghost"
                    size="lg"
                    icon={<BsLinkedin size="28px" />}
                    _hover={{
                      bg: 'blue.500',
                      color: useColorModeValue('white', 'gray.700'),
                    }}
                    isRound
                  />
                </Box>
              </Stack>

              <Box
                bg={useColorModeValue('white', 'gray.700')}
                borderRadius="lg"
                p={8}
                color={useColorModeValue('gray.700', 'whiteAlpha.900')}
                shadow="base"
              >
                <form onSubmit={handleSubmit}>
                  <VStack spacing={5}  w={'23em'}>
                    <FormControl isRequired>
                      <FormLabel>Name</FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <BsPerson />
                        </InputLeftElement>
                        <Input type="text" name="name" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
                      </InputGroup>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Email</FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <MdOutlineEmail />
                        </InputLeftElement>
                        <Input type="email" name="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </InputGroup>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel>Message</FormLabel>
                      <Textarea
                        name="message"
                        placeholder="Your Message"
                        rows={6}
                        resize="none"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </FormControl>

                    <Button
                      colorScheme="blue"
                      bg="blue.400"
                      color="white"
                      _hover={{
                        bg: 'blue.500',
                      }}
                      width="full"
                      type="submit"
                    >
                      Send Message
                    </Button>
                  </VStack>
                </form>
              </Box>
            </Stack>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
};

export default Contact;
