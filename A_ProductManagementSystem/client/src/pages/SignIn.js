import React, { useState } from "react";
import Button from "../components/common/Button";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    // call your authService or handle local checks
    alert(`Signing in with Email: ${email}, Password: ${password}`);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2>Sign In to your account</h2>
      <div style={{ marginBottom: "1rem" }}>
        <label>Email</label>
        <input
          type="text"
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>Password</label>
        <input
          type="password"
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.5rem" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button onClick={handleSignIn}>Sign In</Button>
    </div>
  );
}

export default SignIn;
