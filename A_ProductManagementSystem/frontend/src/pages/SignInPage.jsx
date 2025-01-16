// src/pages/SignInPage.jsx
import React from 'react';
import AuthForm from '../components/AuthForm';
import { signIn } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
    const navigate = useNavigate();

    const handleSignIn = async (formData) => {
        try {
            const response = await signIn(formData);
            localStorage.setItem('token', response.token);
            alert('Sign in successful');
            navigate('/ProductList'); // Redirect to products page after sign-in
        } catch (error) {
            alert(`Sign in failed: ${error.response.data.message}`);
        }
    };

    return (
      <div style={{
        height: "100%",
      }}>
        <AuthForm type="signin" onSubmit={handleSignIn} />;

      </div>
    )
};

export default SignInPage;
