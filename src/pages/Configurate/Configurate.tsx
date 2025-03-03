
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import { useAppSelector, useAppDispatch } from '../../store';
import { toggleQuizHidden } from "../../store/slice/authSlice";
import "./Configurate.scss"

const Configurate = () => {
    const dispatch = useAppDispatch();
    const { quizHidden } = useAppSelector((state) => state.Auth);


    const handleToggle = () => {
        dispatch(toggleQuizHidden()); 
    }

    return (
        <div className="configurate">
         <p className="configurate__tittle">   Hide answers on quiz </p>
            <div className="signs_toggle" onClick={handleToggle}>
                {quizHidden ? (
                    <MdToggleOff className="togle_iconsof" />
                ) : (
                    <MdToggleOn className="togle_icons" />
                )}
            </div>
        </div>
    )
}

export default Configurate;