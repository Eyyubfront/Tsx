import  { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/index";
import { submitTimePreferences } from "../../store/actions/timeActions/timeActions";
import Paragrafy from "../../components/Paragrafy/Paragrafy";
import TimeOptions from "../../components/TimeOptions/TimeOptions"; 
import LearnLayout from "../../layout/LearnLayout/LearnLayout";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import moment from 'moment';
import UseFormTimeInput from "../../components/PrimaryInput/UseFormTimeInput";
import "./LearnTime.scss";

const schema = yup.object().shape({
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string().required("End time is required"),
  timeRange: yup.string().required("Time range is required"),
  intervalId: yup.number().required("Interval ID is required"),
});

const LearnTime = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      startTime: "",
      endTime: "",
      timeRange: "",
      intervalId: undefined,
    },
  });

  const { loading } = useAppSelector((state) => state.time);

  const timeOptions = [
    { label: "15 min", id: 1 },
    { label: "30 min", id: 2 },
    { label: "1 hour", id: 3 },
  ];

  const selectedSourceLanguage = useAppSelector((state) => state.language.selectedSourceLanguageId);
  const { userId } = useAppSelector((state) => state.Auth);
  const selectedTranslationLanguage = useAppSelector((state) => state.language.selectedTranslationId);

  useEffect(() => {
    if (!selectedTranslationLanguage || !selectedSourceLanguage) {
      navigate("/languageselector");
    }
  }, [selectedSourceLanguage, selectedTranslationLanguage]);

  const handleSubmit = async (data:any) => {
    try {
      const targetDate = moment().format("YYYY-MM-DD");
      const utcStartTime = moment(`${targetDate} ${data.startTime}`).utc().toISOString();
      const utcEndTime = moment(`${targetDate} ${data.endTime}`).utc().toISOString();

      const result = await dispatch(submitTimePreferences({
        userId: userId,
        intervalId: data.intervalId,
        startTime: utcStartTime,
        endTime: utcEndTime,
        timeRange: data.timeRange
      }));

      if (submitTimePreferences.fulfilled.match(result)) {
        navigate("/login");
      } else {
        console.error(result.payload || "Failed to submit time preferences");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOptionSelect = (label: string, id: number) => {
    methods.setValue("timeRange", label);
    methods.setValue("intervalId", id);
  };

  return (
    <LearnLayout
      titleText="What’s the Best Time for Learning?"
      descriptionText="Tell us when and how often you'd like to receive notifications. You can adjust these settings anytime to fit your schedule."
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <div className="box">
            <div className="left-box">
              <Paragrafy text="Select Time Range" className="timeparagraf" />
              <div className="time-inputs">
                <UseFormTimeInput
                  label="Start Time"
                  name="startTime"
                />
                <UseFormTimeInput
                  label="End Time"
                  name="endTime"
                />
              </div>

              <Paragrafy text="Select Time Range" className="timeparagraf" />
              <TimeOptions
                timeOptions={timeOptions}
                selectedOption={methods.watch("timeRange")}
                onOptionSelect={handleOptionSelect}
                errorMessage={methods.formState.errors.intervalId?.message}
              />
            </div>

            <div className="right-box">
              {loading && <p>Submitting...</p>}
              <button className="butt" type="submit" disabled={loading}>
                Continue
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    </LearnLayout>
  );
};

export default LearnTime;