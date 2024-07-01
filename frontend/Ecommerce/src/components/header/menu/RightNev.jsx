import { IconButton ,Badge } from '@mui/material';
import { useUser } from '../../../Users/providers/UserProvider';
import React from 'react'
import NavBarLink from '../../../routes/components/NavBarLink';
import ROUTES from '../../../routes/routesModel';
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";
import Logged from '../Logged';

export default function RightNev() {
    const { user } = useUser();
    const StyledBadge = styled(Badge)(({ theme }) => ({
        "& .MuiBadge-badge": {
          right: -3,
          top: 13,
          border: `2px solid ${theme.palette.background.paper}`,
          padding: "0 4px",
        },
      }));

  return (
    <>
      <NavBarLink to={ROUTES.CART}>
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={4} color="primary">
            <ShoppingCartIcon 
           
            />
          </StyledBadge>
        </IconButton>
        </NavBarLink>
        {!user && (
          <>
        <IconButton>
          <NavBarLink to={ROUTES.SIGNUP}>
            <Person2OutlinedIcon />
          </NavBarLink>
        </IconButton>
        </>
        )}
         {user && (
          <>
          <Logged/>
        </>
         )}
    </>
  )
}
