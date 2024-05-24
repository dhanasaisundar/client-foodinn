import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Loader2() {
  return (
    <div className="sweet-loading">
      <ClipLoader color={"#000"} loading={true} css={override} size={50} />
    </div>
  );
}

export default Loader2;
