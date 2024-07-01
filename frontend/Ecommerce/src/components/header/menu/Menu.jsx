import MuiMenu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import ROUTES from "../../../routes/routesModel";
import { useUser } from "../../../Users/providers/UserProvider";
import useUsers from "../../../Users/hooks/useUsers";
import MenuLink from "../../../routes/components/MenuLink";
import NavBarLink from "../../../routes/components/NavBarLink";
import { IconButton, useTheme ,Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";

const Menu = ({ isOpen, anchorEl, onClose }) => {
  const { user } = useUser();
  const { handleLogout } = useUsers();
  const theme = useTheme();

  const onLogout = () => {
    handleLogout();
    onClose();
  };
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));
  return (
    <MuiMenu
      open={isOpen}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Box>
        <MenuLink
          text="about"
          navigateTo={ROUTES.ABOUT}
          onClick={onClose}
          styles={{ display: { xs: "block", md: "none" } }}
        />

        {!user && (
          <>
            <NavBarLink to={ROUTES.CART}>
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={4} color="primary">
            <ShoppingCartIcon 
           
            />
          </StyledBadge>
        </IconButton>
        </NavBarLink>
          </>
        )}
        {user && (
          <>
            <MenuLink
              text="profile"
              navigateTo={ROUTES.USER_PROFILE}
              onClick={onClose}
            />
            <MenuLink
              text="edit account"
              navigateTo={ROUTES.EDIT_USER}
              onClick={onClose}
            />
            <MenuItem onClick={onLogout}>Logout</MenuItem>
          </>
        )}
      </Box>
    </MuiMenu>
  );
};

export default Menu;