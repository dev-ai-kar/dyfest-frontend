import "assets/scss/material-kit-react.scss";
import "./App.css";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";

import HeaderLinks from "components/Header/HeaderLinks.js";

import styles from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);

function App(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        brand="DY FEST"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "dark",
        }}
        {...rest}
      />
      <header className="App-header">
        <Button
          style={{ fontSize: 25 }}
          size="large"
          variant="contained"
          color="primary"
        >
          Hello World
        </Button>
      </header>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <main>
          <br />
          <h1>Welcome</h1>
          <h1>to The</h1>
          <h1>other side</h1>
          <br />
        </main>
      </div>
      <br />
      <h1>Lets Do It</h1>
      <Footer />
    </div>
  );
}

export default App;
