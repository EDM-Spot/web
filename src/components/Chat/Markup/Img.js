import React from 'react';
import PropTypes from 'prop-types';

const Img = ({ children, href, ...props }) => (
  <img
    src={href}
    alt={href}
    width="60%"
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  />
);

Img.propTypes = {
  children: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default Img;
