import React, { useState } from 'react';
import { Link } from "react-router-dom";

const AuthForm = ({ type, onSubmit }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div 
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                background: '#f4f4f4',
            }}
        >
            <div 
                style={{
                padding: '2rem',
                borderRadius: '12px',
                border: '1px solid #ddd', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                background: 'white',
                maxWidth: '400px',
                width: '100%',
                textAlign: 'center'
                }}    
                className="auth-container">
                <h2>{type === 'signin' ? 'Sign In' : type === 'signup'
                    ? 'Sign Up'
                    : 'Update your password'}</h2>
                {type==='password'&&(
                    <p style={{margin:'0 0 20px'}}>Enter your email link, we will send you the recovery link</p>
                )}
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                    {type !== 'password' && (
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                    )}
                    <button
                        style={{
                        backgroundColor: "#9870ef", 
                        color: "white"
                        }}
                        type="submit"
                    >
                        {type === 'signin'
                        ? 'Sign In'
                        : type === 'signup'
                        ? 'Sign Up'
                        : 'Submit'}
                    </button>
                    {type !== 'password' && (
                    <nav 
                        style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1px",
                        }}
                    >
                        <p 
                        style={{
                            textAlign: 'left',
                            color: '#575857de',
                            margin: "0" 
                        }}
                        >{type=== "signin" ?"Don't have an account?":"Already have an account."}
                        </p>
                        <Link to={type=== "signin" ?"/signup":"/signin"}
                        style={{
                            textAlign: 'left'
                            }}
                        >{type=== "signin" ?"signup":"signin"}
                        </Link> 
                    </nav>
                    )}
                    {type !== 'password' && (
                    <nav 
                        style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1px" 
                         
                        }}
                    >
                        <p 
                        style={{
                            textAlign: 'left',
                            color: '#575857de',
                            margin: "0" 
                            }}
                        >Forgot password?
                        </p>
                        <Link to="/password"
                        style={{
                            textAlign: 'left'
                            }}
                        >change password
                        </Link> 
                    </nav>
                    )}
                    
                </form>
            </div>
        </div>
    );
};

export default AuthForm;
