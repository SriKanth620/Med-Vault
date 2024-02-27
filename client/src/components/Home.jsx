import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = ({ contract1, contract2 }) => {
  const [loading, setLoading] = useState(false);

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
