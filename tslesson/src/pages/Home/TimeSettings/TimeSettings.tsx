import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import moment from "moment";
import { SubmitTimePreferencesPayload, getTime, updateTime } from "../../../store/actions/timeActions/timeActions";
import Paragrafy from "../../../components/Paragrafy/Paragrafy";
import UseFormTimeInput from "../../../components/PrimaryInput/UseFormTimeInput";
import TimeOptions from "../../../components/TimeOptions/TimeOptions";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import { useAppDispatch, useAppSelector } from "../../../store";
import { Skeleton, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import "./TimeSettings.scss";
import AlertDialog from "../../../components/AlertDialog/AlertDialog";

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

  const { loading } = useAppSelector((state) => state.time);
  const { handleSubmit, formState: { errors }, watch, setValue } = methods;

  const [openDialog, setOpenDialog] = useState(false); 

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

  const onSubmit = async (data: SubmitTimePreferencesPayload) => {
    try {
      const targetDate = moment().format("YYYY-MM-DD");
      const utcStartTime = moment(`${targetDate} ${data.startTime}`).utc().toISOString();
      const utcEndTime = moment(`${targetDate} ${data.endTime}`).utc().toISOString();

      await dispatch(updateTime({
        intervalId: data.intervalId,
        startTime: utcStartTime,
        endTime: utcEndTime,
      }));

      setOpenDialog(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOptionSelect = (id: number) => {
    setValue("intervalId", id);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Dialog'u kapat
  };

  return (
    <>
      {
        loading ? <Skeleton style={{ height: "500px", width: "600px" }} /> : <div className="time_settings">
          <div className="timesettings_top">
            <Paragrafy className="setings_tittle" text="Choosen time for learning" />
            <Paragrafy className="settings_about" text="Choosen time for receiving notifications" />
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
                    <PrimaryButton type="submit" disabled={loading} label="Save" />
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
      }
    
          <AlertDialog
          className='newword_errormodal'
          open={openDialog}
          onClose={handleCloseDialog}
          title="Pay attention"
      ><p className="update_meesage">Time range successfully updated!</p>
      </AlertDialog>
    </>
  );
};

export default TimeSettings;



















// import { useEffect } from "react";
// import { useForm, FormProvider } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import moment from "moment";
// import { SubmitTimePreferencesPayload, updateTime } from "../../../store/actions/timeActions/timeActions";
// import Paragrafy from "../../../components/Paragrafy/Paragrafy";
// import UseFormTimeInput from "../../../components/PrimaryInput/UseFormTimeInput";
// import TimeOptions from "../../../components/TimeOptions/TimeOptions";
// import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
// import { useAppDispatch, useAppSelector } from "../../../store";
// import "./TimeSettings.scss";
// import { Skeleton } from "@mui/material";

// const schema = yup.object().shape({
//   startTime: yup.string().required("Start time is required"),
//   endTime: yup.string().required("End time is required"),
//   intervalId: yup.number().required("Interval ID is required"),
// });

// const TimeSettings = () => {
//   const dispatch = useAppDispatch();

//   const methods = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: {
//       startTime: "",
//       endTime: "",
//       intervalId: undefined,
//     },
//   });

//   const { loading } = useAppSelector((state) => state.time);
//   const { handleSubmit, formState: { errors }, watch, setValue } = methods;

//   const timeOptions = [
//     { label: "15 min", id: 1 },
//     { label: "30 min", id: 2 },
//     { label: "1 hour", id: 3 },
//   ];

 
//   useEffect(() => {
//     const storedStartTime = localStorage.getItem("startTime");
//     const storedEndTime = localStorage.getItem("endTime");
//     const storedIntervalId = localStorage.getItem("intervalId");

//     if (storedStartTime && storedEndTime && storedIntervalId) {
//       setValue("startTime", storedStartTime);
//       setValue("endTime", storedEndTime);
//       setValue("intervalId", parseInt(storedIntervalId));
//     }
//   }, [setValue]);

//   const onSubmit = async (data: SubmitTimePreferencesPayload) => {
//     try {
//       const targetDate = moment().format("YYYY-MM-DD");
//       const utcStartTime = moment(`${targetDate} ${data.startTime}`).utc().toISOString();
//       const utcEndTime = moment(`${targetDate} ${data.endTime}`).utc().toISOString();

//       localStorage.setItem("startTime", data.startTime);
//       localStorage.setItem("endTime", data.endTime);
//       localStorage.setItem("intervalId", data.intervalId.toString());

  
//       dispatch(updateTime({
//         intervalId: data.intervalId,
//         startTime: utcStartTime,
//         endTime: utcEndTime,
//       }));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleOptionSelect = (id: number) => {
//     setValue("intervalId", id);
//   };

//   return (
//     <>
//       {loading ? (
//         <Skeleton style={{ height: "500px", width: "600px" }} />
//       ) : (
//         <div className="time_settings">
//           <div className="timesettings_top">
//             <Paragrafy className="setings_tittle" text="Choosen time for learning" />
//             <Paragrafy className="settings_about" text="Choosen time for receiving notifications" />
//           </div>
//           <div className="timesetting-right">
//             <FormProvider {...methods}>
//               <form className="formsettings" onSubmit={handleSubmit(onSubmit)}>
//                 <div className="box">
//                   <div className="left-box">
//                     <Paragrafy text="Select Time Range" className="timeparagraf" />
//                     <div className="time-inputs">
//                       <UseFormTimeInput label="Start Time" name="startTime" />
//                       <UseFormTimeInput label="End Time" name="endTime" />
//                     </div>
//                     <Paragrafy text="Select Time Range" className="timeparagraf" />
//                     <TimeOptions
//                       timeOptions={timeOptions}
//                       selectedOption={watch("intervalId")}
//                       onOptionSelect={handleOptionSelect}
//                       errorMessage={errors.intervalId?.message}
//                     />
//                   </div>
//                   <div className="right-box">
//                     <PrimaryButton type="submit" disabled={loading} label="Save" />
//                   </div>
//                 </div>
//               </form>
//             </FormProvider>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default TimeSettings;
