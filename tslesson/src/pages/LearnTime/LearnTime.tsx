import { useAppDispatch, useAppSelector } from "../../store/index";
import { setStartTime, setEndTime, setTimeRange } from "../../store/slice/timeSlice";
import { submitTimePreferences } from "../../store/actions/timeActions/timeActions";
import Paragrafy from "../../components/Paragrafy/Paragrafy";
import TimeInput from "../../components/TimeInput/TimeInput";
import LearnLayout from "../../layout/LearnLayout/LearnLayout";
import { useNavigate } from "react-router-dom";
import "./LearnTime.scss";

const LearnTime = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { startTime, endTime, timeRange, loading, error } = useAppSelector((state) => state.time);
  const timeOptions = ["15 min", "30 min", "1 hour"]; 

  const handleTimeRangeClick = (range: string) => {
    dispatch(setTimeRange(range));
  };

  const handleSubmit = async () => {
    if (!startTime || !endTime || !timeRange) {
      alert("All fields are required. Please fill them out before continuing.");
      return;
    }

    const result = await dispatch(submitTimePreferences({ startTime, endTime, timeRange }));

    if (submitTimePreferences.fulfilled.match(result)) {
      navigate("/login"); 
    } else {
      console.error(result.payload || "Failed to submit time preferences");
    }
  };

  return (
    <LearnLayout
      titleText="What’s the Best Time for Learning?"
      descriptionText="Tell us when and how often you'd like to receive notifications. You can adjust these settings anytime to fit your schedule."
    >
      <div className="box">
        <div className="left-box">
          <Paragrafy text="Select Time Range" className="timeparagraf" />
          <div className="time-inputs">
            <TimeInput
              label="Start Time"
              value={startTime}
              onChange={(value) => dispatch(setStartTime(value))}
              style={{ width: "100%", maxWidth: "200px" }}
            />
            <TimeInput
              label="End Time"
              value={endTime}
              onChange={(value) => dispatch(setEndTime(value))}
              style={{ width: "100%", maxWidth: "200px" }}
            />
          </div>

          <Paragrafy text="Select Time Range" className="timeparagraf" />
          <div className="pa-group">
            {timeOptions.map((option) => (
              <p
                key={option}
                className={`time-option ${
                  timeRange === option ? "selected" : ""
                }`}
                onClick={() => handleTimeRangeClick(option)}
              >
                {option}
              </p>
            ))}
          </div>
        </div>

        <div className="right-box">
          {loading && <p>Submitting...</p>}
          {error && <p className="error-message">{error}</p>}
          <button className="butt" onClick={handleSubmit} disabled={loading}>
            Continue
          </button>
        </div>
      </div>
    </LearnLayout>
  );
};

export default LearnTime;
