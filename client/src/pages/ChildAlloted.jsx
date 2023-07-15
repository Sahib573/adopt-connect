import React, { useState, useEffect } from "react";
import { Header } from "../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

const ChildAlloted = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userDetails"));
  const [childAlloted, setchildAlloted] = useState();
  const { t } = useTranslation();

  useEffect(async () => {
    if (!user) return;
    const response = await axios.post(
      "https://adoptconnect.onrender.com/users/get_allocated_children",
      {
        user_id: user.user_id,
      }
    );
    setchildAlloted(response.data.response);
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
      <Header category={t("App")} title={t("Child Details")} />
      <div className="mt-12 flex flex-col justify-center">
        {childAlloted &&
        childAlloted.alloted_children &&
        childAlloted.alloted_children.length ? (
          <div className="pl-3 text-lg font-bold">{t("Child Allocated")}</div>
        ) : (
          ""
        )}
        <ul className="w-full divide-y divide-gray-200 dark:divide-gray-700 ">
          {childAlloted &&
            childAlloted.alloted_children &&
            childAlloted.alloted_children.map((child) => {
              return (
                <li
                  className="py-2 my-2 sm:py-4 capitalize mt-2 cursor-pointer hover:bg-slate-100 px-3 rounded"
                  onClick={() =>
                    navigate(`/child-details?id=${child.child_id}`)
                  }
                >
                  <div className="flex items-center space-x-4 capitalize">
                    <div className="flex-shrink-0">
                      {child.avatar ? (
                        <img
                          className="w-10 h-10 rounded-full"
                          src={
                            child.avatar &&
                            URL.createObjectURL(
                              new Blob([new Uint8Array(child.avatar.data)])
                            )
                          }
                          alt="avt"
                        />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-10 w-10"
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
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {child.childName}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {child.shelterHome}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-sm text-base font-semibold text-gray-900 dark:text-white">
                      <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
                        <p>
                          {child.caseStatus == "completed" ? (
                            <p className="h-3 w-3 rounded-full bg-green-400"></p>
                          ) : (
                            <p>
                              {child.caseStatus == "inprogress" ? (
                                <p className="h-3 w-3 rounded-full bg-yellow-400"></p>
                              ) : (
                                <p className="h-3 w-3 rounded-full bg-red-600"></p>
                              )}
                            </p>
                          )}
                        </p>
                        <p>{t(`${child.caseStatus}`)}</p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default ChildAlloted;
