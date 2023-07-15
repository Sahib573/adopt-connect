import axios from "axios";
import React, { useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { ImCross } from "react-icons/im";
import { useTranslation } from "react-i18next";

export default function EditFlowPopUp({
  editTaskDetails,
  changeCategory,
  setopenEditPopUp,
}) {
  const [taskStatement, settaskStatement] = useState(editTaskDetails.statement);
  const [taskNote, settaskNote] = useState(editTaskDetails.note);
  const [iteration, setiteration] = useState(editTaskDetails.iterationMethod);
  const { t } = useTranslation();

  const saveTaskHandler = async () => {
    if (editTaskDetails.minorTask) {
      await axios.post(
        "https://adoptconnect.onrender.com/admin/adoption_flow/minor/update",
        {
          childClassification: editTaskDetails.childClassification,
          minorTaskStatement: taskStatement,
          minorTaskNote: taskNote,
          majorTaskPosition: editTaskDetails.majorIndex,
          minorTaskPosition: editTaskDetails.minorIndex,
        }
      );
      changeCategory(editTaskDetails.childClassification);
      setopenEditPopUp(false);
    }
    if (editTaskDetails.majorTask) {
      await axios.post(
        "https://adoptconnect.onrender.com/admin/adoption_flow/major/update",
        {
          childClassification: editTaskDetails.childClassification,
          majorTaskStatement: taskStatement,
          majorTaskNote: taskNote,
          majorTaskPosition: editTaskDetails.majorIndex,
          iterationMethod: iteration,
        }
      );
      changeCategory(editTaskDetails.childClassification);
      setopenEditPopUp(false);
    }
  };

  const deleteTaskHandler = async () => {
    if (editTaskDetails.minorTask) {
      await axios.post(
        "https://adoptconnect.onrender.com/admin/adoption_flow/minor/delete",
        {
          childClassification: editTaskDetails.childClassification,
          majorTaskPosition: editTaskDetails.majorIndex,
          minorTaskPosition: editTaskDetails.minorIndex,
        }
      );
      changeCategory(editTaskDetails.childClassification);
      setopenEditPopUp(false);
    }
    if (editTaskDetails.majorTask) {
      await axios.post(
        "https://adoptconnect.onrender.com/admin/adoption_flow/major/delete",
        {
          childClassification: editTaskDetails.childClassification,
          deletePosition: editTaskDetails.majorIndex,
        }
      );
      changeCategory(editTaskDetails.childClassification);
      setopenEditPopUp(false);
    }
  };

  return (
    <div className="z-50 h-screen w-screen fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center overflow-y-hidden">
      <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
        <div className="">
          <div
            className="flex justify-end items-center hover:text-slate-400 cursor-pointer"
            onClick={() => setopenEditPopUp(false)}
          >
            <ImCross />
          </div>
          <div>
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100">
              <BiErrorCircle size={20} />
            </div>
            <div className="mt-3 text-center font-semibold">
              Update {editTaskDetails.minorTask ? "Minor" : "Major"} Task
              statement
            </div>
            <div className="mt-3 sm:mt-5">
              <label htmlFor="full_name" className="text-sm">
                {t("Task Statement")}
              </label>
              <input
                type="text"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={taskStatement}
                onChange={(e) => settaskStatement(e.target.value)}
              />
              <label htmlFor="full_name" className="text-sm">
                {t("Task Note")}
              </label>
              <input
                type="text"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={taskNote}
                onChange={(e) => settaskNote(e.target.value)}
              />
              {editTaskDetails.majorTask ? (
                <span>
                  <label htmlFor="full_name" className="text-sm">
                    {t(" Iteration Method")}
                  </label>
                  <select
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    onChange={(e) => setiteration(e.target.value)}
                  >
                    <option value="series">{t("Series")}</option>
                    <option value="parallel">{t("Parallel")}</option>
                  </select>
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="mt-5 mr-1 sm:mt-6">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 sm:text-sm"
                onClick={() => saveTaskHandler()}
              >
                {t("Save Task")}
              </button>
            </div>
            <div className="mt-5 ml-1 sm:mt-6">
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 sm:text-sm"
                onClick={() => deleteTaskHandler()}
              >
                {t("Delete Task")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
