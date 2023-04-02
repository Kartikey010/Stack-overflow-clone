import {  useState } from 'react';

const OtpForm = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [status, setStatus] = useState('');
 

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send the email to the server
    const response = await fetch('https://stackoverflow-clone-ctpf.onrender.com/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    setStatus(data.message);
  };

  const handleVerification = async (event) => {
    event.preventDefault();

    // Verify the OTP
    const response = await fetch('https://stackoverflow-clone-ctpf.onrender.com/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    });

    const data = await response.json();
    setStatus(data.message);
    
  };

  return (
    <div >
      <h2>OTP Verification</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <button type="submit">Send OTP</button>
      </form>
      <form onSubmit={handleVerification}>
        <label>
          OTP:
          <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
        </label>
        <button type="submit">Verify OTP</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default OtpForm;