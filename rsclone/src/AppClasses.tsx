import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
  },
  header: {
    height: "10%",
  },
  main: {
    padding: 0,
    margin: 0,
    maxWidth: "2048px",
    minHeight: "79%",
    display: "flex",
    flexGrow: 1,
  },
  footer: {
    padding: 0,
    height: "11%",
    backgroundColor: theme.palette.primary.main,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  footerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  link: {
    alignSelf: "center",
    textDecoration: "none",
  },
}));
export default useStyles;
