import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = ({ contract1, contract2 }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function connectAndPromptMetaMask() {
      if (window.ethereum) {
        try {
          // Prompt the user to connect MetaMask
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          console.log("MetaMask connected successfully");

          // You can also trigger other actions here, such as signing a transaction
          // await window.ethereum.request({ method: 'eth_sendTransaction', params: [...] });
        } catch (error) {
          console.error("Error connecting MetaMask:", error);
        }
      } else {
        console.error("MetaMask is not installed");
      }
    }

    // Delay the connection process by a few milliseconds to ensure it's triggered
    setTimeout(connectAndPromptMetaMask, 100);
  }, []);


  // const handleSubmit = async () => {
  //   try {
  //     setLoading(true);
  //     await contract1.displayOne();
  //     setLoading(false);
  //     alert("Contract 1 function executed successfully.");
  //   } catch (error) {
  //     console.error("Error executing contract 1 function:", error);
  //     setLoading(false);
  //     alert("Error executing contract 1 function. See console for details.");
  //   }
  // };

  // const handleClick = async () => {
  //   try {
  //     setLoading(true);
  //     const result = await contract2.displayTwo();
  //     setLoading(false);
  //     alert("Contract 2 function executed successfully. Result: " + result.join(', '));
  //   } catch (error) {
  //     console.error("Error executing contract 2 function:", error);
  //     setLoading(false);
  //     alert("Error executing contract 2 function. See console for details.");
  //   }
  // };

  return (
    <div>
      <Link to="/admin">Admin</Link> <br />
      <Link to="/doctor">Doctor</Link> <br />
      <Link to="/patient">Patient</Link>
      <h1>Home Page</h1>
       {/* <button id="test1-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? "Loading..." : "Test Contract 1"}
      </button> <br/> <br/>
      <button id="test2-btn" onClick={handleClick} disabled={loading}>
        {loading ? "Loading..." : "Test Contract 2"}
      </button> */}
    </div>
  );
};

export default Home;
