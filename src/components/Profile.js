import React, { useState } from "react";
import Address from "./Address";
import AddressDetail from "./AddressDetail";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
function Profile() {
  const user = useSelector(selectUser);
  const [showAddress, setShowAddress] = useState(false);
  return (
    <>
      <div className="flex flex-col mt-2 items-center justify-center  gap-y-5  px-10 sm:px-40">
        {/* Top Pannel */}
        <div className="w-full mt-4">
          <div className="flex-col gap-y-5 w-full sm:flex-wrap sm:flex-col sm:gap-y-2 md:flex-wrap md:gap-y-2 md:flex-col lg:flex-nowrap mt-2 flex lg:flex-row justify-between lg:gap-x-5">
            {/* Personal Information Details */}
            <div className="p-5 w-full border-2 border-grey-800 bg-white shadow">
              <h1 className="text-xl mb-2 font-semibold">
                Personal Information
              </h1>
              <hr className="mb-3" />
              <div>
                <div>
                  {user?.name}
                  <br />
                  {user?.email}
                </div>
              </div>
            </div>

            {/*  Selected Delivery Address Details */}
            <div className="p-5 w-full border-2 border-grey-800 bg-white shadow">
              <h1 className="text-xl mb-2 font-semibold">
                Selected Delivery Address
              </h1>
              <hr className="mb-3" />
              <AddressDetail
                address={user?.selectedAddress}
                showDeliverButton={false}
              />
            </div>
          </div>
          {/* Your Saved Address Details */}
          <div className="p-5 mt-4 w-full border-2 border-grey-800 bg-white shadow">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl mb-2 font-semibold">
                  Your Saved Address
                </h1>
              </div>
            </div>
            <>
              <hr className="mb-3" />
              <Address />
            </>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
