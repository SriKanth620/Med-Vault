import { useEffect } from "react";
import "./Modal.css";
const Modal = ({ setModalOpen, contract1, contract2 }) => {
  const sharing = async () => {
    const address = document.querySelector(".address").value;
    await contract2.checkDoctor(address).catch(() => {
      alert("Entered doctor is not available");
    });
    await contract1.allow(address).catch(() => {
      alert("Cant allow");
    });
    window.setTimeout(() => {
      window.location.reload();
    }, 3000);
    setModalOpen(false);
  };
  const revoking = async () => {
    const address = document.querySelector(".address").value;
    await contract2.checkDoctor(address).catch(() => {
      alert("Entered doctor is not available");
    });
    await contract1.disallow(address);
    window.setTimeout(() => {
      window.location.reload();
    }, 3000);
    setModalOpen(false);
  };
  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract1.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract1 && accessList();
  }, [contract1]);
  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Share with</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
            ></input>
          </div>
          <form id="myForm">
            <select id="selectNumber">
              <option className="address">People With Access</option>
            </select>
          </form>
          <div className="footer">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button className="modal-btn" onClick={() => revoking()}>
              Revoke
            </button>
            <button className="modal-btn" onClick={() => sharing()}>
              Share
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;
