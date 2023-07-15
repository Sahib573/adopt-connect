import axios from "axios";
import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import { useTranslation } from "react-i18next";

export default function UpdateWorkerPopUp({
  workerDetails,
  setopenupdateWorker,
}) {
  const [userId, setuserId] = useState(workerDetails.user_id);
  const [userName, setuserName] = useState(workerDetails.name);
  const [userEmail, setuserEmail] = useState(workerDetails.email);
  const [userCat, setuserCat] = useState(workerDetails.category);
  const [userPass, setuserPass] = useState(workerDetails.password);
  const [userZone, setuserZone] = useState(workerDetails.zone);
  const [userAddress, setuserAddress] = useState(workerDetails.address);
  const [userAadhar, setuserAadhar] = useState(workerDetails.aadharCardNo);
  const [userContact, setuserContact] = useState(workerDetails.contactNo);
  const [avatar, setavatar] = useState();
  const { t } = useTranslation();

  const updateWorkerHandler = async () => {
    await axios.post("https://adoptconnect.onrender.com/users/update", {
      user_id: userId,
      name: userName,
      email: userEmail,
      password: userPass,
      category: userCat,
      zone: userZone,
      address: userAddress,
      aadharCardNo: userAadhar,
      contactNo: userContact,
    });
    if (avatar) {
      const formData = new FormData();
      formData.append("file", avatar);
      formData.append("user_id", userId);
      await axios.post(
        "https://adoptconnect.onrender.com/users/image_upload",
        formData
      );
      setopenupdateWorker(false);
    } else {
      setopenupdateWorker(false);
    }
  };

  return (
    <div className="z-50 h-screen w-screen fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center overflow-y-hidden">
      <div className="h-5/6 p-6 bg-gray-100 flex items-center justify-center rounded-lg">
        <div className="h-full container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl flex justify-between items-center text-gray-600 mb-5">
              <div className="pl-4">Update New Worker</div>
              <div>
                <button
                  className="hover:text-slate-500"
                  onClick={() => setopenupdateWorker(false)}
                >
                  <ImCross />
                </button>
              </div>
            </h2>
            <div className="h-128 overflow-y-scroll bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">Worker Details</p>
                  <p>Please fill out all the fields.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5 flex flex-col mb-2">
                      <label htmlFor="full_name" className="pb-2">
                        {t("Worker Image")}
                      </label>
                      {avatar ? (
                        <img
                          src={URL.createObjectURL(avatar)}
                          className="h-40 w-40 mb-2"
                        />
                      ) : (
                        ""
                      )}
                      <input
                        type="file"
                        onChange={(e) => setavatar(e.target.files[0])}
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="user_id">User ID</label>
                      <div className="grid grid-cols-2">
                        <input
                          type="text"
                          name="user_id"
                          id="user_id"
                          className="h-10 cursor-not-allowed border mt-1 rounded px-4 w-full bg-gray-50"
                          value={userId}
                          disabled
                        />
                        <button className="cursor-not-allowed h-10 bg-blue-500 text-slate-100 w-3/4 mt-1 rounded ml-10 hover:bg-blue-400">
                          Generate Random
                        </button>
                      </div>
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="full_name">Full Name</label>
                      <input
                        type="text"
                        name="full_name"
                        id="full_name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={userName}
                        onChange={(e) => setuserName(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="email">Email addressress</label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={userEmail}
                        onChange={(e) => setuserEmail(e.target.value)}
                        placeholder="email@domain.com"
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="email">Role</label>
                      <select
                        name="email"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        onChange={(e) => setuserCat(e.target.value)}
                        placeholder="email@domain.com"
                      >
                        <option value="worker">Grass Root Worker</option>
                        <option value="case-manager">Case Managment</option>
                      </select>
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="pass">Address</label>
                      <input
                        type="text"
                        name="pass"
                        id="pass"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={userAddress}
                        onChange={(e) => setuserAddress(e.target.value)}
                        placeholder=""
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="pass">Aadhar Card Number</label>
                      <input
                        type="text"
                        name="pass"
                        id="pass"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={userAadhar}
                        onChange={(e) => setuserAadhar(e.target.value)}
                        placeholder=""
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="pass">Contact Number</label>
                      <input
                        type="text"
                        name="pass"
                        id="pass"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={userContact}
                        onChange={(e) => setuserContact(e.target.value)}
                        placeholder=""
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="pass">Zone</label>
                      <input
                        type="text"
                        name="pass"
                        id="pass"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={userZone}
                        onChange={(e) => setuserZone(e.target.value)}
                        placeholder=""
                      />
                    </div>
                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => updateWorkerHandler()}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
