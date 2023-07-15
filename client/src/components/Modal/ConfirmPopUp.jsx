import React from "react";
import { BiErrorCircle } from "react-icons/bi";
import { useTranslation } from "react-i18next";

export default function ConfirmPopUp({
  message,
  heading,
  setopenConfirmPopUp,
}) {
  const { t } = useTranslation();
  return (
    <div className="z-50 h-screen w-screen fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center overflow-y-hidden">
      <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
        <div>
          <div>
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
              <BiErrorCircle size={20} />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {t(`${heading}`)}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{t(`${message}`)}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="mt-5 mr-1 sm:mt-6">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 sm:text-sm"
                onClick={() => {
                  setopenConfirmPopUp(1);
                }}
              >
                {t("Confirm")}
              </button>
            </div>
            <div className="mt-5 ml-1 sm:mt-6">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 sm:text-sm"
                onClick={() => {
                  setopenConfirmPopUp(2);
                }}
              >
                {t("Refuse")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
