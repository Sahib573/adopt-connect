import React, { useState, useEffect } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Inject,
  Toolbar,
  Sort,
  Filter,
  Search,
} from "@syncfusion/ej2-react-grids";
import { Header } from "../components";
import axios from "axios";
import { FaMale, FaFemale } from "react-icons/fa";
import AddChildPopUp from "../components/Modal/AddChildPopUp";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { managerRoute } from "../Contexts/ProtectedRoute";

const childGenderTemplate = (props) => (
  <div className="flex gap-2  items-center text-gray-700 capitalize">
    <p>
      {props.gender && props.gender.toLowerCase() == "male" ? (
        <span className="text-blue-600">
          <FaMale size={15} />
        </span>
      ) : (
        <span className="text-pink-500">
          <FaFemale size={15} />
        </span>
      )}
    </p>
    <p>{props.gender}</p>
  </div>
);

const caseStatusTemplate = (props) => (
  <div className="flex gap-2 items-center text-gray-700 capitalize">
    <p>
      {props.caseStatus == "completed" ? (
        <p className="h-3 w-3 rounded-full bg-green-400"></p>
      ) : (
        <p>
          {props.caseStatus == "inprogress" ? (
            <p className="h-3 w-3 rounded-full bg-yellow-400"></p>
          ) : (
            <p className="h-3 w-3 rounded-full bg-red-600"></p>
          )}
        </p>
      )}
    </p>
    <p>{props.caseStatus}</p>
  </div>
);

const Cases = () => {
  const [childData, setchildData] = useState([]);
  const [openAddChild, setopenAddChild] = useState(false);
  const [childDetails, setchildDetails] = useState({});
  const [openchildDetails, setopenchildDetails] = useState(false);
  const [openEditDetails, setopenEditDetails] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(async () => {
    const response = await axios.get(
      "https://adoptconnect.onrender.com/admin/all_child2"
    );
    setchildData(response.data.response);
  }, [openAddChild, openchildDetails, openEditDetails]);

  let grid;
  const rowSelected = () => {
    if (grid) {
      const selectedrecords = grid.getSelectedRecords();
      setchildDetails(selectedrecords[0]);
      navigate(`/child-details?id=${selectedrecords[0].child_id}`);
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl capitalize">
      {openAddChild ? <AddChildPopUp setopenAddchild={setopenAddChild} /> : ""}
      <Header category={t("Page")} title={t("Cases")} />
      <button
        className="p-2 mb-2 font-light text-sm rounded px-5 hover:bg-slate-100 cursor-pointer w-32 flex justify-center items-center"
        onClick={() => setopenAddChild(true)}
      >
        {t("Add New")} +
      </button>
      <GridComponent
        dataSource={childData}
        allowPaging
        allowSorting
        toolbar={["Search"]}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        width="auto"
        rowSelected={rowSelected}
        ref={(g) => (grid = g)}
      >
        <ColumnsDirective>
          <ColumnDirective
            field="child_id"
            headerText={t("Child Id")}
            format="C2"
            width="100"
          ></ColumnDirective>
          <ColumnDirective
            field="childName"
            headerText={t("Name")}
            width="120"
            textAlign="Left"
          ></ColumnDirective>
          <ColumnDirective
            field="childClassification"
            headerText={t("Category")}
            width="120"
          ></ColumnDirective>
          <ColumnDirective
            field="caseStatus"
            headerText={t("Status")}
            width="120"
            template={caseStatusTemplate}
          ></ColumnDirective>
          <ColumnDirective
            field="shelterHome"
            headerText={t("Shelter Home")}
            width="180"
          ></ColumnDirective>
          <ColumnDirective
            field="gender"
            headerText={t("Gender")}
            width="120"
            textAlign="Left"
            template={childGenderTemplate}
          ></ColumnDirective>
        </ColumnsDirective>
        <Inject services={[Page, Toolbar, Search, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default managerRoute(Cases);
