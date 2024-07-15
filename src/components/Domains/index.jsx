import { Box, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import axiosInstance from "./../../axiosInstance/instance";
import DomainTemplate from "./DomainTemplate/index";

function Domains() {
  const [domains, setDomains] = useState([]);
  const [loader, setLoader] = useState(true);

  const [page, setPage] = useState(1);
  const itemsPerPage = 9;

  const handleChange = (event, value) => {
    setPage(value);
  };

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
        <div className="grid gap-5 py-14  mx-16 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {shownDomains.map((d) => {
            return <DomainTemplate domain={d} key={d.id} />;
          })}
      
           
          
        </div>
        
        <Box mb={5} display="flex" justifyContent="center">
           <Pagination
              variant="outlined" shape="rounded"
              count={Math.ceil(domains.length / itemsPerPage)}
              page={page}
              onChange={handleChange}
              color="primary"
            />
         </Box>
        </>
        
      )}
    </>
  );
}

export default Domains;
