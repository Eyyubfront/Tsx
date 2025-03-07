
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import { useAppSelector, useAppDispatch } from '../../store';
import { toggleQuizHidden, toogleNotfication } from "../../store/slice/authSlice";
import "./Configurate.scss"
import { getuserSettings } from "../../store/actions/authActions";
import { useEffect } from "react";

const Configurate = () => {
    const dispatch = useAppDispatch();
    const { quizHidden, notificationDisabled } = useAppSelector((state) => state.Auth);

    console.log(quizHidden);

    const handleToggle = () => {
        dispatch(toggleQuizHidden());
    }

    const handleToggleNotfication = () => {
        dispatch(toogleNotfication());
    }
    useEffect(() => {
        dispatch(getuserSettings())
    }, []);


    return (
        <div className="configurate">
            <h2>Question visibility setting</h2>
            <div className="configurate_container">
                <p className="configurate__tittle">Hide answers on quiz </p>
                <div className="signs_toggle" onClick={handleToggle}>
                    {quizHidden ? (
                        <MdToggleOn className="togle_icons" />

                    ) : (

                        <MdToggleOff className="togle_iconsof" />

                    )}
                </div>
            </div>

            <div className="configurate_container">
                <p className="configurate__tittle">Hide answers on notification </p>
                <div className="signs_toggle" onClick={handleToggleNotfication}>
                    {notificationDisabled ? (
                        <MdToggleOn className="togle_icons" />

                    ) : (

                        <MdToggleOff className="togle_iconsof" />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Configurate;