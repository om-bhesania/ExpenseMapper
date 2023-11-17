// About.js
import { Heading, Text, VStack, Container, Button, ListItem, UnorderedList,  Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <Container maxW="container.lg" py={12}>
      <VStack spacing={8} align="center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >



          <Heading as="h1" size="xl">
            Our Mission
          </Heading>
          <Text fontSize="lg" textAlign="center">
            At Expense Mapper, we believe that financial well-being is an essential aspect of a fulfilling life. Our mission is to empower individuals to take control of their finances by providing a simple and effective tool to manage and analyze day-to-day income and expenses.
          </Text>
          <Heading as="h1" size="xl">
            What is Expense Mapper?
          </Heading>
          <Text fontSize="lg" textAlign="center">
            Expense Mapper is a user-friendly, intuitive personal Expense Tracker designed with you in mind. Whether you are tracking daily spending, planning for the future, or simply gaining insights into your financial habits, Expense Mapper is here to streamline the process.
          </Text>
          <Container maxW="container.md" py={8}>
            <VStack align="start" spacing={4}>
              <Text fontSize="xl" fontWeight="semibold">
                Key Features
              </Text>
              <UnorderedList>
                <ListItem>
                  <Text fontSize="lg">
                    <strong>1. Simplicity and Ease of Use</strong>
                  </Text>
                  <Text>
                    We understand that managing finances can be daunting, so we have made Expense Mapper as simple as possible. With an easy-to-navigate interface, you can effortlessly record and categorize your income and expenses.
                  </Text>
                </ListItem>

                <ListItem>
                  <Text fontSize="lg">
                    <strong>2. Comprehensive Financial Tracking</strong>
                  </Text>
                  <Text>
                    Expense Mapper provides a comprehensive overview of your financial health. Track your income, monitor your spending patterns, and gain insights into where your money is going. It is the first step towards making informed financial decisions.
                  </Text>
                </ListItem>

                <ListItem>
                  <Text fontSize="lg">
                    <strong>3. Goal Setting and Budgeting</strong>
                  </Text>
                  <Text>
                    Set financial goals and create budgets tailored to your lifestyle. Whether you are saving for a dream vacation, planning for a major purchase, or just aiming to build a robust savings account, Expense Mapper helps you stay on track.
                  </Text>
                </ListItem>

                <ListItem>
                  <Text fontSize="lg">
                    <strong>4. Secure and Private</strong>
                  </Text>
                  <Text>
                    Your financial data is sensitive, and we take its security seriously. Expense Mapper employs robust security measures to ensure that your personal and financial information remains confidential and secure.
                  </Text>
                </ListItem>
              </UnorderedList>
            </VStack>
          </Container>
          <Heading as="h1" size="xl">
            Our Commitment
          </Heading>
          <Text fontSize="lg" textAlign="center">
            We are committed to providing a reliable, user-friendly experience that empowers you to achieve your financial goals. Your feedback is invaluable, and we continuously strive to enhance Expense Mapper based on your needs and suggestions.
          </Text>
          <Heading as="h1" size="xl">
            Get Started Today!
          </Heading>
          <Stack direction={'column'} align={'center'}>
            <Text fontSize="lg" textAlign="center">
              Join the growing community of individuals taking charge of their financial journey with Expense Mapper. Whether you are a seasoned budgeter or just starting, our tool is designed for everyone.
              Start mapping your expenses, understanding your financial habits, and building a brighter financial future today!
            </Text>
            <Button w={56} variant={"solid"} colorScheme='orange'>Get Started</Button>
          </Stack>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Text fontSize="lg" textAlign="center">
            Start tracking your finances with Expense Mapper today!
          </Text>
        </motion.div>
      </VStack>
    </Container>
  );
};

export default About;
