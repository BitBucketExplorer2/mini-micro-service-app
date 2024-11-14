import React, { Fragment, useState } from "react";
import axios from "axios";
import { post_url } from "../config";
const NewPost = () => {
	const initPost = {
		title: "",
		description: "",
	};
	const [newPost, setNewPost] = useState(initPost);
	const { title, description } = newPost;

	const submitHandler = async (event) => {
		event.preventDefault();
		await axios.post(`${post_url}/post`, newPost);
		setNewPost(initPost);
	};

	const changeHandler = (e) => {
		setNewPost({ ...newPost, [e.target.name]: e.target.value });
	};

	return (
		<Fragment>
			<form action='' onSubmit={submitHandler}>
				<div className='input-elements'>
					<div className='mb-3'>
						<label htmlFor='title' className='form-label'>
							Title
						</label>
						<input
							id='title'
							name='title'
							className='form-control'
							type='text'
							value={title}
							onChange={changeHandler}
						/>
					</div>
					<div className='mb-3'>
						<label htmlFor='description' className='form-label'>
							Description
						</label>
						<textarea
							name='description'
							id='description'
							cols='30'
							rows='4'
							className='form-control'
							value={description}
							onChange={changeHandler}></textarea>
					</div>
				</div>
				<button className='btn btn-primary' style={{ float: "left" }}>
					Submit
				</button>
			</form>
		</Fragment>
	);
};

export default NewPost;
