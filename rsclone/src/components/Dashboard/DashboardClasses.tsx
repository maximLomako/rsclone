import { makeStyles } from "@material-ui/core/styles";

export const getModalStyle = () => {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

const useStyles = makeStyles((theme) => ({
  dashboard: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
  },
  addForm: {
    padding: "20px",
    display: "flex",
    justifyContent: "center",
  },
  cards: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    margin: 0,
  },
  typography: {
    textAlign: "center",
    paddingTop: "5vh",
    textShadow: "3px 4px 2px rgba(147, 147, 147, 1)",
    color: "white",
  },
  modal: {
    position: "absolute",
    width: "65vw",
    maxWidth: "400px",
    backgroundColor: theme.palette.background.paper,
    color: "#333",
    boxShadow: "2px 2px 10px 1px rgba(0, 0, 0, 0.75)",
    textAlign: "center",
    padding: theme.spacing(3, 3, 3),
  },
  button: {
    margin:"10px",
  }
}));
export default useStyles;
