import React, { useState, useEffect } from "react";
import { FaChild } from "react-icons/fa";
import { AiOutlineFieldTime } from "react-icons/ai";
import { BiError } from "react-icons/bi";
import { HiUserGroup } from "react-icons/hi";
import { adminRoute } from "../Contexts/ProtectedRoute";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Analytics = () => {
  const [analyticsData, setanalyticsData] = useState();
  const [caseStatusCount, setcaseStatusCount] = useState([]);
  const [shelterHomeData, setshelterHomeData] = useState([]);
  const [genderDistributionData, setgenderDistributionData] = useState([]);
  const [ageDistributionData, setageDistributionData] = useState([]);
  const [workerRatioData, setworkerRatioData] = useState([]);
  const [childClassificationRatioData, setchildClassificationRatioData] =
    useState([]);
  const [
    geographicDistributionDistrictData,
    setgeographicDistributionDistrictData,
  ] = useState([]);
  const [geographicDistributionStateData, setgeographicDistributionStateData] =
    useState([]);

  const { t } = useTranslation();

  useEffect(async () => {
    const response = await axios.get(
      "https://adoptconnect.onrender.com/admin/get_analytics"
    );
    if (response.data) {
      setanalyticsData(response.data.response);
      const arr = response.data.response.ratioCaseStatus.labels;
      const newArr = [];
      var inactive = 0;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === "inactive") {
          inactive = response.data.response.ratioCaseStatus.values[i];
          break;
        }
      }
      newArr.push(inactive);

      var completed = 0;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === "completed") {
          completed = response.data.response.ratioCaseStatus.values[i];
          break;
        }
      }
      newArr.push(completed);

      var inprogress = 0;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === "inprogress") {
          inprogress = response.data.response.ratioCaseStatus.values[i];
          break;
        }
      }
      newArr.push(inprogress);
      setcaseStatusCount([...caseStatusCount, ...newArr]);

      const newshelterHomeData = [];
      for (
        var i = 0;
        i < response.data.response.ShelterHomeRatio.labels.length;
        i++
      ) {
        newshelterHomeData.push({
          place: response.data.response.ShelterHomeRatio.labels[i],
          children: response.data.response.ShelterHomeRatio.values[i],
        });
      }
      setshelterHomeData(newshelterHomeData);

      const newgenderDistributionData = [];
      for (
        var i = 0;
        i < response.data.response.genderDistribution.labels.length;
        i++
      ) {
        newgenderDistributionData.push({
          gender: response.data.response.genderDistribution.labels[i],
          count: response.data.response.genderDistribution.values[i],
        });
      }
      setgenderDistributionData(newgenderDistributionData);

      const newageDistributionData = [];
      for (
        var i = 0;
        i < response.data.response.ageDistribution.labels.length;
        i++
      ) {
        newageDistributionData.push({
          age: response.data.response.ageDistribution.labels[i],
          count: response.data.response.ageDistribution.values[i],
        });
      }
      setageDistributionData(newageDistributionData);

      const newworkerRatioData = [];
      for (
        var i = 0;
        i < response.data.response.workerRatio.labels.length;
        i++
      ) {
        newworkerRatioData.push({
          age: response.data.response.workerRatio.labels[i],
          count: response.data.response.workerRatio.values[i],
        });
      }
      setworkerRatioData(newworkerRatioData);

      const newchildClassificationData = [];
      for (
        var i = 0;
        i < response.data.response.childClassificationRatio.labels.length;
        i++
      ) {
        newchildClassificationData.push({
          classification:
            response.data.response.childClassificationRatio.labels[i],
          count: response.data.response.childClassificationRatio.values[i],
        });
      }
      setchildClassificationRatioData(newchildClassificationData);

      const newgeographicDistributionDistrictData = [];
      for (
        var i = 0;
        i < response.data.response.geographicDistributionDistrict.labels.length;
        i++
      ) {
        newgeographicDistributionDistrictData.push({
          district:
            response.data.response.geographicDistributionDistrict.labels[i],
          count:
            response.data.response.geographicDistributionDistrict.values[i],
        });
      }
      setgeographicDistributionDistrictData(
        newgeographicDistributionDistrictData
      );

      const newgeographicDistributionStateData = [];
      for (
        var i = 0;
        i < response.data.response.geographicDistributionState.labels.length;
        i++
      ) {
        newgeographicDistributionStateData.push({
          state: response.data.response.geographicDistributionState.labels[i],
          count: response.data.response.geographicDistributionState.values[i],
        });
      }
      setgeographicDistributionStateData(newgeographicDistributionStateData);
    }
  }, []);

  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                className="text-2xl text-green-500 bg-green-100 opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                <HiUserGroup size={30} />
              </button>
              <p className="mt-3">
                <span className="text-xl font-semibold">
                  {analyticsData &&
                    analyticsData.AdoptionSuccess &&
                    analyticsData.AdoptionSuccess &&
                    analyticsData.AdoptionSuccess.values}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{t("Total Cases")}</p>
            </div>
          </div>
          <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
            <button
              type="button"
              className="text-2xl opacity-0.9 rounded-full bg-sky-100 text-sky-400 p-4 hover:drop-shadow-xl"
            >
              <FaChild size={30} />
            </button>
            <p className="mt-3">
              <span className="text-xl font-semibold">
                {caseStatusCount[1]}
              </span>
            </p>
            <p className="text-sm text-gray-400  mt-1">{t("Adopted")}</p>
          </div>
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
            <button
              type="button"
              className="text-2xl opacity-0.9 text-slate-100 bg-yellow-400 rounded-full  p-4 hover:drop-shadow-xl"
            >
              <AiOutlineFieldTime size={30} />
            </button>
            <p className="mt-3">
              <span className="text-xl font-semibold">
                {caseStatusCount[2]}
              </span>
            </p>
            <p className="text-sm text-gray-400  mt-1">{t("In Progress")}</p>
          </div>
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
            <button
              type="button"
              className="text-2xl text-red-400 bg-slate-100 opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
            >
              <BiError size={30} />
            </button>
            <p className="mt-3">
              <span className="text-xl font-semibold">
                {caseStatusCount[0]}
              </span>
            </p>
            <p className="text-sm text-gray-400  mt-1">{t("Inactive")}</p>
          </div>
        </div>
      </div>
      <div className="flex w-full gap-10 flex-wrap justify-center">
        <div className="bg-white w-full dark:text-gray-200 dark:bg-secondary-dark-bg m-3 p-4 rounded-2xl md:w-780  ">
          <div className="w-full grid grid-cols-2">
            <div>
              <div className="flex justify-between">
                <p className="font-semibold text-xl mb-10">
                  {t("Shelter Homes")}
                </p>
              </div>
              <div className="h-96 w-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={shelterHomeData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="place" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="children" fill="#a74786" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <p className="font-semibold text-xl mb-10">
                  {t("Gender Distribution")}
                </p>
              </div>
              <div className="h-96 w-96">
                <PieChart width={250} height={250}>
                  <Pie
                    data={genderDistributionData}
                    cx={125}
                    cy={125}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="count"
                  ></Pie>
                </PieChart>
                <div className="custom-legend flex pl-20 flex-col text-slate-600">
                  {genderDistributionData.map((entry, index) => (
                    <div key={`legend-${index}`} className="capitalize">
                      <span className="legend-label">
                        {t(`${entry.gender}`)} - {`${entry.count}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <p className="font-semibold text-xl mb-10">
                  {t("Worker Distribution")}
                </p>
              </div>
              <div className="h-full w-full">
                <PieChart width={250} height={250}>
                  <Pie
                    data={workerRatioData}
                    cx={125}
                    cy={125}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#ffc556"
                    paddingAngle={5}
                    dataKey="count"
                  ></Pie>
                </PieChart>
                <div className="custom-legend flex pl-20 flex-col text-slate-600">
                  {workerRatioData.map((entry, index) => (
                    <div key={`legend-${index}`} className="capitalize">
                      <span className="legend-label">
                        {t(`${entry.age}`)} : {`${entry.count}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <p className="font-semibold text-xl mb-10">
                  {t("Age Distribution")}
                </p>
              </div>
              <div className="h-96 w-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={ageDistributionData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#60badd" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="col-span-2">
              <div className="flex justify-between">
                <p className="font-semibold text-xl mb-10">
                  {t("Child Classification")}
                </p>
              </div>
              <div className="h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={1000}
                    height={300}
                    data={childClassificationRatioData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="classification" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#f6977a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="">
              <div className="flex justify-between">
                <p className="font-semibold text-xl mb-10">
                  {t("District Wise")}
                </p>
              </div>
              <div className="h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={1000}
                    height={300}
                    data={geographicDistributionDistrictData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="district" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#a74786" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="">
              <div className="flex justify-between">
                <p className="font-semibold text-xl mb-10">{t("State Wise")}</p>
              </div>
              <div className="h-96 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={1000}
                    height={300}
                    data={geographicDistributionStateData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="state" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default adminRoute(Analytics);
