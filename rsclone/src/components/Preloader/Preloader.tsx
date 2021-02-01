// @ts-nocheck
import loading from "../../assets/images/loading.svg";

const loaderContainerStyles = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const Preloader = () => {
  return (
    <div style={loaderContainerStyles}>
      <img src={loading} alt="logo" />
    </div>
  );
};

export default Preloader;
