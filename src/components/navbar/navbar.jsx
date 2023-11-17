import { NavLink, useNavigate } from 'react-router-dom'
import './navbar.css'
import { useRef, useState, useEffect } from 'react';
import { auth } from '../../config/firebase-config'
import { signOut } from 'firebase/auth'

import { useGetUserInfo } from "../../hooks/useGetUserInfo"
import {
    Box,
    Button,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Avatar,
    useToast,
} from '@chakra-ui/react';
import Auth from '../../pages/auth';

const Navbar = () => {

    const wrapperRef = useRef(null);
    const [clicked, setClicked] = useState(false);
    const toggleClicked = () => {
        setClicked(!clicked);
    };
    const { picture } = useGetUserInfo();
    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    const navigate = useNavigate();

    const signUserOut = async () => {
        try {
            await signOut(auth)
            localStorage.clear();
            navigate("/")
            setClicked(false);

            toast({
                title: 'Logged out successfully',
                status: 'success',
                position: 'top',
                isClosable: true,
            });

        } catch (err) {
            console.log(err)
        }
    }
    const toast = useToast();
    const handleTrackerClick = () => {
        if (!picture) {
            toast({
                title: 'Please Login to access Tracker',
                status: 'warning',
                position: 'top',
                isClosable: true,
            });
            setClicked(false);
            navigate("/", { replace: true });
        } else {
            // Navigate to the Tracker page
            navigate("/tracker");
            setClicked(false); // Close the navbar after clicking a link
        }
    };

    const handleClickOutside = (event) => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            // Click outside the navbar, close it
            setClicked(false);
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        // Attach the event listener when the component mounts
        document.addEventListener('mousedown', handleClickOutside);

        // Detach the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <>
            <Box className="wrappper" ref={wrapperRef}>
                <nav>
                    <NavLink to="/" id="logo">
                        ExpenseMapper
                    </NavLink>
                    <ul className={clicked ? 'navLinks active' : 'navLinks '} id='navbar'>
                        <li id='links'>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        {picture && (
                            <>
                                <li id='links'>
                                    <NavLink to="/dashboard">Dashboard</NavLink>
                                </li>
                            </>
                        )}
                        {/* <li id='links'>
                            <NavLink to="/about">About Us</NavLink>
                        </li> */}
                        <li id='links'>
                            <NavLink to="/tracker" onClick={handleTrackerClick}>Tracker</NavLink>
                        </li>
                        <li id='links'>
                            <NavLink to="/contact">ContactUs</NavLink>
                        </li>
                        <Box className="profilePic" onClick={toggleDropdown}>
                            {picture && (
                                <Popover>
                                    <PopoverTrigger>
                                        <Avatar size='lg' src={picture} alt="Profile" />
                                    </PopoverTrigger>
                                    <PopoverContent
                                        alignItems="center"
                                        justifyContent="center"
                                        bg="transparent"
                                        border="none"
                                        outline="none"
                                        boxShadow="none"
                                        focusBorderColor="transparent"
                                        focusShadow="none"
                                    >
                                        <PopoverBody outline="none">
                                            <Button onClick={signUserOut} colorScheme="accent" variant="outline" alignItems="center" justifyContent="center" display="flex" padding="4" height="12" >
                                                Logout
                                            </Button>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                            )}
                        </Box>
                        {!picture && (
                            <li id='links'>
                                <Auth />
                            </li>
                        )}

                    </ul>
                    <div className="hamburger">
                        <i
                            id='bar'
                            className={clicked ? 'fas fa-times fa-2x' : 'fas fa-bars fa-2xl'}
                            onClick={toggleClicked}
                        ></i>
                    </div>
                </nav>
            </Box>
        </>
    )
}

export default Navbar