import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import axiosInstance from "./../../axiosInstance/instance";
import DomainTemplate from "./DomainTemplate/index";

function Domains() {
  const [domains, setDomains] = useState([]);
  const [loader, setLoader] = useState(true);

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
        <div className="grid grid-cols-3 gap-10 py-14  mx-16">
          {domains.map((d) => {
            return <DomainTemplate domain={d} key={d.id}/>;
          })}
        </div>
      )}
    </>
  );
}

export default Domains;
