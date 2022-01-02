import React from 'react'
import { FormGroup, FormControl, Button } from "react-bootstrap";
import Select from "react-select";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

export default function User(e) {
	const firstname = useRef()
	const lastname = useRef()
	const email = useRef()
	const username = useRef()
	const password = useRef()
	const [gender, setGender] = useState(1);
	const [country, setCountry] = useState(1);

	const [isFillingForm, setIsFillingForm] = useState(false)

	const handleGender = (event) => {
		setGender(event.target.value)
	}

	const handleCountry = (event) => {
		setCountry(event.target.value)
	}

	const handleCreate = async (e) => {
		e.preventDefault()

		setIsFillingForm(true)

		const user = {
			firstName: firstname.current.value,
			lastName: lastname.current.value,
			email: email.current.value,
			userName: username.current.value,
			password: password.current.value,
			gender: gender,
			country: country
		}

		try {
			await axios.post('http://localhost:8800/api/users', user)
		} catch (error) {
			setIsFillingForm(false)
			alert(error)
		}
	}

	return (
		<div className="createuser">
			<form>
				<input placeholder='First Name' ref={firstname} className="firstName" /><br />
				<input placeholder='Last Name' ref={lastname} className="lastName" /><br />
				<input placeholder='Email' ref={email} className="email" /><br />
				<input placeholder='Username' ref={username} className="userName" /><br />
				<input placeholder='Password' type='password' ref={password} className="password" /><br />

				<select value={gender} onChange={handleGender}>
					<option value="1">Male</option>
					<option value="2">Female</option>
					<option value="3">Unspecified</option>
				</select>

				<select value={country} onChange={handleCountry}>
					<option value="0">United States</option>
					<option value="1">Canada</option>
					<option value="2">Australia</option>
					<option value="3">India</option>
				</select>
			</form>

			<button onClick={handleCreate} className="createUser">Sign Up</button><br/><br/>
			<Link to='/scrape'>Go to Scrape page</Link><br/><br/>
			{isFillingForm ? <h2>Signing Up to Poshmark...</h2>: ''}
		</div>
	)

}