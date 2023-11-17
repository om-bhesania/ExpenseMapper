import "./index.css";
import { auth, provider } from '../../config/firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { Text, useToast } from "@chakra-ui/react";

const Auth = () => {
    const navigate = useNavigate();
    const { isAuth } = useGetUserInfo();
    const toast = useToast();
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            handleSignInResult(result);
        } catch (error) {
            console.error("Error signing in with Google:", error);
            // Handle the error, display a message to the user, or redirect as needed
        }
    };

    const handleSignInResult = async (result) => {
        const authInfo = {
            userID: result.user.uid,
            name: result.user.displayName,
            email: result.user.email,
            picture: result.user.photoURL,
            isAuth: true,
        };
        localStorage.setItem("auth", JSON.stringify(authInfo));
        toast({
            title: 'Login Successfully',
            status: 'success',
            position: 'top',
            isClosable: true,
        });
        console.log(result);
        navigate("/tracker");
    }

    if (isAuth) {
        return <Navigate to="/tracker" />;
    } else {
        <Navigate to="/home" />;
    }

    return (
        <>
            <button className="signInButton" onClick={signInWithGoogle}>
                <i className="fa-brands fa-google fa-lg" /> <Text mt={"0.5"} fontSize={"large"}>Login</Text>
            </button>
        </>
    );
}

export default Auth;
