// src/pages/SignInPage.jsx
import React from 'react';
import AuthForm from '../components/AuthForm';
import { signUp } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const navigate = useNavigate();

    const handleSignUp = async (formData) => {
        try {
            const response = await signUp(formData);
            localStorage.setItem('token', response.token);
            alert('Sign up successful');
            navigate('/signin'); // Redirect to signin page after signup
        } catch (error) {
            alert(`Sign in failed: ${error.response.data.message}`);
        }
    };

    return (
      <div style={{
        height: "100%",
      }}>
        <AuthForm type="signup" onSubmit={handleSignUp} />;

      </div>
    )
};

export default SignUpPage;
