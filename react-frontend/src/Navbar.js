import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from '@mui/icons-material/Adb';
// import { Link } from '@mui/material';
import { isAuthenticated } from "./auth";
import { useNavigate } from "react-router-dom";

const authenticated_pages = ["New Event", "My Events", "Log Out"];
const authenticated_routes = [
    "/seller/events/add",
    "/seller/events/view",
    "/seller/login",
];

const not_authenticated_pages = ["All Tickets", "Log In"];
const not_authenticated_routes = ["/buyer/home", "/seller/login"];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (path) => {
        setAnchorElNav(null);

        if (path == "/seller/login") {
            localStorage.removeItem("user");
        }

        navigate(path);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}>
                        COMET
                    </Typography>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}>
                        COMET
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                            justifyContent: "flex-end",
                        }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}>
                            {isAuthenticated()
                                ? authenticated_pages.map((page, i) => (
                                      <MenuItem
                                          key={page}
                                          onClick={() =>
                                              handleCloseNavMenu(
                                                  authenticated_routes[i]
                                              )
                                          }
                                          sx={{ justifyContent: "center" }}>
                                          <Typography textAlign="center">
                                              {page}
                                          </Typography>
                                      </MenuItem>
                                  ))
                                : not_authenticated_pages.map((page, i) => (
                                      <MenuItem
                                          key={page}
                                          onClick={() =>
                                              handleCloseNavMenu(
                                                  not_authenticated_routes[i]
                                              )
                                          }
                                          sx={{ justifyContent: "center" }}>
                                          <Typography textAlign="center">
                                              {page}
                                          </Typography>
                                      </MenuItem>
                                  ))}
                        </Menu>
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                            justifyContent: "flex-end",
                        }}>
                        {isAuthenticated()
                            ? authenticated_pages.map((page, i) => (
                                  <MenuItem
                                      key={page}
                                      onClick={() =>
                                          handleCloseNavMenu(
                                              authenticated_routes[i]
                                          )
                                      }
                                      sx={{ justifyContent: "center" }}>
                                      <Typography textAlign="center">
                                          {page}
                                      </Typography>
                                  </MenuItem>
                              ))
                            : not_authenticated_pages.map((page, i) => (
                                  <MenuItem
                                      key={page}
                                      onClick={() =>
                                          handleCloseNavMenu(
                                              not_authenticated_routes[i]
                                          )
                                      }
                                      sx={{ justifyContent: "center" }}>
                                      <Typography textAlign="center">
                                          {page}
                                      </Typography>
                                  </MenuItem>
                              ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;
