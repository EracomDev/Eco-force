import React from "react";
import { AiOutlineTeam } from "react-icons/ai"
const TeamComponent = (props) => {
  return (
    <div className="directList" style={{ background: props.bgColor }}>
      <i style={{ color: props.color }}>{<AiOutlineTeam />}</i>
      <h6 style={{ color: props.color }}>{props.teamName}</h6>
      <span style={{ color: props.color }}>0</span>
    </div>
  );
};

export default TeamComponent;
