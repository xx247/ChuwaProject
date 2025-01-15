import React, { useState } from 'react';

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
                height: '100vh',
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
                <h2>{type === 'signin' ? 'Sign In' : 'Sign Up'}</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                    <button type="submit">{type === 'signin' ? 'Sign In' : 'Sign Up'}</button>
                </form>
            </div>
        </div>
    );
};

export default AuthForm;
