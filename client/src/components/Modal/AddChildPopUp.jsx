import axios from "axios";
import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import { useTranslation } from "react-i18next";

export default function AddChildPopUp({ setopenAddchild }) {
  const [child_id, setchild_id] = useState("");
  const [childName, setchildName] = useState();
  const [age, setage] = useState();
  const [gender, setgender] = useState("male");
  const [dateOfBirth, setdateOfBirth] = useState();
  const [state, setstate] = useState("");
  const [district, setdistrict] = useState();
  const [shelterHome, setshelterHome] = useState();
  const [linkedWithSAA, setlinkedWithSAA] = useState("yes");
  const [childClassification, setchildClassification] = useState("Abandoned");
  const [inquiryDateOfAdmission, setinquiryDateOfAdmission] = useState();
  const [reasonForAdmission, setreasonForAdmission] = useState();
  const [lastVisit, setlastVisit] = useState();
  const [lastCall, setlastCall] = useState();
  const [caseHistory, setcaseHistory] = useState();
  const [guardianListed, setguardianListed] = useState();
  const [familyVisitPhoneCall, setfamilyVisitPhoneCall] = useState();
  const [siblings, setsiblings] = useState();
  const [lastDateOfCWCOrder, setlastDateOfCWCOrder] = useState();
  const [Lastcwcorder, setLastcwcorder] = useState();
  const [lengthOfStayInShelter, setlengthOfStayInShelter] = useState();
  const [caringsRegistrationNumber, setcaringsRegistrationNumber] = useState();
  const [
    dateLFA_CSR_MERUploadedINCARINGS,
    setdateLFA_CSR_MERUploadedINCARINGS,
  ] = useState();
  const [contactNo, setcontactNo] = useState();
  const [avatar, setavatar] = useState();
  const [extraDocument, setextraDocument] = useState();
  const [createdByUser, setcreatedByUser] = useState("Bal Asha Trust");
  const [err, seterr] = useState("");
  const { t } = useTranslation();

  const addchildHandler = async () => {
    if (!child_id || !childName || !shelterHome || !childClassification) {
      seterr("Please fill all the details");
      return;
    }
    await axios.post("https://adoptconnect.onrender.com/child/create_child", {
      child_id: child_id,
      childName: childName,
      age: age,
      gender: gender,
      dateOfBirth: dateOfBirth,
      state: state,
      district: district,
      shelterHome: shelterHome,
      linkedWithSAA: linkedWithSAA,
      childClassification: childClassification,
      inquiryDateOfAdmission: inquiryDateOfAdmission,
      reasonForAdmission: reasonForAdmission,
      lastVisit: lastVisit,
      lastCall: lastCall,
      caseHistory: caseHistory,
      caseStatus: "inactive",
      guardianListed: guardianListed,
      familyVisitPhoneCall: familyVisitPhoneCall,
      siblings: siblings,
      lastDateOfCWCOrder: lastDateOfCWCOrder,
      Lastcwcorder: Lastcwcorder,
      lengthOfStayInShelter: lengthOfStayInShelter,
      caringsRegistrationNumber: caringsRegistrationNumber,
      dateLFA_CSR_MERUploadedINCARINGS: dateLFA_CSR_MERUploadedINCARINGS,
      contact_no: contactNo,
      createdByUser: createdByUser,
      createdDate: new Date().toISOString().slice(0, 10),
    });

    const formData = new FormData();
    formData.append("file", avatar);
    formData.append("child_id", child_id);
    await axios.post(
      "https://adoptconnect.onrender.com/child/image_upload",
      formData
    );

    const docformData = new FormData();
    docformData.append("file", extraDocument);
    docformData.append("child_id", child_id);
    await axios.post(
      "https://adoptconnect.onrender.com/child/document/upload",
      docformData
    );
    setopenAddchild(false);
  };

  return (
    <div className="z-50 h-screen w-screen fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center overflow-y-hidden">
      <div className="h-5/6 p-6 bg-gray-100 flex items-center justify-center rounded-lg">
        <div className="h-full container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl flex justify-between items-center text-gray-600 mb-5">
              <div>{t("Add New Case")}</div>
              <div>
                <button
                  className="hover:text-slate-500"
                  onClick={() => setopenAddchild(false)}
                >
                  <ImCross />
                </button>
              </div>
            </h2>
            <div className="h-128 overflow-y-scroll bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                  <p className="font-medium text-lg">{t("Case Details")}</p>
                  <p>{t("Please fill out all the fields")}.</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5 flex flex-col mb-2">
                      <label htmlFor="full_name" className="pb-2">
                        {t("Child Image")}
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
                      <label htmlFor="full_name">
                        {t("Child ID")}
                        <span className="text-red-500 pl-1">*</span>
                      </label>
                      <input
                        type="text"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={child_id}
                        onChange={(e) => setchild_id(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="email">
                        {t("Child Name")}
                        <span className="text-red-500 pl-1">*</span>
                      </label>
                      <input
                        type="text"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={childName}
                        onChange={(e) => setchildName(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="email">{t("Gender")}</label>
                      <select
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        onChange={(e) => setgender(e.target.value)}
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div className="md:col-span-1">
                      <label htmlFor="address">{t("Age")}</label>
                      <input
                        type="text"
                        id="address"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={age}
                        onChange={(e) => setage(e.target.value)}
                        placeholder=""
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="address">{t("Date of Birth")}</label>
                      <input
                        type="date"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={dateOfBirth}
                        onChange={(e) => setdateOfBirth(String(e.target.value))}
                        placeholder=""
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="address">
                        {t("Shelter Home")}
                        <span className="text-red-500 pl-1">*</span>
                      </label>
                      <input
                        type="text"
                        id="address"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={shelterHome}
                        onChange={(e) => setshelterHome(e.target.value)}
                        placeholder=""
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label htmlFor="email">{t("Created by Trust")}</label>
                      <select
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        onChange={(e) => setcreatedByUser(e.target.value)}
                      >
                        <option value="Bal Asha Trust">Bal Asha Trust</option>
                        <option value="WAIC SU">WAIC SU</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="email">
                        {t("Inquiry Date of Admission")}
                      </label>
                      <input
                        type="date"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={inquiryDateOfAdmission}
                        onChange={(e) =>
                          setinquiryDateOfAdmission(String(e.target.value))
                        }
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label htmlFor="address">{t("Address / Street")}</label>
                      <input
                        type="text"
                        id="address"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={state}
                        onChange={(e) => setstate(e.target.value)}
                        placeholder=""
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="city">{t("City")}</label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={district}
                        onChange={(e) => setdistrict(e.target.value)}
                        placeholder=""
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="email">{t("Linked With SAA")}</label>
                      <select
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        onChange={(e) => setlinkedWithSAA(e.target.value)}
                      >
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div className="md:col-span-3">
                      <label htmlFor="email">
                        {t("Child Classification")}
                        <span className="text-red-500 pl-1">*</span>
                      </label>
                      <select
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        onChange={(e) => setchildClassification(e.target.value)}
                      >
                        <option value="Abandoned">Abandoned</option>
                        <option value="Surrendered">Surrendered</option>
                        <option value="Orphaned">Orphaned</option>
                        <option value="Admitted-by-guardians">
                          Admitted by Guardians
                        </option>
                      </select>
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="email">{t("Reason for admission")}</label>
                      <input
                        type="text"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={reasonForAdmission}
                        onChange={(e) =>
                          setreasonForAdmission(String(e.target.value))
                        }
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="email">{t("Case History")}</label>
                      <input
                        type="text"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={caseHistory}
                        onChange={(e) => setcaseHistory(String(e.target.value))}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label htmlFor="email">{t("Last Visit")}</label>
                      <input
                        type="date"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={lastVisit}
                        onChange={(e) => setlastVisit(String(e.target.value))}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="email">{t("Last Call")}</label>
                      <input
                        type="date"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={lastCall}
                        onChange={(e) => setlastCall(String(e.target.value))}
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="email">{t("Guardian Listed")}</label>
                      <input
                        type="text"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={guardianListed}
                        onChange={(e) =>
                          setguardianListed(String(e.target.value))
                        }
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label htmlFor="email">{t("Family Phone Call")}</label>
                      <input
                        type="date"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={familyVisitPhoneCall}
                        onChange={(e) =>
                          setfamilyVisitPhoneCall(String(e.target.value))
                        }
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="email">{t("Number of siblings")}</label>
                      <input
                        type="text"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={siblings}
                        onChange={(e) => setsiblings(String(e.target.value))}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label htmlFor="email">
                        {t("Last Date of CWC order")}
                      </label>
                      <input
                        type="date"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={lastDateOfCWCOrder}
                        onChange={(e) =>
                          setlastDateOfCWCOrder(String(e.target.value))
                        }
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="email">{t("Last CWC order")}</label>
                      <input
                        type="text"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={Lastcwcorder}
                        onChange={(e) =>
                          setLastcwcorder(String(e.target.value))
                        }
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="email">
                        {t("Length of Stay in Shelter")}
                      </label>
                      <input
                        type="text"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={lengthOfStayInShelter}
                        onChange={(e) =>
                          setlengthOfStayInShelter(String(e.target.value))
                        }
                      />
                    </div>
                    <div className="md:col-span-3">
                      <label htmlFor="email">
                        {t("CARINGS Registration Number")}
                      </label>
                      <input
                        type="text"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={caringsRegistrationNumber}
                        onChange={(e) =>
                          setcaringsRegistrationNumber(String(e.target.value))
                        }
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="email">
                        {t("FA CSR MERU Upload Date")}
                      </label>
                      <input
                        type="date"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={dateLFA_CSR_MERUploadedINCARINGS}
                        onChange={(e) =>
                          setdateLFA_CSR_MERUploadedINCARINGS(
                            String(e.target.value)
                          )
                        }
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="email">{t("Contact Number")}</label>
                      <input
                        type="text"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={contactNo}
                        onChange={(e) => setcontactNo(String(e.target.value))}
                      />
                    </div>
                    <div className="md:col-span-5 flex flex-col mb-2">
                      <label htmlFor="full_name" className="pb-2">
                        {t("Documents")}
                      </label>
                      <input
                        type="file"
                        onChange={(e) => setextraDocument(e.target.files[0])}
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
                          onClick={() => addchildHandler()}
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
