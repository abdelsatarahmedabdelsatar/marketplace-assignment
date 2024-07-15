import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance/instance";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { toast } from "sonner";
import Spinner from "../Spinner";

function DomainDetails() {
  const { id } = useParams();
  const [domain, setDomain] = useState({});
  const [bids, setBids] = useState([]);
  const [bidValue, setBidValue] = useState("");
  const [loader, setLoader] = useState(true);
  const [loaderBtn, setLoaderBtn] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const handleAddBid = () => {
    setLoaderBtn(true);
    if (bidValue) {
      axiosInstance
        .post(
          "/bid",
          {
            domain_id: domain.id,
            amount: bidValue,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("acc-token")}`,
            },
          }
        )
        .then((res) => {
          toast.success("bid added");
          setLoaderBtn(false);
          setRefresh(!refresh);
          setBidValue("");
        })
        .catch((err) => {
          toast.error("bid mount shoud be more");
          setLoaderBtn(false);
        });
    } else {
      toast.error("enter bid mount");
      setLoaderBtn(false);
    }
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.selected,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  useEffect(() => {
    axiosInstance
      .get("/domains", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("acc-token")}`,
        },
      })
      .then((res) => {
        setDomain(res.data.data.find((d) => d.id == id));
        setLoader(false);
        console.log(res.data.data.find((d) => d.id == id));
      });

    axiosInstance
      .get(`/domains/${id}/bids`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("acc-token")}`,
        },
      })
      .then((res) => {
        setBids(res.data.data);
        console.log(res.data);
      });
  }, [refresh]);

  return (
    <>
      {loader ? (
        <div className="pt-28">
          <Spinner color="#333" size={100} />
        </div>
      ) : (
        <>
          <h2 className="text-center text-4xl font-semibold my-7 ">
            {domain?.domain}
          </h2>

          <div className="lg:flex justify-center">
            <div className="border-2 border-zinc-300 inline-block w-4/12 mx-4 p-5 text-start  ">
              <span
                className="bg-indigo-800 text-white  text-2xl px-2"
                style={{ letterSpacing: "2px" }}
              >
                Time Left
              </span>

              <div className="grid grid-cols-4 gap-10 text-5xl font-bold justify-center text-center mt-4">
                <div>00</div>
                <div>12</div>
                <div>56</div>
                <div>17</div>
              </div>
              <div className="grid grid-cols-4 gap-10 justify-center text-center mb-4">
                <div>days</div>
                <div>hours</div>
                <div>mins</div>
                <div>sec</div>
              </div>

              <span
                className="bg-indigo-800 text-white  text-2xl px-2"
                style={{ letterSpacing: "2px" }}
              >
                Currenr Bid
              </span>
              <div className="grid grid-cols-3 gap-10 text-5xl font-semibold justify-center text-center my-6">
                <div>SAR</div>
                <div>1,000</div>
              </div>

              <div className="flex">
                <input
                  type="text"
                  className="w-8/12 rounded-0 border-0 py-4 px-3 me-3 bg-gray-200"
                  placeholder="SAR 1100"
                  value={bidValue}
                  onChange={(event) => {
                    setBidValue(event.target.value);
                  }}
                />

                <Button
                  onClick={handleAddBid}
                  disabled={loaderBtn}
                  size="large"
                  color="success"
                  style={{
                    borderRadius: "0px",
                    boxShadow: "none",
                    backgroundColor: loaderBtn ? "#8F8" : "#2C2",
                  }}
                  variant="contained"
                >
                  {loaderBtn ? (
                    <div className="mx-7">
                      <Spinner color={"#FFF"} size={23} />
                    </div>
                  ) : (
                    "Place bid"
                  )}
                </Button>
              </div>
            </div>
            <div className="border-2 border-zinc-300 inline-block w-4/12 mx-4 p-5 text-start ">
              <span
                className="bg-indigo-800 text-white  text-2xl px-2"
                style={{ letterSpacing: "2px" }}
              >
                lasted Bids
              </span>
              <TableContainer component={Paper} className="mt-3">
                <Table aria-label="customized table">
                  <TableBody>
                    {bids.map((b) => {
                      return (
                        <StyledTableRow key={b.id}>
                          <StyledTableCell align="left">
                            {b.user.name}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            SAR {b.amount}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {b.created_at.split(" ")[0]}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default DomainDetails;
