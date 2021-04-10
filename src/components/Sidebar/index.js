import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, Button } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import {
  searchCategories,
  searchUniversities,
  searchCities,
  searchEventCategories,
  getCities,
  getCategories,
  getEventCategories
} from "../../apis/global-api";
import { commonStyles, desktopStyles, mobileStyles, TabStyles } from "./styles";
import { useRouter } from "next/router";
import TuneIcon from "@material-ui/icons/Tune";
import {
  SELECTED_FILTER_UNIVERSITY,
  PAGE_PRODUCTS,
  SELECTED_FILTER_RESET,
} from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { addVisited } from "../../redux/actions/PageVisited";

const useStyles = makeStyles((theme) => ({
  ...commonStyles,
  [theme.breakpoints.up("sm")]: desktopStyles,
  [theme.breakpoints.between("xs", "sm")]: TabStyles,
  [theme.breakpoints.down("xs")]: mobileStyles,
}));

function Sidebar({ type = "", showFilterBtn = false, m_uni, query }) {
  const [categories, setcategories] = useState([]);
  const [selectedCategories, setselectedCategories] = useState([]);
  const [universities, setuniversities] = useState([]);
  const [selecteduniversities, setselecteduniversities] = useState([]);
  const [Cities, setCities] = useState([]);
  const [selectedCities, setselectedCities] = useState([]);
  const [producttype, setproducttype] = useState([]);
  const [uniMsg, setUniMsg] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const pageVisited = useSelector((state) => state.pageVisited);

  const handleTypeChange = (x) => {
    setproducttype(
      producttype.includes(x)
        ? producttype.filter((c) => c !== x)
        : [...producttype, x]
    );
  };

  useEffect(() => {
    if (type == "events") {
      getEventCategories().then((response) => {
        setcategories(response.categories.data);
      });
    } else {
      getCategories().then((response) => {
        setcategories(response.categories.data);
      });
    }
  }, [])

  useEffect(() => {
    console.log("query", query);
    setshowsidebar(!showFilterBtn);

    // console.log('pageVisited',pageVisited.includes(PAGE_PRODUCTS))
    let { m_city, m_cat, type } = query;
    if (m_uni) {
      if (!selecteduniversities.length && m_uni) {
        const now = new Date();

        searchUniversities(m_uni).then((response) => {
          setselecteduniversities(response);
          setExpanded("panel3");
          let data = {
            response: response,
            expiry: now.getTime(),
          };

          localStorage.setItem(
            SELECTED_FILTER_UNIVERSITY,
            JSON.stringify(data)
          );
        });
      }
    }
    if (!selectedCities.length && m_city) {
      searchCities(m_city).then((response) => {
        setselectedCities(response.data);
        setExpanded("panel2");
      });
    }
    if (!selectedCategories.length && m_cat) {
      searchCategories(m_cat).then((response) => {
        setselectedCategories(response.data);
        setExpanded("panel1");
      });
    }
    if (!producttype.length && type) {
      handleTypeChange(type);
    }
  }, [m_uni]);

  const handleCatSearch = (e) => {
    console.log(type);
    let value = e ? e.target.value : "";
    if (!value) {
      setcategories([]);
      return;
    }
    if (type == "events") {
      searchEventCategories(value).then((response) => {
        setcategories(response.data);
      });
    } else {
      searchCategories(value).then((response) => {
        setcategories(response.data);
      });
    }
  };

  const handleUniSearch = (e) => {
    let value = e ? e.target.value : "";
    if (!value) {
      setuniversities([]);
      return;
    }
    searchUniversities(value).then((response) => {
      setuniversities(response);
    });
  };

  const handleCitySearch = (e) => {
    let value = e ? e.target.value : "";
    if (!value) {
      setCities([]);
      return;
    }
    searchCities(value).then((response) => {
      console.log("college", response);
      setCities(response.data);
    });
  };

  const [state, setState] = useState([]);

  const handleChange = (event, type, val) => {
    console.log(event.target.checked);
    console.log(type);
    console.log(val);
    if (type == "category") {
      if (selectedCategories.some((item) => item.id === val.id)) {
        setselectedCategories(
          selectedCategories.filter((c) => c.id !== val.id)
        );
      } else {
        setselectedCategories([...selectedCategories, val]);
      }
      console.log(selectedCategories);
    }
    if (type == "cities") {
      if (selectedCities.some((item) => item.id === val.id)) {
        setselectedCities(selectedCities.filter((c) => c.id !== val.id));
      } else {
        setselectedCities([...selectedCities, val]);
      }
    }
    if (type == "university") {
      if (selecteduniversities.some((item) => item.id === val.id)) {
        setselecteduniversities(
          selecteduniversities.filter((c) => c.id !== val.id)
        );
      } else {
        setselecteduniversities([...selecteduniversities, val]);
      }
    }

    // setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [expanded, setExpanded] = React.useState("panel1");
  const handlePanelChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const { mobile, sports, cars } = state;
  const classes = useStyles();

  const filterSearch = () => {
    let cities = selectedCities.map((v) => v.name).join(",");

    let categories = selectedCategories.map((v) => v.name).join(",");
    let universities = selecteduniversities.map((v) => v.name).join(",");
    console.log(cities, categories, universities);
    if (!universities.length) {
      localStorage.setItem(SELECTED_FILTER_RESET, true);
    }
    let p_type = producttype.length == 1 ? producttype[0] : "";
    let query =
      "?m_city=" +
      cities +
      "&m_cat=" +
      categories +
      "&m_uni=" +
      universities +
      "&type=" +
      p_type;
    let reqquery = "?m_uni=" + universities;
    if (type == "events") {
      window.location.replace("/events" + query);

      // router.push("/events" + query);
    } else if (type == "requests") {
      window.location.replace("/buy-request" + reqquery);

      // router.push("/events" + query);
    } else {
      window.location.replace("/products" + query);

      // router.push("/products" + query);
    }
  };
    
  const toggle = () => {
    setshowsidebar(!showsidebar);
  };

  const [showsidebar, setshowsidebar] = React.useState(false);
  // const [showsidebar, setshowsidebar] = React.useState(!showFilterBtn);

  return (
    <>
      {showFilterBtn && (
        <Button className={classes.fliterBtn} onClick={toggle}>
          <TuneIcon />
          Filter
        </Button>
      )}
      {showsidebar && (
        <>
          <div className={classes.root}>
            <Typography variant="h6" className={classes.heading}>
              FILTER
            </Typography>
            {type != "events" && type != "requests" && (
              <Accordion
                expanded={expanded === "panel0"}
                onChange={handlePanelChange("panel0")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel0a-content"
                  id="panel0a-header"
                >
                  <Typography variant="h6" className={classes.title}>
                    Type
                  </Typography>
                </AccordionSummary>
                <Checkbox
                  value="buy"
                  checked={producttype.includes("buy")}
                  inputProps={{ "aria-label": "Checkbox A" }}
                  onChange={() => handleTypeChange("buy")}
                />{" "}
                Buy
                <Checkbox
                  value="rental"
                  checked={producttype.includes("rental")}
                  inputProps={{ "aria-label": "Checkbox A" }}
                  onChange={() => handleTypeChange("rental")}
                />
                Rent
              </Accordion>
            )}
            {type != "requests" && (
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handlePanelChange("panel1")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h6" className={classes.title}>
                    Category
                  </Typography>
                </AccordionSummary>
                <input
                  className={classes.searchField}
                  type="text"
                  placeholder="search Categoty"
                  onKeyUp={handleCatSearch}
                />
                <AccordionDetails>
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormGroup>
                      {categories &&
                        categories.map((cat) => (
                          <FormControlLabel
                            key={cat.id}
                            control={
                              <Checkbox
                                onChange={(e) =>
                                  handleChange(e, "category", cat)
                                }
                                color="primary"
                              />
                            }
                            label={cat.name}
                            checked={
                              selectedCategories.filter(
                                (item) => item.id == cat.id
                              ).length > 0
                            }
                          />
                        ))}
                    </FormGroup>
                  </FormControl>

                  {categories && categories.length < 1 && selectedCategories.length > 0 && (
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormGroup>
                        {selectedCategories &&
                          selectedCategories.map((cat) => (
                            <FormControlLabel
                              key={cat.id}
                              control={
                                <Checkbox
                                  onChange={(e) =>
                                    handleChange(e, "category", cat)
                                  }
                                  color="primary"
                                />
                              }
                              checked={true}
                              label={cat.name}
                            />
                          ))}
                      </FormGroup>
                    </FormControl>
                  )}
                </AccordionDetails>
              </Accordion>
            )}
            {type != "requests" && (
              <Accordion
                expanded={expanded === "panel2"}
                onChange={handlePanelChange("panel2")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="h6" className={classes.title}>
                    City
                  </Typography>
                </AccordionSummary>
                <input
                  className={classes.searchField}
                  type="text"
                  placeholder="search City"
                  onKeyUp={handleCitySearch}
                />
                <AccordionDetails>
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormGroup>
                      {Cities &&
                        Cities.map((cat) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={(e) => handleChange(e, "cities", cat)}
                                color="primary"
                                name="mobile"
                              />
                            }
                            label={cat.name}
                            checked={
                              selectedCities.filter((item) => item.id == cat.id)
                                .length > 0
                            }
                          />
                        ))}
                    </FormGroup>
                  </FormControl>
                  {Cities.length < 1 && selectedCities.length > 0 && (
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <FormGroup>
                        {selectedCities &&
                          selectedCities.map((cat) => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={(e) =>
                                    handleChange(e, "cities", cat)
                                  }
                                  color="primary"
                                />
                              }
                              checked={true}
                              label={cat.name}
                            />
                          ))}
                      </FormGroup>
                    </FormControl>
                  )}
                </AccordionDetails>
              </Accordion>
            )}
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handlePanelChange("panel3")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6" className={classes.title}>
                  College
                </Typography>
              </AccordionSummary>
              <input
                className={classes.searchField}
                type="text"
                placeholder="search College"
                onKeyUp={handleUniSearch}
              />
              <AccordionDetails>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormGroup>
                    {universities &&
                      universities.map((cat) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={(e) =>
                                handleChange(e, "university", cat)
                              }
                              color="primary"
                              name="mobile"
                            />
                          }
                          label={cat.name}
                        />
                      ))}
                  </FormGroup>
                </FormControl>

                {universities.length < 1 && selecteduniversities.length > 0 && (
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormGroup>
                      {selecteduniversities &&
                        selecteduniversities.map((cat) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                onChange={(e) =>
                                  handleChange(e, "university", cat)
                                }
                                color="primary"
                              />
                            }
                            checked={true}
                            label={cat.name}
                          />
                        ))}
                    </FormGroup>
                  </FormControl>
                )}
              </AccordionDetails>
            </Accordion>
          </div>
          <Button className={classes.filterBtn} onClick={filterSearch}>
            Filter
          </Button>
        </>
      )}
    </>
  );
}

export default Sidebar;
