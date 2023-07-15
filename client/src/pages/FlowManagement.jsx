import React, { useEffect, useState } from "react";
import { Header } from "../components";
import axios from "axios";
import {
  AiFillDelete,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
} from "react-icons/ai";
import ConfirmPopUp from "../components/Modal/ConfirmPopUp";
import EditFlowPopUp from "../components/Modal/EditFlowPopUp";
import { FiEdit } from "react-icons/fi";
import { RxDot } from "react-icons/rx";
import { managerRoute } from "../Contexts/ProtectedRoute";
import { useTranslation } from "react-i18next";

const FlowManagement = () => {
  const [category, setcategory] = useState({});
  const [selectedCategory, setselectedCategory] = useState({});
  const [flowDetails, setflowDetails] = useState();
  const [openConfirmPopUp, setopenConfirmPopUp] = useState(0);
  const [newCategory, setnewCategory] = useState("");
  const [reload, setreload] = useState(false);
  const [openAddCategory, setopenAddCategory] = useState(false);
  const [majorTaskPosition, setmajorTaskPosition] = useState(0);
  const [majorTaskStatement, setmajorTaskStatement] = useState("");
  const [majorTaskNote, setmajorTaskNote] = useState("");
  const [majorTaskIteration, setmajorTaskIteration] = useState("series");
  const [minorTaskPosition, setminorTaskPosition] = useState(0);
  const [minorTaskStatement, setminorTaskStatement] = useState("");
  const [minorTaskNote, setminorTaskNote] = useState("");
  const [openEditPopUp, setopenEditPopUp] = useState(false);
  const [editTaskDetails, seteditTaskDetails] = useState({});
  const [changeMinorTaskPosition, setchangeMinorTaskPosition] = useState({});
  const [majorErr, setmajorErr] = useState("");
  const [minorErr, setminorErr] = useState("");
  const { t } = useTranslation();

  const addMajorTaskHandler = async () => {
    if (!majorTaskStatement || !majorTaskIteration) {
      setmajorErr("Please fill all the details");
      return;
    }
    await axios.post(
      "https://adoptconnect.onrender.com/admin/adoption_flow/major/create",
      {
        childClassification: selectedCategory.childClassification,
        majorTaskPosition: parseInt(majorTaskPosition) + 1,
        majorTaskNote: majorTaskNote,
        majorTaskStatement: majorTaskStatement,
        iterationMethod: majorTaskIteration,
      }
    );
    setmajorTaskNote("");
    setmajorTaskPosition(0);
    setmajorTaskStatement("");
    changeCategory(selectedCategory.childClassification);
    setmajorErr("");
  };
  const addMinorTaskHandler = async () => {
    if (!minorTaskStatement) {
      setminorErr("Please fill all the details");
      return;
    }
    await axios.post(
      "https://adoptconnect.onrender.com/admin/adoption_flow/minor/create",
      {
        childClassification: selectedCategory.childClassification,
        majorTaskPosition: majorTaskPosition,
        minorTaskPosition: parseInt(minorTaskPosition) + 1,
        minorTaskNote: minorTaskNote,
        minorTaskStatement: minorTaskStatement,
      }
    );
    setminorTaskNote("");
    // setminorTaskPosition(0);
    // setmajorTaskPosition(0);
    setminorTaskStatement("");
    changeCategory(selectedCategory.childClassification);
    setminorErr("");
  };

  const addCategoryHandler = async () => {
    await axios.post(
      "https://adoptconnect.onrender.com/child/create_child_category",
      {
        childClassification: newCategory,
      }
    );
    setreload(!reload);
    setopenAddCategory(false);
  };

  const changeCategory = async (childClassification) => {
    const response = await axios.post(
      "https://adoptconnect.onrender.com/admin/adoption_flow/curr_flow",
      {
        childClassification: childClassification,
      }
    );
    if (response.data.reponse) {
      setflowDetails(response.data.reponse.majorTask);
    }
  };

  const minorTaskGoDownHandler = async (
    major,
    minor,
    minorIndex,
    majorIndex
  ) => {
    await axios.post(
      "https://adoptconnect.onrender.com/admin/adoption_flow/minor/delete",
      {
        childClassification: selectedCategory.childClassification,
        majorTaskPosition: majorIndex,
        minorTaskPosition: minorIndex,
      }
    );
    await axios.post(
      "https://adoptconnect.onrender.com/admin/adoption_flow/minor/create",
      {
        childClassification: selectedCategory.childClassification,
        majorTaskPosition: majorIndex,
        minorTaskPosition: parseInt(minorIndex) + 1,
        minorTaskNote: minor.minorTaskNote,
        minorTaskStatement: minor.minorTaskStatement,
      }
    );
    changeCategory(selectedCategory.childClassification);
  };

  const minorTaskGoUpHandler = async (major, minor, minorIndex, majorIndex) => {
    await axios.post(
      "https://adoptconnect.onrender.com/admin/adoption_flow/minor/delete",
      {
        childClassification: selectedCategory.childClassification,
        majorTaskPosition: majorIndex,
        minorTaskPosition: minorIndex,
      }
    );
    await axios.post(
      "https://adoptconnect.onrender.com/admin/adoption_flow/minor/create",
      {
        childClassification: selectedCategory.childClassification,
        majorTaskPosition: majorIndex,
        minorTaskPosition: parseInt(minorIndex) - 1,
        minorTaskNote: minor.minorTaskNote,
        minorTaskStatement: minor.minorTaskStatement,
      }
    );
    changeCategory(selectedCategory.childClassification);
  };

  useEffect(async () => {
    if (openConfirmPopUp == 1) {
      await axios.post(
        "https://adoptconnect.onrender.com/child/delete_child_category",
        {
          childClassification: selectedCategory.childClassification,
        }
      );
      setopenConfirmPopUp(0);
    }
    const response = await axios.get(
      "https://adoptconnect.onrender.com/child/get_child_category"
    );
    setcategory(response.data.response);
  }, [openConfirmPopUp, reload]);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
      {openEditPopUp ? (
        <EditFlowPopUp
          setopenEditPopUp={setopenEditPopUp}
          editTaskDetails={editTaskDetails}
          changeCategory={changeCategory}
        />
      ) : (
        ""
      )}
      <Header category={t("Apps")} title={t("Flow Management")} />
      {openConfirmPopUp == 3 ? (
        <ConfirmPopUp
          heading={"Delete the category"}
          message={"Are you sure you want to delete the category?"}
          setopenConfirmPopUp={setopenConfirmPopUp}
        />
      ) : (
        ""
      )}
      <ul className="flex flex-wrap items-center justify-center mb-6 text-gray-900 dark:text-white">
        {category &&
          category.length &&
          category.map((category) => (
            <li
              key={category._id}
              className={`mr-4 hover:bg-slate-200 ${
                selectedCategory && selectedCategory._id == category._id
                  ? "bg-sky-400 text-slate-100"
                  : "bg-slate-100"
              } px-7 rounded py-2 md:mr-6 cursor-pointer capitalize flex mb-5 justify-center items-center`}
            >
              <span
                onClick={() => {
                  changeCategory(category.childClassification);
                  setselectedCategory(category);
                }}
              >
                {t(`${category.childClassification}`)}
              </span>
              <button
                className="flex justify-center items-center text-red-500 p-2 ml-2 hover:bg-slate-50 rounded hover:text-red-400"
                onClick={() => {
                  changeCategory(category.childClassification);
                  setselectedCategory(category);
                  setopenConfirmPopUp(3);
                }}
              >
                <AiFillDelete size={20} />
              </button>
            </li>
          ))}
        <button
          className="h-12 w-12 flex justify-center items-center mb-5 text-xl rounded-full bg-slate-100 hover:bg-slate-200 cursor-pointer"
          onClick={() => setopenAddCategory(true)}
        >
          +
        </button>
      </ul>
      {openAddCategory ? (
        <div className="mb-3">
          <label htmlFor="category">{t("Add Category")}</label>
          <div className="grid grid-cols-2">
            <input
              type="text"
              name="category"
              id="category"
              className="h-10 border mt-2 rounded px-4 w-full bg-gray-50"
              value={newCategory}
              onChange={(e) => setnewCategory(e.target.value)}
              placeholder=""
            />
            <button
              className="bg-blue-400 hover:bg-blue-500 ml-2 mt-2 h-10 text-white font-bold w-3/4 py-2 px-4 rounded"
              onClick={() => addCategoryHandler()}
            >
              {t("Add")}
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      {selectedCategory && selectedCategory.childClassification ? (
        <div>
          <ol className="space-y-4 text-gray-500 list-decimal list-inside dark:text-gray-400 capitalize border-b-2 pb-4 mb-2">
            {flowDetails &&
              flowDetails.length &&
              flowDetails.map((major, majorIndex) => {
                return (
                  <span key={major._id}>
                    <div className="pb-2 mb-2 flex justify-between items-center hover:bg-slate-100 rounded p-1">
                      <span className="flex mb-2 flex justify-between items-center hover:bg-slate-100 rounded p-1">
                        <span className="pr-2 flex justify-center items-center">
                          {majorIndex + 1}.
                        </span>
                        {t(`${major.majorTaskStatement}`)}
                        <div className="text-sm flex items-center pl-2">
                          {major.majorTaskNote
                            ? `(${major.majorTaskNote})`
                            : ""}
                        </div>
                      </span>
                      <span
                        className="hover:text-slate-500 cursor-pointer p-1"
                        onClick={() => {
                          seteditTaskDetails({
                            minorTask: false,
                            majorTask: true,
                            statement: major.majorTaskStatement,
                            note: major.majorTaskNote,
                            majorIndex: majorIndex,
                            childClassification:
                              selectedCategory.childClassification,
                            iterationMethod: major.iterationMethod,
                          });
                          setopenEditPopUp(true);
                        }}
                      >
                        <FiEdit />
                      </span>
                    </div>
                    {major.minorTask && major.minorTask.length ? (
                      <ul className="pl-5 mt-2 space-y-1 list-disc list-inside">
                        {major.minorTask.map((minor, minorIndex) => {
                          return (
                            <li
                              key={minor._id}
                              className="flex justify-between items-center hover:bg-slate-100 rounded p-1"
                            >
                              <span className="flex">
                                <span className="pr-2 flex justify-center items-center">
                                  <RxDot size={20} />
                                </span>
                                {t(`${minor.minorTaskStatement}`)}
                                <span className="text-sm">
                                  {minor.minorTaskNote
                                    ? `(${minor.minorTaskNote})`
                                    : ""}
                                </span>
                              </span>
                              <span className="flex">
                                <span className="flex flex-end items-center mr-3">
                                  {minorIndex !== 0 ? (
                                    <span
                                      className="p-1 mr-2 rounded-full hover:bg-slate-200 cursor-pointer"
                                      onClick={() => {
                                        minorTaskGoUpHandler(
                                          major,
                                          minor,
                                          minorIndex,
                                          majorIndex
                                        );
                                      }}
                                    >
                                      <AiOutlineArrowUp />
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                  {minorIndex !== major.minorTask.length - 1 ? (
                                    <span
                                      className="p-1 mr-2 rounded-full hover:bg-slate-200 cursor-pointer"
                                      onClick={() =>
                                        minorTaskGoDownHandler(
                                          major,
                                          minor,
                                          minorIndex,
                                          majorIndex
                                        )
                                      }
                                    >
                                      <AiOutlineArrowDown />
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </span>
                                <span
                                  className="hover:text-slate-500 cursor-pointer p-1"
                                  onClick={() => {
                                    seteditTaskDetails({
                                      minorTask: true,
                                      majorTask: false,
                                      statement: minor.minorTaskStatement,
                                      note: minor.minorTaskNote,
                                      majorIndex: majorIndex,
                                      minorIndex: minorIndex,
                                      childClassification:
                                        selectedCategory.childClassification,
                                    });
                                    setopenEditPopUp(true);
                                  }}
                                >
                                  <FiEdit />
                                </span>
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      ""
                    )}
                  </span>
                );
              })}
          </ol>
          <div className="mt-5">
            <div className="text-lg font-bold mb-3">
              {t("Add new Major Task")}
            </div>
            {flowDetails && flowDetails.length ? (
              <div className="md:col-span-5">
                <div className="text-sm py-1">
                  {t("Select before which major task to add")}
                </div>
                <select
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  onChange={(e) => {
                    setmajorTaskPosition(e.target.value);
                  }}
                >
                  {flowDetails.map((majorTask, index) => {
                    return (
                      <option key={index} value={index}>
                        {t(`${majorTask.majorTaskStatement}`)}
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : (
              <div className="text-md py-2">
                {t("Add your first major task")}
              </div>
            )}
            <div className="md:col-span-5 mt-3">
              <label htmlFor="full_name" className="text-sm">
                {t("Major Task Statement")}
              </label>
              <input
                type="text"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={majorTaskStatement}
                onChange={(e) => setmajorTaskStatement(e.target.value)}
              />
            </div>
            <div className="md:col-span-5 mt-3">
              <label htmlFor="full_name" className="text-sm">
                {t("Major Task Iteration Type")}
              </label>
              <select
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                onChange={(e) => setmajorTaskIteration(e.target.value)}
              >
                <option value="">{t("Please select one")}</option>
                <option value="series">{t("Series")}</option>
                <option value="parallel">{t("Parallel")}</option>
              </select>
            </div>
            <div className="md:col-span-5 mt-3">
              <label htmlFor="full_name" className="text-sm">
                {t("Major Task Note")}
              </label>
              <input
                type="text"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={majorTaskNote}
                onChange={(e) => setmajorTaskNote(e.target.value)}
              />
            </div>
            {majorErr ? (
              <div className="text-sm text-red-500">majorErr</div>
            ) : (
              ""
            )}
            <div className="md:col-span-5 text-right">
              <div className="inline-flex items-end">
                <button
                  className="bg-blue-500 hover:bg-blue-700 mt-3 w-56 text-white font-bold py-2 px-4 rounded"
                  onClick={() => addMajorTaskHandler()}
                >
                  {t("Add Major Task")}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="text-lg font-bold mb-3">{"Add new Minor Task"}</div>
            {flowDetails && flowDetails.length ? (
              <div className="md:col-span-5">
                <div className="text-sm py-1">
                  {t("Select major task to add to it")}
                </div>
                <select
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  onChange={(e) => setmajorTaskPosition(e.target.value)}
                >
                  {flowDetails.map((majorTask, index) => {
                    return (
                      <option key={index} value={index}>
                        {t(`${majorTask.majorTaskStatement}`)}
                      </option>
                    );
                  })}
                </select>
                {flowDetails[majorTaskPosition].minorTask &&
                flowDetails[majorTaskPosition].minorTask.length ? (
                  <div className="md:col-span-5">
                    <div className="text-sm py-1">
                      {t("Select before which minor task to add")}
                    </div>
                    <select
                      className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                      onChange={(e) => setminorTaskPosition(e.target.value)}
                    >
                      {flowDetails[majorTaskPosition].minorTask.map(
                        (minorTask, index) => {
                          return (
                            <option key={index} value={index}>
                              {t(`${minorTask.minorTaskStatement}`)}
                            </option>
                          );
                        }
                      )}
                    </select>
                  </div>
                ) : (
                  <div className="text-md mt-2 py-2">
                    {t("Add your first minor task")}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-md py-2">{t("Add a major task first")}</div>
            )}
            <div className="md:col-span-5 mt-3">
              <label htmlFor="full_name" className="text-sm">
                {t("Minor Task Statement")}
              </label>
              <input
                type="text"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={minorTaskStatement}
                onChange={(e) => setminorTaskStatement(e.target.value)}
                disabled={!flowDetails || !flowDetails.length}
              />
            </div>
            <div className="md:col-span-5 mt-3">
              <label htmlFor="full_name" className="text-sm">
                {t("Minor Task Note")}
              </label>
              <input
                type="text"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={minorTaskNote}
                onChange={(e) => setminorTaskNote(e.target.value)}
                disabled={!flowDetails || !flowDetails.length}
              />
            </div>
            {minorErr ? (
              <div className="text-sm text-red-500">{minorErr}</div>
            ) : (
              ""
            )}
            <div className="md:col-span-5 text-right">
              <div className="inline-flex items-end">
                <button
                  className={`bg-blue-500 hover:bg-blue-700 mt-3 w-56 text-white font-bold py-2 px-4 rounded ${
                    !flowDetails || !flowDetails.length
                      ? "cursor-not-allower"
                      : "cursor-pointer"
                  }`}
                  onClick={() => addMinorTaskHandler()}
                  disabled={!flowDetails || !flowDetails.length}
                >
                  {t("Add Minor Task")}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default managerRoute(FlowManagement);
