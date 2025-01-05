import React, { useState } from "react";
import AddressInputFrom from "./AddressInputFrom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { STATUS } from "../app/constants";
import { Button, Modal } from "flowbite-react";
import AddressDetail from "./AddressDetail";
function Address() {
  const user = useSelector(selectUser);

  const [openModal, setOpenModal] = useState(false);
  console.log(user.addresses);
  const Cancel = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className="w-full grid grid-cols-6 gap-4">
        {user.addresses?.length > 0 ? (
          user.addresses?.map((address, index) => (
            <AddressDetail address={address} />
          ))
        ) : (
          <h1>You dont have any address.Please add new address.</h1>
        )}
      </div>

      <div className="flex justify-center">
        <Button onClick={() => setOpenModal(true)}>Add New Address</Button>
      </div>

      <Modal show={openModal} size={"lg"} onClose={() => setOpenModal(false)}>
        <Modal.Header>Enter New Address</Modal.Header>
        <Modal.Body>
          <AddressInputFrom Cancel={Cancel} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Address;
