import { useState } from "react";
import "./Display.css";
import "../App.css";
const Display = ({ contract1, contract2, account }) => {
  const [data, setData] = useState("");
  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      await contract2.checkDoctor(account);
      if (Otheraddress) {
        dataArray = await contract1.display(Otheraddress);
        console.log(dataArray);
      } else {
        dataArray = await contract1.display(account);
      }
    } catch (e) {
      alert("You don't have access");
      console.log(e);
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      // console.log(str);
      // console.log(str_array);
      const images = str_array.map((item, i) => {
        return (
          <a href={item} key={i} target="_blank">
            <img key={i} src={item} alt="new" className="image-list"></img>
          </a>
        );
      });
      setData(images);
    } else {
      alert("No image to display");
    }
  };
  return (
    <div className="get-doc block">
      <h2 className="patient">Get Patients Data</h2>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="upload-btn" onClick={getdata}>
        Get Patient Records
      </button>
      <div className="image-list">{data}</div>
    </div>
  );
};
export default Display;
