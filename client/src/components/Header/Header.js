import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Container } from 'react-bootstrap';

const Header = ({ title }) => (
	<Navbar bg="dark" variant="dark">
		<Container className="justify-content-md-center">
			<div className="navbar-brand">{title}</div>
		</Container>
	</Navbar>
);

Header.propTypes = {
	title: PropTypes.string,
};

export default Header;
