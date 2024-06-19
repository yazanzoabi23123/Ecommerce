import { node, object, string } from "prop-types";
import React from "react";
import { Link ,useMatch,useResolvedPath } from "react-router-dom";

export default function NavBarLink({to, children, ...porps}) {
  const resolvedPath = useResolvedPath(to)
  const isActive= useMatch({path:resolvedPath.pathname,end:true})
  return (
   

     <Link to={to} {...porps} className={isActive ? "active" : ""} >
      {children}
    </Link>
   
     
  );
}
NavBarLink.propTypes = {
  to: string.isRequired,
  children: node.isRequired,
  sx: object,
};

NavBarLink.defaultProps = {
  sx: { color: "#000" },
};