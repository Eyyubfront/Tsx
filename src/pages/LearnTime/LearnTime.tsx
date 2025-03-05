import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/index";
import { SubmitTimePreferencesPayload, submitTimePreferences } from "../../store/actions/timeActions/timeActions";
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
import { intervalfetch } from "../../store/actions/passwordsettingsActions/passwordsettingsActions";
import { setisAuth } from "../../store/slice/authSlice";

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
  const { intervals } = useAppSelector((state) => state.passwordchecksettings);
  const { handleSubmit, formState: { errors }, watch } = methods;

  useEffect(() => {
    dispatch(intervalfetch());
  }, [dispatch]);


  const selectedSourceLanguage = useAppSelector((state) => state.language.selectedSourceLanguageId);
  const selectedTranslationLanguage = useAppSelector((state) => state.language.selectedTranslationId);

  useEffect(() => {
    if (!selectedTranslationLanguage || !selectedSourceLanguage) {
      navigate("/languageselector");
    }
  }, [selectedSourceLanguage, selectedTranslationLanguage]);

  const onSubmit = async (data: SubmitTimePreferencesPayload) => {


    try {
      const targetDate = moment().format("YYYY-MM-DD");
      const utcStartTime = moment(`${targetDate} ${data.startTime}`).add(4, "hours").toISOString();
      const utcEndTime = moment(`${targetDate} ${data.endTime}`).add(4, "hours").toISOString();
     

      await dispatch(submitTimePreferences({
        intervalId: data.intervalId,
        startTime: utcStartTime,
        endTime: utcEndTime,
      })).unwrap().then(() => {
        dispatch(setisAuth())
        navigate("/");
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
                  timeOptions={intervals}
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
