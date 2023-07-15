import React, { useState, useEffect } from "react";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import axios from "axios";
import { Header } from "../components";
import { useTranslation } from "react-i18next";

const Calendar = () => {
  const user = JSON.parse(localStorage.getItem("userDetails"));
  const [scheduleData, setscheduleData] = useState([]);
  const { t } = useTranslation();

  useEffect(async () => {
    if (!user) return;
    const newscheduleData = [];
    for (var i = 0; i < user.alloted_children.length; i++) {
      const response = await axios.post(
        "https://adoptconnect.onrender.com/child/get_flow_child",
        {
          child_id: user.alloted_children[i],
        }
      );
      if (response.data.response != null) {
        const adoptionFlow = response.data.response.individualAdoptionFlow;
        for (var j = 0; j < adoptionFlow.majorTask.length; j++) {
          const major = adoptionFlow.majorTask[j];
          if (major && major.majorTaskStatus === 1) {
            newscheduleData.push({
              Id: major._id,
              Subject: major.majorTaskStatement,
              Location: major.majorTaskNote,
              StartTime: new Date(major.start_time),
              EndTime: new Date(),
              CategoryColor: "#1aaa55",
            });
          } else if (major && major.majorTaskStatus === 0) {
            break;
          }
        }
      }
    }
    setscheduleData(newscheduleData);
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
      <Header category={t("App")} title={t("Calendar")} />
      <ScheduleComponent
        height="650px"
        eventSettings={{ dataSource: scheduleData }}
        selectedDate={new Date()}
      >
        <Inject services={[Day, Week, Month, Agenda, Resize]} />
      </ScheduleComponent>
    </div>
  );
};

export default Calendar;
