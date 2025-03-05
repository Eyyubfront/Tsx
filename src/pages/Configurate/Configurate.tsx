
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import { useAppSelector, useAppDispatch } from '../../store';
import { toggleQuizHidden } from "../../store/slice/authSlice";
import "./Configurate.scss"
import { getuserSettings } from "../../store/actions/authActions";
import { useEffect } from "react";

const Configurate = () => {
    const dispatch = useAppDispatch();
    const { quizHidden } = useAppSelector((state) => state.Auth);

    const handleToggle = () => {
        dispatch(toggleQuizHidden()); 
    }
    useEffect(() => {
       dispatch(getuserSettings())
        }, []);
    

    return (
        <div className="configurate">
         <p className="configurate__tittle">Hide answers on quiz </p>
            <div className="signs_toggle" onClick={handleToggle}>
                {quizHidden ? (
                    <MdToggleOn className="togle_icons" />
                ) : (
                    <MdToggleOff className="togle_iconsof" />
                )}
            </div>
        </div>
    )
}

export default Configurate;