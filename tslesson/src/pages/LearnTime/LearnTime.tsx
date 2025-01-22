import { useState } from "react";
import Paragrafy from "../../components/Paragrafy/Paragrafy";
import TimeInput from "../../components/TimeInput/TimeInput";
import LearnLayout from "../../layout/LearnLayout/LearnLayout";
import "./LearnTime.scss";

const LearnTime = () => {
  const [startTime, setStartTime] = useState<string>("08:00");
  const [endTime, setEndTime] = useState<string>("18:00");

  return (
    <LearnLayout
      TitleText="What’s the Best Time for Learning?"
      DescriptionText="Tell us when and how often you'd like to receive notifications. You can adjust these settings anytime to fit your schedule."
    >
      <div className="box">
        <div className="left-box">
          <Paragrafy text="Select Time Range" className="timeparagraf" />
          <div className="time-inputs">
            <TimeInput
              label="Start Time"
              value={startTime}
              onChange={setStartTime}
              style={{ width: "100%", maxWidth: "200px" }}
            />
            <TimeInput
              label="End Time"
              value={endTime}
              onChange={setEndTime}
              style={{ width: "100%", maxWidth: "200px" }}
            />
          </div>
          <Paragrafy text="Select Time Range" className="timeparagraf" />
          <div className="pa-group">
            <p>15 min</p>
            <p>10 min</p>
            <p>1 hour</p>
          </div>
        </div>
        <div className="right-box">
          <button className="butt">Continue</button>
        </div>
      </div>
    </LearnLayout>
  );
};

export default LearnTime;
