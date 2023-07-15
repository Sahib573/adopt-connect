import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { ImCross } from "react-icons/im";
import { useTranslation } from "react-i18next";

const MissingReport = ({ childDetails, setshowMissingReport, imageUrl }) => {
  const { t } = useTranslation();

  const generatePDF = () => {
    const component = document.getElementById("missing-report-component");
    html2canvas(component).then((canvas) => {
      const componentRect = component.getBoundingClientRect();
      const pdfWidth = componentRect.width;
      const pdfHeight = componentRect.height;
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: pdfWidth > pdfHeight ? "landscape" : "portrait",
        unit: "px",
        format: [pdfWidth, pdfHeight],
      });
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("missing_report.pdf");
      setshowMissingReport(false);
    });
  };

  return (
    <div className="z-50 h-screen w-screen fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center overflow-y-hidden">
      <div className="h-5/6 p-6 bg-gray-100 flex flex-col items-center justify-center rounded-lg">
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
          <div className="flex justify-end items-center p-2">
            <button
              className="hover:text-slate-500"
              onClick={() => setshowMissingReport(false)}
            >
              <ImCross />
            </button>
          </div>
          <div className="" id="missing-report-component">
            <div className="font-bold text-4xl py-5 bg-slate-200 flex justify-center items-center">
              MISSING
            </div>
            <div className="grid grid-cols-2">
              <div>
                <img src={imageUrl} className="h-56 w-56 border-4" />
              </div>
              <div className="text-lg pt-2">
                <div>
                  <span className="font-semibold">{t("Name")} :</span>{" "}
                  {childDetails && childDetails.childName}
                </div>
                <div>
                  <span className="font-semibold">{t("Date of Birth")} :</span>{" "}
                  {childDetails && childDetails.dateOfBirth}
                </div>
                <div>
                  <span className="font-semibold">{t("Gender")} :</span>{" "}
                  {childDetails && childDetails.gender}
                </div>
                <div>
                  <span className="font-semibold">{t("Age")} :</span>{" "}
                  {childDetails && childDetails.age}
                </div>
                <div>
                  <span className="font-semibold">{t("State")} :</span>{" "}
                  {childDetails && childDetails.district},
                  {childDetails && childDetails.state}
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full bg-slate-200 p-3">
              <div>
                <span className="font-semibold">{t("Contact")} :</span> +91
                99309 86400
              </div>
              <div>
                <span className="font-semibold">{t("Email")} :</span>{" "}
                info@balashatrust.org
              </div>
              <div>
                Anand Niketan KGVM, Dr Elijah Moses Rd,
                Mahalakshmi,Mumbai,Maharashtra 400011
              </div>
            </div>
          </div>
        </div>
        <button
          className="text-white py-2 px-4 mb-7 mr-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 capitalize"
          onClick={() => generatePDF()}
        >
          {t("Download Missing Report")}
        </button>
      </div>
    </div>
  );
};

export default MissingReport;
