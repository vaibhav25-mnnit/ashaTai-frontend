import React from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../features/auth/authSlice";
import toast from "react-hot-toast";

function AddressDetail({ address, showDeliverButton = true }) {
  const dispatch = useDispatch();

  const handleSelectAddress = async (data) => {
    const update = { selectedAddress: data._id };
    await dispatch(updateUser({ user: data.user, address: update }));
    toast.success("Successfully Updated delivery address.");
  };
  return (
    <div class="col-span-6 lg:col-span-2 flex flex-col mb-3 items-center  border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl bg-white ">
      <div class="flex flex-col justify-between p-4 leading-normal">
        <h5 class="mb-2 text-xl font-bold text-gray-900">
          {address?.fullName}
        </h5>
        <p class=" font-normal ">{address?.streetAddress}</p>
        <p class=" font-normal ">{address?.city}</p>
        <p class=" font-normal ">
          {address?.state} - {address?.pinCode}
        </p>
        <p class=" font-normal mt-2">Phone: {address?.phoneNumber}</p>
      </div>
      {showDeliverButton && (
        <button
          class="text-indigo-700 hover:text-white border border-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
          onClick={async () => {
            await handleSelectAddress(address);
          }}
        >
          {" "}
          Deliver Here
        </button>
      )}
    </div>
  );
}

export default AddressDetail;
