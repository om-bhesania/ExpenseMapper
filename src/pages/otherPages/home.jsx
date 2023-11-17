import { Box, Flex, Stack, Text, Image, Button } from '@chakra-ui/react'
import './scss/home.css'
import { useNavigate } from 'react-router-dom'
import herobg from '../../assets/herobg.svg'

const Home = () => {
  const navigate = useNavigate()
  function getStarted() {
    navigate("/tracker")
  }
  function conatactUs() {
    navigate("/contact")
  }
  return (
    <>
      <Box w={"90%"} margin={"auto"} display={'flex'} justifyContent={'center'} alignItems={'center'} >

        <Stack direction={{ md: 'row-reverse', base: 'column' }} gap={'em'}>
          <Flex
            direction={['column', 'column', 'column']}
            justifyContent={['center', 'center', 'center']}
            alignItems={['center', 'center', 'flex-start']}
            margin={['20', '20', '20']}
            gap={[0, 3.5, 3.5]}
            w={["70%", "50%", "100%"]}
          >
              <span
                style={{
                  backgroundColor: 'orange',
                  height: '5px',
                  width: '50px',
                  alignSelf: 'flex-start',
                }}
              ></span>
              <Text
                as={'h1'}
                fontSize={['2rem', '2rem', '3rem']}
                w={['10em', '10em', '13em']}
                fontWeight={'600'}
                textAlign={['center', 'center', 'left']}
                lineHeight={1.1}
              >
                Unleash Financial Freedom with{' '}  <span style={{ color: 'orange' }}>ExpenseMapper</span>
              </Text>
              <Text
                as={'p'}
                fontSize={['md', 'md', 'large']}
                fontWeight={'500'}
                style={{ color: 'GrayText' }}
                textAlign={['center', 'center', 'left']}
                w={['22em', '13em', '90%']}
                mt={{ base: 'auto', md: '12px' }}
              >
                Your personalized solution to effortlessly track every expense, maximize income,
                and take charge of your financial well-being.Let ExpenseMapper be your guide
                on the path to financial success.
              </Text>
              <Stack direction={['column', 'column', 'row']} gap={[5, 5, 5]} mt={{ base: '30px', md: '0' }}>
                <Button
                  variant={'outline'}
                  w={['100%', '100%', '8em']}
                  h={['3em', '3em', '3em']}
                  p={3}
                  colorScheme="orange"
                  _hover={{ bg: 'orange', color: 'white' }}
                  onClick={getStarted}

                >
                  Get Started
                </Button>
                <Button
                  variant={'solid'}
                  w={['100%', '100%', '8em']}
                  h={['3em', '3em', '3em']}
                  p={3}
                  bg={'orange'}
                  color={'white'}
                  _hover={{ scale: '0.95', bg: 'orange' }}
                  onClick={conatactUs}
                >
                  Contact Us
                </Button>
              </Stack>


          </Flex>

          <Flex direction={'column'} justifyContent={'center'} alignItems={'center'} w={"100%"} mt={{ base: '-30px', md: '0' }}>
            <Image src={herobg} boxSize={{ md: '40em', base: '25em' }} objectFit='fit' />
          </Flex>
        </Stack >
    </Box >
    </>
  )
}

export default Home