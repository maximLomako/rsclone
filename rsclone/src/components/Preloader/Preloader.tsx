import loading from "../../assets/images/loading.svg";

const Preloader = () => {
  return (
    <div className="loading">
      <img src={loading} className="loading" alt="logo" />
      <h1>Fetching Data</h1>
    </div>
  );
};

export default Preloader;