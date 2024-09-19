import React from "react";
import styled from "@emotion/styled";
const StyledDiv = styled("div")`
  background-color: #bcbcbc;
  border-radius: 35px;
  height: 10px;
  overflow: hidden;
`;

const StyledBar = styled("div")`
  background-color: #007bff;
  height: 10px;
  width: ${({ completed }) => completed}%;
`;

const StorageProgress = (props) => {
  return (
    <>
      {/* <div className="card_progress">
        <div className="progress_wrap"></div>
      </div> */}
      <StyledDiv completed={props.completed}>
        <StyledBar completed={props.completed} />
      </StyledDiv>
    </>
  );
};

export default StorageProgress;
