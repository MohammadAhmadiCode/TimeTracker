import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import styled from "styled-components";

const Page = (props) => {
  const baseTitle = "TimeTracker";

  return (
    <>
      <Head>
        <title>
          {props.title ? `${props.title} — ${baseTitle}` : baseTitle}
        </title>
      </Head>
      {props.children}
    </>
  );
};

Page.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default Page;