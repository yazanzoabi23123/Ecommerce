import { ExpandMore, ShoppingCartOutlined } from "@mui/icons-material";
import {
  Badge,
  Container,
  IconButton,
  InputBase,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ROUTES from "../../routes/routesModel";
import NavBarLink from "../../routes/components/NavBarLink";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useGetproductByNameQuery } from "../../Redux/product";
import { useUser } from "../../Users/providers/UserProvider";
import Logged from "./Logged";
import NavBar from "./menu/NavBar";

const Search = styled("div")(({ theme }) => ({
  flexGrow: 0.4,
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid #777",
  "&:hover": {
    border: "1px solid #333",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "266px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "330px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#777",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const options = ["All Categories", "CAR", "Clothes", "Electronics"];

const Header2 = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);
  const { user } = useUser();

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // document.querySelector('Person2OutlinedIcon').addEventListener('click')
  const theme = useTheme();
  // const setOpen = useMenu();
  const [searchResults, setSearchResults] = useSearchParams();

  const handleSubmit = (e) => e.preventDefault();

  const handleSearchChange = (e) => {
    setSearchResults({ q: e.target.value });
    console.log(searchResults.get("q"));
  };
  const navigate = useNavigate();

  return (
    
    <Container sx={{ my: 1, display: "flex", justifyContent: "space-between" ,bottom: 0, left: 0, right: 0  }}>
      <NavBarLink to={ROUTES.ROOT}>
        <Stack alignItems={"center"}>
          <ShoppingCartOutlined />

          <Typography variant="body2">E-commerce</Typography>
        </Stack>
      </NavBarLink>
      <Search
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          borderRadius: "22px",
          justifyContent: "space-between",
        }}
      >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          type="text"
          onChange={handleSearchChange}
          onSubmit={handleSubmit}
          id="search"
        />

        <div>
          
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "lock-button",
              role: "listbox",
            }}
          >
            {options.map((option, index) => (
              <MenuItem
                sx={{ fontSize: "13px" }}
                key={option}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </Search>

      <Stack direction={"row"} alignItems={"center"}>
        <NavBar/>
      </Stack>
    </Container>
  );
};

export default Header2;
