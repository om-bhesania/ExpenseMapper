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
  Image,
} from '@chakra-ui/react';
import contactUs from '../../assets/contactus.svg'
import {
  BsGithub,
  BsInstagram,
  BsLinkedin,
  BsPerson,
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
    <Stack direction={{ base: 'column', md: 'row-reverse' }} align="center" justify="center" gap={{ base: '2em', md: '5em', lg: '7em' }}>

      <Flex align="center" justify="center" id="contact">
        <Box borderRadius="lg" m={{ base: 5, md: 16, lg: 10 }} ml={{ base: "0", md: "30px", lg: "10px" }}>
          <Box>

            <VStack spacing={{ base: 4, md: 8, lg: 20 }}>
              <Heading fontSize={{ base: '4xl', md: '5xl' }}>
                Get in Touch
              </Heading>


              <Stack spacing={{ base: 4, md: 8, lg: 20 }} align={'center'} justify={'center'} direction={{ base: 'column-reverse', md: 'column-reverse' }}>
                <Stack align="center" justify="space-around" direction={{ base: 'row', md: 'row' }}>
                  <Tooltip label={hasCopied ? 'Email Copied!' : 'Copy Email'} closeOnClick={false} hasArrow>
                    <IconButton
                      aria-label="email"
                      variant="ghost"
                      size="lg"
                      fontSize="3xl"
                      icon={<MdEmail />}
                      _hover={{
                        bg: '#fdb037',
                        color: useColorModeValue('white', 'gray.700'),
                      }}
                      onClick={onCopy}
                      isRound
                      transition={'ease-in 0.3s'}
                    />
                  </Tooltip>

                  <Box as="a" href="https://github.com/om-bhesania" target='_blank'>
                    <IconButton
                      aria-label="github"
                      variant="ghost"
                      size="lg"
                      fontSize="3xl"
                      transition={'ease-in 0.3s'}
                      icon={<BsGithub />}
                      _hover={{
                        bg: '#fdb037',
                        color: useColorModeValue('white', 'gray.700'),
                      }}
                      isRound
                    />
                  </Box>
                  <Box as="a" href="https://www.instagram.com/om_bhesania/" target='_blank'>
                    <IconButton
                      aria-label="linkedin"
                      transition={'ease-in 0.3s'}
                      variant="ghost"
                      size="lg"
                      icon={<BsInstagram size="28px" />}
                      _hover={{
                        bg: '#fdb037',
                        color: useColorModeValue('white', 'gray.700'),
                      }}
                      isRound
                    />
                  </Box>
                  <Box as="a" href="https://www.linkedin.com/in/om-bhesania/" target='_blank'>
                    <IconButton
                      aria-label="linkedin"
                      variant="ghost"
                      size="lg"
                      icon={<BsLinkedin size="28px" />}
                      _hover={{
                        bg: '#fdb037',
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
                  w={{ base: '22em', md: '30em' }}

                >
                  <form onSubmit={handleSubmit}>
                    <VStack spacing={5}>
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
                        bg="#fdb037"
                        color="white"
                        _hover={{
                          bg: '#FA9E0A',
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
      <Image
        src={contactUs}
        boxSize={{ base: "20em", sm: "25em", md: "30em", lg: "40em", xl: "55em" }}
        display={{ base: 'none', sm: 'block', md: 'block', lg: 'block', xl: 'block' }}
      />
    </Stack>
  );
};

export default Contact;
