import "./index.css";
import { auth, provider } from '../../config/firebase-config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate, Navigate } from "react-router-dom";
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { Button, Text } from "@chakra-ui/react";

const AuthMobile = () => {
    const navigate = useNavigate();
    const { isAuth } = useGetUserInfo();

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
        console.log(result);
        navigate("/dashboard");
    }

    if (isAuth) {
        return <Navigate to="/dashboard" />;
    } else {
        <Navigate to="/home" />;
    }

    return (
        <>
            <Button
                onClick={signInWithGoogle}
                size="lg"
                colorScheme="orange"
                variant="outline"
                borderRadius={0}
                transition={'ease-in 0.3s'}
                bg={'transparent'}
                _hover={{ 
                    background:'white',
                    color: "#c05621",
                    boxShadow: "rgba(237, 125, 84, 0.4) 5px 5px, rgba(237, 125, 84, 0.3) 10px 10px, rgba(237, 125, 84, 0.2) 15px 15px, rgba(237, 125, 84, 0.1) 20px 20px, rgba(237, 125, 84, 0.05) 25px 25px",
                }}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                gap={'0.7em'}
            >
                <i className="fa-brands fa-google fa-lg" /> <Text mt={"0.5"} fontSize={"large"}>Login</Text>
            </Button >
        </>
    );
}

export default AuthMobile;

/* width: 10em;
  height: 3em;
  border: 1px solid #A3492F;
  color: #A3492F;
  transition: 0.25s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; */