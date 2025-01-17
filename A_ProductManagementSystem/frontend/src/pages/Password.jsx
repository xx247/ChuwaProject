import React from 'react';
import AuthForm from '../components/AuthForm';
// import { signIn } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Password = () => {

    const navigate = useNavigate();
    const handleChangPassword=()=>{
        navigate('/emailsent');
    }
    return (
      
      <div style={{
        height: "90%",
      }}>
        <AuthForm type="password" onSubmit={handleChangPassword}/>;

      </div>
      
    )
};

export default Password;