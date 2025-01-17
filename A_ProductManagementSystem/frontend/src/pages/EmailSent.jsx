import React from "react";

function EmailSent() {
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
                justifyContent: "center",
                borderRadius: '12px',
                alignItems: "center",
                border: '1px solid #ddd', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
                background: 'white',
                maxWidth: '400px',
                width: '100%',
                height:'30%',
                textAlign: 'center'
                }}    
                className="auth-container">
                    <p style={{
                        margin: "30px",              
                        fontSize: "20px",         
                        fontWeight: "bold",       
                        color: "#333",            
                        textAlign: "center",      
        }}>We have sent the update password link to your email, please check that!</p>
            </div>
        </div>
    
  );
}

export default EmailSent;