import { Flex, Box, Text, Link, Icon, Stack } from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

export const Footer = () => {
    return (
        <Stack
            as="footer"
            align="center"
            justify="space-around"
            direction={{ base: 'column', md: 'row' }}
            wrap="wrap"
            padding="1.5rem"
            bg="gray.800"
            color="white"
            mt={{ md: '0em', base: '10em' }}
      
        >
            <Box mb={{ base: 8, md: 0 }} textAlign={'center'}>
                <Text fontSize="2xl" fontWeight="bold" color={'orange'}>
                    ExpenseMapper
                </Text>
                <Text mt={2}>Unleash Financial Freedom with ExpenseMapper</Text>
            </Box>

            <Box mb={{ base: 8, md: 0 }}>
                <Text fontWeight="bold" mb={2}>
                    Connect with us
                </Text>
                <Flex align={'center'} justify={'center'}>
                    <Link href="https://github.com/om-bhesania" target='_blank' transition={'ease-in-out 0.2s'} mr={3} _hover={{ color: 'orange' }}>
                        <Icon as={FaGithub} boxSize={6} />
                    </Link>
                    <Link href="https://instagram.com/om_bhesania" target='_blank' transition={'ease-in-out 0.2s'} mr={3} _hover={{ color: 'orange' }}>
                        <Icon as={FaInstagram} boxSize={6} />
                    </Link>
                    <Link href="https://linkedin.com/in/om-bhesania" target='_blank' transition={'ease-in-out 0.2s'} _hover={{ color: 'orange' }}>
                        <Icon as={FaLinkedin} boxSize={6} />
                    </Link>
                </Flex>
            </Box>
            <Box>
                <Text fontWeight="bold" mb={2}>
                    Quick Links
                </Text>
                <Flex align={'center'} justify={'center'} flexDirection={'column'}>
                    <Text>
                        <Link href="/" mr={3} _hover={{ color: 'orange' }}>
                            Home
                        </Link>
                    </Text>
                    <Text>
                        <Link href="/tracker" mr={3} _hover={{ color: 'orange' }}>
                            Tracker
                        </Link>
                        <Text>
                        </Text>
                        <Link href="/contact" _hover={{ color: 'orange' }}>
                            Contact
                        </Link>
                    </Text>
                </Flex>
            </Box>
        </Stack>
    );
};
