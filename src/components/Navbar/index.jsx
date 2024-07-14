import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";

import {Drawer,List,ListItem,Hidden,Button,Container,Typography,IconButton,Toolbar,Box,AppBar} from "@mui/material";

import { useState } from "react";
import Modal from "../Modal";

function Navbar() {
    const [open,setOpen] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = ()=> {
      localStorage.removeItem("acc-token");
      window.location.reload();
  }

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (<>
    <AppBar
      position="static"
      color=""
      className="flex align-bottom py-7"
      style={{ boxShadow: "0px 0px 20px 1px #CCC" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src="./logo.png" alt="" srcSet="" width={73} className="mx-4" />
          <Typography
            variant="h6"
            component="a"
            sx={{
              width: "90px",
              fontWeight: "900",
              fontSize: "26px",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            DOMAINS MARKETPLACE
          </Typography>

          <Box sx={{ flexGrow: 1, display: "flex" }}></Box>

          <Box>
            <Hidden smDown>
              <Button
                size="large"
                color="inherit"
                style={{
                  borderRadius: "0px",
                  boxShadow: "none",
                  marginRight: "20px",
                }}
                onClick={()=>window.location.assign("/")}
              >
                Home
              </Button>
              <Button
                size="large"
                color="success"
                style={{
                  borderRadius: "0px",
                  boxShadow: "none",
                  backgroundColor: "#2A2",
                }}
                variant="contained"
                onClick={()=>setOpen(true)}
              >
                Logout
              </Button>
            </Hidden>

            <Hidden smUp>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="top"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                <div
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                  className="m-auto"
                >
                  <List>
                    <ListItem>
                      <Button
                        size="large"
                        color="inherit"
                        style={{
                          borderRadius: "0px",
                          boxShadow: "none",
                          marginLeft:"17px"
                        }}
                        onClick={()=>window.location.assign("/")}
                      >
                        Home
                      </Button>
                    </ListItem>
                    <ListItem>
                      <Button
                        size="large"
                        color="success"
                        style={{
                          borderRadius: "0px",
                          boxShadow: "none",
                          backgroundColor: "#2A2",
                        }}
                        variant="contained"
                        onClick={()=>setOpen(true)}
                      >
                        Logout
                      </Button>
                    </ListItem>
                  </List>
                </div>
              </Drawer>
            </Hidden>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <Modal open={open} desc = {"are you sure for logout !"} setOpen={setOpen} handleFun = {handleLogout} />
    </>
  );
}
export default Navbar;
