import React, { useEffect, useState } from "react";
import { Header } from "../components";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import axios from "axios";
import PopUp from "../components/Modal/PopUp";
import UpdateChildPopUp from "../components/Modal/UpdateChildPopUp";
import { useTranslation } from "react-i18next";
import { MdDelete } from "react-icons/md";
import ConfirmPopUp from "../components/Modal/ConfirmPopUp";
import MissingReport from "../components/Modal/MissingReport";

const ChildDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const childId = location.search.substring(4);
  const [childDetails, setchildDetails] = useState({});
  const [allWorkers, setallWorkers] = useState();
  const [selectedWorker, setselectedWorker] = useState();
  const [openPopUp, setopenPopUp] = useState(false);
  const [popUpDetails, setpopUpDetails] = useState({});
  const [openEditDetails, setopenEditDetails] = useState(false);
  const [imageUrl, setimageUrl] = useState("");
  const [allDocuments, setallDocuments] = useState({});
  const [openConfirmPopUp, setopenConfirmPopUp] = useState(0);
  const [dltDocId, setdltDocId] = useState();
  const [showMissingReport, setshowMissingReport] = useState(false);
  const { t } = useTranslation();
  const user = JSON.parse(localStorage.getItem("userDetails"));

  const updatementorHandler = async () => {
    const response = await axios.post(
      "https://adoptconnect.onrender.com/admin/addchildtoworker",
      {
        child_id: childDetails.child_id,
        user_id: selectedWorker,
      }
    );
    if (response.data.response) {
      setpopUpDetails({
        status: true,
        message: "Worker succesfully updated",
        heading: "Success",
      });
    } else {
      setpopUpDetails({
        status: false,
        message: "Please select a worker to update",
        heading: "Failure",
      });
    }
    setopenPopUp(true);
  };

  const downloadDocumentHandler = async (docId) => {
    const response = await axios.post(
      "https://adoptconnect.onrender.com/child/document/download",
      {
        child_id: childId,
        docId: docId,
      }
    );
    const fileName = response.data.name;
    const url = window.URL.createObjectURL(new Blob([response.data.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${fileName}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  useEffect(async () => {
    if (openConfirmPopUp === 1) {
      await axios.post(
        "https://adoptconnect.onrender.com/child/document/files/delete",
        {
          child_id: childId,
          docId: dltDocId,
        }
      );
      setopenConfirmPopUp(0);
    } else {
      const response = await axios.post(
        "https://adoptconnect.onrender.com/child/get_image",
        {
          child_id: childId,
        }
      );
      if (response.data && response.data.response) {
        const uint8Array = new Uint8Array(response.data.response.data);
        const blob = new Blob([uint8Array]);
        setimageUrl(URL.createObjectURL(blob));
      }
      const response2 = await axios.get(
        "https://adoptconnect.onrender.com/admin/all_workers"
      );
      setallWorkers(response2.data.response);
      const response3 = await axios.post(
        "https://adoptconnect.onrender.com/child/getchild",
        {
          child_id: childId,
        }
      );
      setchildDetails(response3.data.response);
      const response4 = await axios.post(
        "https://adoptconnect.onrender.com/child/document/getbychildid",
        {
          child_id: childId,
        }
      );
      setallDocuments(response4.data.response);
    }
  }, [openEditDetails, openConfirmPopUp]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
      {openConfirmPopUp == 3 ? (
        <ConfirmPopUp
          message={"Are you sure you want to delete this document"}
          heading={"Delete Document"}
          setopenConfirmPopUp={setopenConfirmPopUp}
        />
      ) : (
        ""
      )}
      {showMissingReport ? (
        <MissingReport
          childDetails={childDetails}
          setshowMissingReport={setshowMissingReport}
          imageUrl={imageUrl}
        />
      ) : (
        ""
      )}
      <div className="flex justify-start items-center mb-7">
        <button
          className="hover:text-slate-500"
          onClick={() => {
            if (user && user.category !== "worker") navigate("/cases");
            else navigate("/child-alloted");
          }}
        >
          <FaArrowLeft />
        </button>
      </div>
      {openEditDetails ? (
        <UpdateChildPopUp
          childDetails={childDetails}
          setopenEditDetails={setopenEditDetails}
        />
      ) : (
        ""
      )}
      {openPopUp ? (
        <PopUp
          setopenPopUp={setopenPopUp}
          status={popUpDetails.status}
          message={popUpDetails.message}
          heading={popUpDetails.heading}
        />
      ) : (
        ""
      )}
      <Header title={t("Child Details")} />
      <div className="p-8 bg-white mt-16 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 pt-10">
          <div className="relative">
            <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              {imageUrl ? (
                <img src={imageUrl} className="h-48 w-48 rounded-full" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
            <div>
              <p className="font-bold text-gray-700 text-md">
                {childDetails && childDetails.child_id}
              </p>
              <p className="text-gray-400">{t("Child ID")}</p>
            </div>
            <div>
              <p className="font-bold text-gray-700 text-md capitalize">
                {childDetails && childDetails.caseStatus}
              </p>
              <p className="text-gray-400">{t("Status")}</p>
            </div>
            <div>
              <p className="font-bold text-gray-700 text-md capitalize">
                {childDetails && childDetails.childClassification}
              </p>
              <p className="text-gray-400">{t("Classification")}</p>
            </div>
          </div>
          <div className="flex justify-between text-md mt-32 md:mt-0 md:justify-center">
            <button
              className="text-white py-2 px-4 mr-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 capitalize"
              onClick={() => setshowMissingReport(true)}
            >
              {t("Generate Missing Report")}
            </button>
            <button
              className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 capitalize"
              onClick={() => setopenEditDetails(true)}
            >
              {t("Edit Details")}
            </button>
          </div>
        </div>
        <div className="mt-20 text-center border-b pb-12">
          <h1 className="text-4xl font-medium text-gray-700">
            {childDetails && childDetails.childName}{" "}
          </h1>
          <p className="font-light text-lg text-gray-600 mt-3">
            {childDetails && childDetails.shelterHome}
          </p>
          <p className="mt-8 text-gray-500">
            {childDetails && childDetails.district},{" "}
            {childDetails && childDetails.state}
          </p>
        </div>
        <div className="mt-12 flex flex-col">
          {user &&
          user.category !== "worker" &&
          allWorkers &&
          allWorkers.length ? (
            <div>
              <p className="flex justify-start sm:px-16 mt-5 items-center">
                <span className="font-semibold pr-5">
                  {t("Mentor Assigned")} :{" "}
                </span>
                <select
                  className="h-10 border mt-1 rounded px-4 w-1/3 bg-gray-50 ml-5 capitalize"
                  onChange={(e) => setselectedWorker(e.target.value)}
                >
                  <option value="">
                    {childDetails && childDetails.worker_alloted
                      ? childDetails.worker_alloted.name
                      : `${t("Please Select")}`}
                  </option>
                  {allWorkers.map((item) => {
                    if (
                      childDetails.worker_alloted &&
                      childDetails.worker_alloted.user_id === item.user_id
                    )
                      return "";
                    else
                      return <option value={item.user_id}>{item.name}</option>;
                  })}
                </select>
                <button
                  className="text-slate-100 ml-5 hover:bg-green-300 cursor-pointer flex justify-center items-center bg-green-400 px-6 h-10 rounded"
                  onClick={() => updatementorHandler()}
                >
                  <FaSave size={25} />
                  <span className="pl-3 text-lg">{t("Save")}</span>
                </button>
              </p>
            </div>
          ) : (
            ""
          )}
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-4">
            {t("Age")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails && childDetails.age}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-4">
            {t("Date of Birth")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails && childDetails.dateOfBirth}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-4">
            {t("Recommended For Adoption")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails && childDetails.recommendedForAdoption}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-4">
            {t("Linked with SAA")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails && childDetails.linkedWithSAA}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2  py-4">
            {t("Case History")} :
            <span className="text-slate-600 font-light py-4 pb-5 p-1">
              {childDetails && childDetails.caseHistory}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-4">
            {t("Inquiry Date Of Admission")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails && childDetails.inquiryDateOfAdmission}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-4">
            {t("Reason For Admission")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails && childDetails.reasonForAdmission}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-4">
            {t("Last Visit")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails && childDetails.lastVisit}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-4">
            {t("Last Call")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails && childDetails.lastCall}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-4">
            {t("Guardian")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails && childDetails.guardianListed}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-4">
            {t("Last Family Visit Phone Call")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails && childDetails.familyVisitPhoneCall}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-4">
            {t("Number Of Siblings")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails && childDetails.siblings}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-4">
            {t("Last Date Of CWC Order")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails && childDetails.lastDateOfCWCOrder}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-4">
            {t("Last CWC Order")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails && childDetails.Lastcwcorder}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-4">
            {t("Time of stay in shelter")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails && childDetails.lengthOfStayInShelter}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-4">
            {t("CARINGS Registration Number")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails && childDetails.caringsRegistrationNumber}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-4">
            {t("Date LFA, CSR, MERU uploaded in CARINGS")} :{" "}
            <span className="text-slate-600 font-light">
              {childDetails && childDetails.dateLFA_CSR_MERUUploadedINCARINGS}
            </span>
          </p>
          <p className="text-gray-800 font-bold p-1 lg:mx-16 border-b-2 py-4">
            {t("All uploaded Documents")} :{" "}
            {allDocuments && allDocuments.length
              ? allDocuments.map((document) => {
                  return (
                    <div
                      className="text-slate-600 font-light p-2 mt-1 hover:bg-slate-100 rounded flex justify-between items-center"
                      key={document.docId}
                    >
                      <span
                        className="hover:underline cursor-pointer"
                        onClick={() => downloadDocumentHandler(document.docId)}
                      >
                        {document.name}
                      </span>
                      <span
                        className="text-red-500 cursor-pointer hover:text-red-400"
                        onClick={() => {
                          setdltDocId(document.docId);
                          setopenConfirmPopUp(3);
                        }}
                      >
                        <MdDelete size={25} />
                      </span>
                    </div>
                  );
                })
              : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChildDetails;
