import React, { useState, useEffect } from "react";
import axios from "axios";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import PermMediaIcon from "@material-ui/icons/PermMedia";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import People from "@material-ui/icons/People";
import CategoryIcon from "@material-ui/icons/Category";
import DescriptionIcon from "@material-ui/icons/Description";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

// import imagebg from "assets/img/bg7.jpg";

// My Backend Config
import { Link } from "react-router-dom";
import Loader from "components/Loader";
import Message from "components/Message";
import { useDispatch, useSelector } from "react-redux";
import { listEventDetails, updateEvent } from "../actions/eventActions";
import { PRODUCT_UPDATE_RESET } from "../constants/EventConstants";

const useStyles = makeStyles(styles);

export default function EventEditScreen({ match, history }) {
  const eventId = match.params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  //   const redirect = location.search ? location.search.split("=")[1] : "/";

  const eventDetails = useSelector((state) => state.eventDetails);
  const { error, loading, event } = eventDetails;

  const eventUpdate = useSelector((state) => state.eventUpdate);
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = eventUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push("/admin/eventlist");
    } else {
      if (!event.name || event._id !== Number(eventId)) {
        dispatch(listEventDetails(eventId));
      } else {
        setName(event.name);
        setPrice(event.price);
        setImage(event.image);
        setBrand(event.brand);
        setCategory(event.category);
        setCountInStock(event.countInStock);
        setDescription(event.description);
      }
    }
  }, [dispatch, history, event, eventId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateEvent({
        _id: eventId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    console.log("file is uploading");
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);
    formData.append("event_id", eventId);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "/api/events/upload/",
        formData,
        config
      );

      setImage(data);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };
  // const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  // setTimeout(function () {
  //   setCardAnimation("");
  // }, 700);
  const classes = useStyles();
  return (
    // <div1
    //   className={classes.pageHeader}
    //   style={{
    //     backgroundImage: "url(" + imagebg + ")",
    //     backgroundSize: "cover",
    //     backgroundPosition: "top center",
    //   }}
    // >
    <div className={classes.container}>
      {/* <Link to="/admin/userlist">GO BACK</Link> */}
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          {/* className={classes[cardAnimaton]} */}

          <Card>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message message={errorUpdate} color="danger" />}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message message={error} color="danger" />
            ) : (
              <form className={classes.form} onSubmit={submitHandler}>
                <CardHeader color="primary" className={classes.cardHeader}>
                  <div className={classes.socialLine}>
                    <Button
                      size="sm"
                      color="info"
                      round
                      component={Link}
                      to="/admin/eventlist"
                    >
                      <ArrowBackIos />
                      GO BACK
                    </Button>
                    {/* <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className={"fab fa-twitter"} />
                        </Button>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={(e) => e.preventDefault()}
                          >
                          <i className={"fab fa-facebook"} />
                          </Button>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={(e) => e.preventDefault()}
                        >
                        <i className={"fab fa-google-plus-g"} />
                      </Button> */}
                  </div>
                  <h4>Edit User</h4>
                </CardHeader>
                <CardBody>
                  <CustomInput
                    labelText="First Name..."
                    id="first"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                      value: name,
                      onChange: (e) => setName(e.target.value),
                      endAdornment: (
                        <InputAdornment position="end">
                          <People className={classes.inputIconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <CustomInput
                    labelText="Enter Price..."
                    id="price"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "number",
                      value: price, //did not add brackets
                      onChange: (e) => setPrice(Number(e.target.value)),
                      endAdornment: (
                        <InputAdornment position="end">
                          <LocalOfferIcon className={classes.inputIconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <CustomInput
                    labelText="image"
                    id="image"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                      value: image, //did not add brackets
                      onChange: (e) => setImage(e.target.value),
                      endAdornment: (
                        <InputAdornment position="end">
                          <PermMediaIcon className={classes.inputIconsColor}>
                            lock_outline
                          </PermMediaIcon>
                        </InputAdornment>
                      ),
                      autoComplete: "off",
                    }}
                  />
                  {/* file uploader START */}
                  <CustomInput
                    labelText="file"
                    id="file"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "file",
                      // value: image, //did not add brackets
                      onChange: uploadFileHandler,
                      endAdornment: (
                        <InputAdornment position="end">
                          <PermMediaIcon className={classes.inputIconsColor}>
                            lock_outline
                          </PermMediaIcon>
                        </InputAdornment>
                      ),
                      autoComplete: "off",
                    }}
                  />
                  {/* <div>
                    <input
                      type="file"
                      placeholder="Enter Image"
                      onChange={uploadFileHandler}
                    />
                  </div> */}
                  {uploading && <Loader />}
                  {/* <button onClick={uploadFileHandler}>Upload!</button> */}
                  {/* {this.fileData()} */}
                  {/* file uploader END */}
                  <CustomInput
                    labelText="Brand"
                    id="brand"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      required: true,
                      type: "text",
                      value: brand,
                      onChange: (e) => setBrand(e.target.value),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputIconsColor}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      ),
                      autoComplete: "off",
                    }}
                  />
                  <CustomInput
                    labelText="Enter Stock..."
                    id="countInStock"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "number",
                      value: countInStock, //did not add brackets
                      onChange: (e) => setCountInStock(Number(e.target.value)),
                      endAdornment: (
                        <InputAdornment position="end">
                          <LocalOfferIcon className={classes.inputIconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <CustomInput
                    labelText="Enter Category..."
                    id="category"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                      value: category, //did not add brackets
                      onChange: (e) => setCategory(e.target.value),
                      endAdornment: (
                        <InputAdornment position="end">
                          <CategoryIcon className={classes.inputIconsColor} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <CustomInput
                    labelText="Enter Description..."
                    id="description"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "text",
                      value: description, //did not add brackets
                      onChange: (e) => setDescription(e.target.value),
                      endAdornment: (
                        <InputAdornment position="end">
                          <DescriptionIcon
                            className={classes.inputIconsColor}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  <Button simple color="primary" size="lg" type="submit">
                    Update
                  </Button>
                </CardFooter>
              </form>
            )}
          </Card>
        </GridItem>
      </GridContainer>
    </div>
    // {/* </div1> */}
  );
}
