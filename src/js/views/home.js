import React from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => (
	<div className="text-center mt-5">
		<Link to="/contactList">
			<button className="btn btn-primary">ContactList</button>
		</Link>
	</div>
);
