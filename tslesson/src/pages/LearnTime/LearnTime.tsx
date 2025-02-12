import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/index";
import { submitTimePreferences } from "../../store/actions/timeActions/timeActions";
import Paragrafy from "../../components/Paragrafy/Paragrafy";
import TimeOptions from "../../components/TimeOptions/TimeOptions";
import "./LearnTime.scss";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import moment from "moment";
import UseFormTimeInput from "../../components/PrimaryInput/UseFormTimeInput";
import SidePanel from "../../layout/SidePanel/SidePanel";
import BackButton from "../../components/BackButton/BackButton";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

const schema = yup.object().shape({
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string().required("End time is required"),
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
      intervalId: undefined,
    },
  });

  const { loading } = useAppSelector((state) => state.time);
  const { handleSubmit, formState: { errors }, watch } = methods;

  const timeOptions = [
    { label: "15 min", id: 1 },
    { label: "30 min", id: 2 },
    { label: "1 hour", id: 3 },
  ];

  const selectedSourceLanguage = useAppSelector((state) => state.language.selectedSourceLanguageId);
  const selectedTranslationLanguage = useAppSelector((state) => state.language.selectedTranslationId);

  useEffect(() => {
    if (!selectedTranslationLanguage || !selectedSourceLanguage) {
      navigate("/languageselector");
    }
  }, [selectedSourceLanguage, selectedTranslationLanguage]);

  const onSubmit = async (data: any) => {
  
  
    try {
      const targetDate = moment().format("YYYY-MM-DD");
      const utcStartTime = moment(`${targetDate} ${data.startTime}`).utc().toISOString();
      const utcEndTime = moment(`${targetDate} ${data.endTime}`).utc().toISOString();

      await dispatch(submitTimePreferences({
        intervalId: data.intervalId,
        startTime: utcStartTime,
        endTime: utcEndTime,
      })).unwrap().then(() => {
        navigate("/login");
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleOptionSelect = (id: number) => {
    methods.setValue("intervalId", id);
  };

  return (
    <div className="learntime">
      <div className="learntime_left">
        <SidePanel
          titleText="What’s the Best Time for Learning?"
          descriptionText="Tell us when and how often you'd like to receive notifications. You can adjust these settings anytime to fit your schedule."
        />
        <BackButton className="learnback" onClick={() => navigate("/login")} />
      </div>
      <div className="learntime_right">
        <FormProvider {...methods} >
          <form onSubmit={handleSubmit(onSubmit)} className="formslearntime">
            <div className="box">
              <div className="left-box">
                <Paragrafy text="Select Time Range" className="timeparagraf" />
                <div className="time-inputs">
                  <UseFormTimeInput label="Start Time" name="startTime" />
                  <UseFormTimeInput label="End Time" name="endTime" />
                </div>
                <Paragrafy text="Select Time Interval" className="timeparagraf" />
                <TimeOptions
                  timeOptions={timeOptions}
                  selectedOption={watch("intervalId")}
                  onOptionSelect={handleOptionSelect}
                  errorMessage={errors.intervalId?.message}
                />
              </div>
              <div className="right-box">
                {loading && <p>Submitting...</p>}
                <PrimaryButton type="submit" disabled={loading} label="Continue" />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default LearnTime;
