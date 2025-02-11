import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Paragrafy from "../../components/Paragrafy/Paragrafy";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import UseFormInput from "../../components/PrimaryInput/UseFormInput";
import { useAppDispatch, useAppSelector } from "../../store";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { passwordChecksave } from "../../store/actions/passwordsettingsActions/passwordsettingsActions";
import { Alert, Skeleton } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import "./ChangedPasswordSettings.scss"
const schema = Yup.object().shape({
    password: Yup.string()
        .required("Current password is required."),
    newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters long.")
        .matches(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter.")
        .required("New password is required."),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], "Passwords must match.")
        .required("Confirm new password is required."),
});

const ChangedPasswordSettings = () => {
    const dispatch = useAppDispatch();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const methods = useForm({
        resolver: yupResolver(schema),
    });

    const { handleSubmit, formState } = methods;
    const {  error, success,isLoading } = useAppSelector((state) => state.passwordchecksettings);



    const onSubmit = async (data: { password: string; newPassword: string; confirmPassword: string; }) => {
        const newPasswordData = {
            currentPassword: data.password,
            newPassword: data.newPassword,
        };

        try {
            await dispatch(passwordChecksave(newPasswordData));
            setIsAlertVisible(true);
            setTimeout(() => {
                setIsAlertVisible(false);
            }, 3000);
        } catch (error) {
            setIsAlertVisible(true);
            setTimeout(() => {
                setIsAlertVisible(false);
            }, 3000);
        }
    };

    const handleEyePassword = () => {
        setIsPasswordVisible(prevState => !prevState);
    };
    const handleEyeCurrentPassword = () => {
        setIsCurrentPasswordVisible(prevState => !prevState);
    };
    const handleEyeConfirmPassword = () => {
        setIsConfirmPasswordVisible(prevState => !prevState);
    };

    return (
        <>
            {
                isLoading ? <Skeleton style={{height:"100%",width:"540px"}} /> : <div className="changedpasswordsettings">
                    <div className="changedpasswordforms">
                        <Paragrafy className="passwordsetingstittle" text="Change password" />
                        <Paragrafy className="resettittle" text="Please type something you’ll remember" />
                        {error && <p className="error-message">{error}</p>}
                        <FormProvider {...methods}>
                            <form className="formsettingspassword" onSubmit={handleSubmit(onSubmit)} >
                                <div className="form-groupcurrent">
                                    <UseFormInput
                                        name='password'
                                        label='Password'
                                        isEyeicon={true}
                                        handleEye={handleEyeCurrentPassword}
                                        iseye={isCurrentPasswordVisible}
                                        type={isCurrentPasswordVisible ? 'text' : 'password'}
                                    />
                                </div>
                                <div className="form-group">
                                    <UseFormInput
                                        name='newPassword'
                                        label='New Password'
                                        isEyeicon={true}
                                        handleEye={handleEyePassword}
                                        iseye={isPasswordVisible}
                                        type={isPasswordVisible ? 'text' : 'password'}
                                    />
                                </div>
                                <div className="form-groupconfirm">
                                    <div className="useform">
                                        <UseFormInput
                                            name='confirmPassword'
                                            label='Confirm New Password'
                                            isEyeicon={true}
                                            handleEye={handleEyeConfirmPassword}
                                            iseye={isConfirmPasswordVisible}
                                            type={isConfirmPasswordVisible ? 'text' : 'password'}
                                        />
                                    </div>
                                </div>
                                <PrimaryButton
                                    label="Save changes "
                                    type="submit"
                                    disabled={!formState.isValid || isLoading}
                                />
                            </form>
                        </FormProvider>
                        {success && (
                            <Alert
                                icon={<CheckIcon fontSize="inherit" />}
                                severity="success"
                                style={{ display: "flex", alignItems: "center", marginTop: "5px" }}
                                sx={{ display: isAlertVisible ? "block" : "none" }}
                            >
                                Your code has been successfully changed
                            </Alert>
                        )}
                    </div>
                </div>
            }
        </>
    );
};

export default ChangedPasswordSettings;