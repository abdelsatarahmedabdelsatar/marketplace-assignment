import { Box, Pagination, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import Spinner from "../Spinner";
import axiosInstance from "../../axiosInstance/instance";
import DomainTemplate from "./DomainTemplate/index";

function MarketplaceDomains() {
  const [domains, setDomains] = useState([]);
  const [loader, setLoader] = useState(true);

  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const [filteredName, setFilteredName] = useState("active");

  const handleToggleChange = (event, name) => {
    setFilteredName(name);
  };
  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleFilteration = () => {

    
  }

  const shownDomains = domains.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  useEffect(() => {
    axiosInstance
      .get("/domains", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("acc-token")}`,
        },
      })
      .then((res) => {
        setDomains(res.data.data);
        setLoader(false);
        console.log(res.data.data);
      });
  }, []);

  return (
    <>
      {loader ? (
        <div className="pt-28">
          <Spinner color="#333" size={100} />
        </div>
      ) : (
        <>
        <ToggleButtonGroup
              className="mt-9"
              color="success"
              value={filteredName}
              exclusive
              onChange={handleToggleChange}
              aria-label="Platform"
            >
              <ToggleButton style={{borderRadius:"0px",width:"160px"}} value="active">Active</ToggleButton>
              <ToggleButton style={{borderRadius:"0px",width:"160px"}} value="upcoming">Upcoming</ToggleButton>
              <ToggleButton style={{borderRadius:"0px",width:"160px"}} value="closed">closed</ToggleButton>
            </ToggleButtonGroup>
          <div className="grid gap-5 py-8  mx-16 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            
            {shownDomains.map((d) => {
              return <DomainTemplate domain={d} key={d.id} />;
            })}
          </div>

          <Box mb={5} display="flex" justifyContent="center">
            <Pagination
              variant="outlined"
              shape="rounded"
              count={Math.ceil(domains.length / itemsPerPage)}
              page={page}
              onChange={handleChange}
              color="success"
            />
          </Box>
        </>
      )}
    </>
  );
}

export default MarketplaceDomains;
