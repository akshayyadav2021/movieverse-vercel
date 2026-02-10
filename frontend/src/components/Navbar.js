import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MovieIcon from "@mui/icons-material/Movie";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <MovieIcon sx={{ mr: 1 }} />

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <RouterLink
            to="/"
            style={{ color: "white", textDecoration: "none" }}
          >
            MovieVerse
          </RouterLink>
        </Typography>

        {/* ================= DESKTOP MENU ================= */}
        {user && (
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button color="inherit" component={RouterLink} to="/">
              Home
            </Button>
            <Button color="inherit" component={RouterLink} to="/search">
              Search
            </Button>

            {isAdmin() && (
              <>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/admin/add-movie"
                >
                  Add Movie
                </Button>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/admin/movies"
                >
                  Manage Movies
                </Button>
              </>
            )}

            <Button color="inherit" onClick={handleLogout}>
              Logout ({user.name})
            </Button>
          </Box>
        )}

        {!user && (
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button color="inherit" component={RouterLink} to="/login">
              Login
            </Button>
            <Button color="inherit" component={RouterLink} to="/register">
              Register
            </Button>
          </Box>
        )}

        {/* ================= MOBILE MENU ================= */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {user ? (
              <>
                <MenuItem
                  component={RouterLink}
                  to="/"
                  onClick={handleMenuClose}
                >
                  Home
                </MenuItem>
                <MenuItem
                  component={RouterLink}
                  to="/search"
                  onClick={handleMenuClose}
                >
                  Search
                </MenuItem>

                {isAdmin() && (
                  <>
                    <MenuItem
                      component={RouterLink}
                      to="/admin/add-movie"
                      onClick={handleMenuClose}
                    >
                      Add Movie
                    </MenuItem>
                    <MenuItem
                      component={RouterLink}
                      to="/admin/movies"
                      onClick={handleMenuClose}
                    >
                      Manage Movies
                    </MenuItem>
                  </>
                )}

                <MenuItem onClick={handleLogout}>
                  Logout ({user.name})
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem
                  component={RouterLink}
                  to="/login"
                  onClick={handleMenuClose}
                >
                  Login
                </MenuItem>
                <MenuItem
                  component={RouterLink}
                  to="/register"
                  onClick={handleMenuClose}
                >
                  Register
                </MenuItem>
              </>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
