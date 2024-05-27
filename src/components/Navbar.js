import React, { Component } from "react";
import { Outlet, Link } from "react-router-dom";
import Footer from "./Footer";
import api, { isAuthenticated } from "../api/axios";

class Navbar extends Component {
	render() {
		return (
			<>
				<header>
					<nav>
						<Link to="/">
							<a href="">HOME</a>
						</Link>
						<Link to="/books">
							<a href="">BOOKS</a>
						</Link>
						{isAuthenticated() ? (
							<Link to="/logout">LOGOUT</Link>
						) : (
							<Link to="/login">LOGIN</Link>
						)}
					</nav>
				</header>
				<Outlet />
				<Footer />
			</>
		);
	}
}

export default Navbar;
