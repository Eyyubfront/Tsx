import { FC } from "react";
import { MdToggleOn, MdToggleOff } from "react-icons/md";
import Paragrafy from "../../../components/Paragrafy/Paragrafy";
import "./Toogle.scss"; 

interface ToogleProps {
  isOn: boolean;
  handleToggle: () => void;
}

const Toogle: FC<ToogleProps> = ({ isOn, handleToggle }) => {
  return (
    <div className="signin_check">
      <div onClick={handleToggle} className="signs_toggle">
        {isOn ? (
          <MdToggleOn className="togle_icons" />
        ) : (
          <MdToggleOff className="togle_iconsof" />
        )}
      </div>
      <div className="signin_checkaccsestext">
        <Paragrafy fontfamily="Inter,sans-serif" text="Weekly summary" fontsize="16px" fontWeight="600" />
        <Paragrafy
          text="Get a weekly activity report via email."
          fontsize="14px"
          fontfamily="Inter,sans-serif"
          fontWeight="400"
        />
      </div>
    </div>
  );
};

export default Toogle;
