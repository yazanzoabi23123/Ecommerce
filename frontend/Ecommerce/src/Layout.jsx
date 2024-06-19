import Footer from "./components/footer/footer";
import Header1 from "./components/header/Header1";
import Header2 from "./components/header/Header2";
import Header3 from "./components/header/Header3";
import Main from "./components/main/Main";
import main from "./components/main/Main";
import { node } from "prop-types";
import React from "react";


export default function Layout({ children }) {
  return (
    <>
      <Header1 />
      <Header2/>
      <Header3 />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: node.isRequired,
};