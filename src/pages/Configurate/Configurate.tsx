
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import { useAppSelector, useAppDispatch } from '../../store';
import "./Configurate.scss"
import { changelisting, changeVisibility, getuserSettings, notficationdisabled } from "../../store/actions/authActions";
import { useEffect } from "react";

const Configurate = () => {
    const dispatch = useAppDispatch();
    const { quizHidden, notificationDisabled, quizListenable } = useAppSelector((state) => state.Auth);


    const handleToggle = () => {
        dispatch(changeVisibility());
    }

    const handleToggleNotfication = () => {
        dispatch(notficationdisabled());
    }

    const handleToggleListen = () => {
        dispatch(changelisting());
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

                        <MdToggleOff className="togle_iconsof" />
                    ) : (
                        <MdToggleOn className="togle_icons" />

                    )}
                </div>
            </div>

            <div className="configurate_container">
                <p className="configurate__tittle">Hide answers on listen </p>
                <div className="signs_toggle" onClick={handleToggleListen}>
                    {quizListenable ? (
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