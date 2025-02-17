import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Paragrafy from "../../components/Paragrafy/Paragrafy";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import UseFormInput from "../../components/PrimaryInput/UseFormInput";
import { useAppDispatch, useAppSelector } from "../../store";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { passwordChecksave } from "../../store/actions/passwordsettingsActions/passwordsettingsActions";
import { Alert, IconButton, Skeleton } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import "./ChangedPasswordSettings.scss"
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Close } from "@mui/icons-material";
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { handleSubmit, formState } = methods;
    const { error, success, isLoading } = useAppSelector((state) => state.passwordchecksettings);

    useEffect(() => {
        if (success) {
            setIsAlertVisible(true);
            setTimeout(() => {
                setIsAlertVisible(false);
            }, 3000);

        } setIsModalOpen(!!error)
    }, [success]);

    const onSubmit = async (data: { password: string; newPassword: string; confirmPassword: string; }) => {
        const newPasswordData = {
            currentPassword: data.password,
            newPassword: data.newPassword,
        };

        try {
            await dispatch(passwordChecksave(newPasswordData));
            methods.reset();
        } catch (error) {

        }
    };

    const handleCloseModalError = () => {
        setIsModalOpen(false);
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
            {isLoading ? <Skeleton style={{ height: "100%", width: "540px" }} /> : <div className="changedpasswordsettings">
                <div className="changedpasswordforms">
                    <Paragrafy className="passwordsetingstittle" text="Change password" />
                    <Paragrafy className="resettittle" text="Please type something you’ll remember" />

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
                        {isAlertVisible && success && (
                            <Alert
                                icon={<CheckIcon fontSize="inherit" />}
                                severity="success"
                                style={{ display: "flex", alignItems: "center" }}
                            >
                                Your password has been successfully changed
                            </Alert>
                        )}
                    </FormProvider>
                </div>
           {/* {error &&<p>{error}</p> } */}
                {error && <Dialog
                    open={isModalOpen}
                    onClose={handleCloseModalError}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <div className="language_dialoqtop">
                        <DialogTitle id="alert-dialog-title">
                            Pay attention
                        </DialogTitle>
                        <IconButton className='iconbutton' onClick={handleCloseModalError}>
                            <Close />
                        </IconButton>
                    </div>
                    <DialogContent>
                        <DialogContentText id="modal_message">
                            {error && <p style={{ color: 'red' }}> {error}</p>}
                        </DialogContentText>
                    </DialogContent>
                </Dialog>}
            </div>}
        </>
    );
};

export default ChangedPasswordSettings;