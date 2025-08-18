import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import './style.css'

const About = () => {
  return (
    <div>
        sdfsdfsdflsjdfkjwlekuriowuerlkj
    </div>
  );
};

About.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(About);
