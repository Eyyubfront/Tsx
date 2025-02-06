import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import moment from "moment";
import {  getTime, updateTime } from "../../../store/actions/timeActions/timeActions";
import Paragrafy from "../../../components/Paragrafy/Paragrafy";
import UseFormTimeInput from "../../../components/PrimaryInput/UseFormTimeInput";
import TimeOptions from "../../../components/TimeOptions/TimeOptions";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import { useAppDispatch, useAppSelector } from "../../../store";
import "./TimeSettings.scss"

const schema = yup.object().shape({
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string().required("End time is required"),
  intervalId: yup.number().required("Interval ID is required"),
});

const TimeSettings = () => {
  const dispatch = useAppDispatch();

 
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      startTime: "",
      endTime: "",
      intervalId: undefined,
    },
  });

  const { loading, startTime, endTime, intervalId } = useAppSelector((state) => state.time);
  const { handleSubmit, formState: { errors }, watch, setValue } = methods;

  const timeOptions = [
    { label: "15 min", id: 1 },
    { label: "30 min", id: 2 },
    { label: "1 hour", id: 3 },
  ];


  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(getTime()).unwrap();
      setValue("startTime", result.startTime);
      setValue("endTime", result.endTime);
      setValue("intervalId", result.intervalId);
    };

    fetchData();
  }, [dispatch, setValue]);

  const onSubmit = async (data: any) => {
    try {
      const targetDate = moment().format("YYYY-MM-DD");
      const utcStartTime = moment(`${targetDate} ${data.startTime}`).utc().toISOString();
      const utcEndTime = moment(`${targetDate} ${data.endTime}`).utc().toISOString();

      dispatch(updateTime({
        intervalId: data.intervalId,
        startTime: utcStartTime,
        endTime: utcEndTime,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleOptionSelect = (id: number) => {
    setValue("intervalId", id);
  };

  return (
    <div className="time_settings">
      <div className="timesettings_top">
    <Paragrafy className="setings_tittle" text="Choosen time for learning"/>
    <Paragrafy className="settings_about" text="Choosen time for receiving notifications"/>
      </div>
      <div className="timesetting-right">
        <FormProvider {...methods}>
          <form className="formsettings" onSubmit={handleSubmit(onSubmit)}>
            <div className="box">
              <div className="left-box">
                <Paragrafy text="Select Time Range" className="timeparagraf" />
                <div className="time-inputs">
                  <UseFormTimeInput label="Start Time" name="startTime" />
                  <UseFormTimeInput label="End Time" name="endTime" />
                </div>
                <Paragrafy text="Select Time Range" className="timeparagraf" />
                <TimeOptions
                  timeOptions={timeOptions}
                  selectedOption={watch("intervalId")}
                  onOptionSelect={handleOptionSelect}
                  errorMessage={errors.intervalId?.message}
                />
              </div>
              <div className="right-box">
                {loading && <p>Submitting...</p>}
                <PrimaryButton type="submit" disabled={loading} label="Save" />
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default TimeSettings;