import axios from "axios";
import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import { useTranslation } from "react-i18next";
import { validateEmail } from "../../Contexts/Validation";

export default function AddWorkerPopUp({ setopenAddWorker }) {
  const [userId, setuserId] = useState("");
  const [userName, setuserName] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [userCat, setuserCat] = useState("worker");
  const [userPass, setuserPass] = useState("");
  const [userZone, setuserZone] = useState("");
  const [userAddress, setuserAddress] = useState("");
  const [userAadhar, setuserAadhar] = useState("");
  const [userContact, setuserContact] = useState("");
  const [avatar, setavatar] = useState();
  const [err, seterr] = useState("");
  const { t } = useTranslation();

  const addWorkerHandler = async () => {
    if (!validateEmail(userEmail)) {
      seterr("Please enter a valid email");
      return;
    }
    if (!userId || !userName || !userEmail || !userPass) {
      seterr("Please fill all the details");
      return;
    }
    const response = await axios.post(
      "https://adoptconnect.onrender.com/users/create",
      {
        user_id: userId,
        name: userName,
        email: userEmail,
        password: userPass,
        category: userCat,
        zone: userZone,
        address: userAddress,
        aadharCardNo: userAadhar,
        contactNo: userContact,
      }
    );
    if (!response.data.response) {
      seterr("Error in creating the user/user already exists");
    }
    if (avatar) {
      const formData = new FormData();
      formData.append("file", avatar);
      formData.append("user_id", userId);
      await axios.post(
        "https://adoptconnect.onrender.com/users/image_upload",
        formData
      );
    }
    setopenAddWorker(false);
  };

  return (
    <div className="z-50 h-screen w-screen fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center overflow-y-hidden">
      <div className="h-5/6 p-6 bg-gray-100 flex items-center justify-center rounded-lg">
        <div className="h-full container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl flex justify-between items-center text-gray-600 mb-5">
              <div>{t("Add New Worker")}</div>
              <div>
                <button
                  className="hover:text-slate-500"
                  onClick={() => setopenAddWorker(false)}
                >
                  <ImCross />
                </button>
              </div>
            </h2>
            <div className="h-128 overflow-y-scroll bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">{t("Worker Details")}</p>
                  <p>{t("Please fill out all the fields")}.</p>
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
                      <label htmlFor="user_id">
                        {t("User Id")}
                        <span className="text-red-500 pl-1">*</span>
                      </label>
                      <div className="grid grid-cols-2">
                        <input
                          type="text"
                          name="user_id"
                          id="user_id"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          value={userId}
                          onChange={(e) => setuserId(e.target.value)}
                        />
                        <button
                          className="h-10 bg-blue-500 text-slate-100 w-3/4 mt-1 rounded ml-10 hover:bg-blue-400"
                          onClick={() => {
                            setuserId(Math.floor(Math.random() * 1000000000));
                          }}
                        >
                          {t("Generate Random")}
                        </button>
                      </div>
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="pass">
                        {t("Password")}
                        <span className="text-red-500 pl-1">*</span>
                      </label>
                      <input
                        type="text"
                        name="pass"
                        id="pass"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={userPass}
                        onChange={(e) => setuserPass(e.target.value)}
                        placeholder=""
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="full_name">
                        {t("Full Name")}
                        <span className="text-red-500 pl-1">*</span>
                      </label>
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
                      <label htmlFor="email">
                        {t("Email Address")}
                        <span className="text-red-500 pl-1">*</span>
                      </label>
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
                      <label htmlFor="email">{t("Role")}</label>
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
                      <label htmlFor="pass">{t("Address")}</label>
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
                      <label htmlFor="pass">{t("Aadhar Card Number")}</label>
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
                      <label htmlFor="pass">{t("Contact Number")}</label>
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
                      <label htmlFor="pass">{t("Zone")}</label>
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
                    {err ? (
                      <div className="text-red-500 text-sm md:col-span-5">
                        {err}
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => addWorkerHandler()}
                        >
                          {t("Submit")}
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
