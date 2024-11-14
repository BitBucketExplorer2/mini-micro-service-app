import React, { useState } from "react";
import axios from "axios";
import { comment_url } from "../config";
const AddComment = ({ postId, ...rest }) => {
	const [content, setContent] = useState("");

	const submitHandler = async (event) => {
		event.preventDefault();
		await axios.post(`${comment_url}/posts/${postId}/comments`, { content });
		setContent("");
	};
	return (
		<div>
			<form action='' onSubmit={submitHandler}>
				<div className='form-group mb-3'>
					<label htmlFor='content' className='form-label'>
						New Comment
					</label>
					<input
						type='text'
						name='content'
						className='form-control'
						id='content'
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
				</div>
				<button className=' btn-secondary' style={{ float: "right" }}>
					Comment
				</button>
			</form>
		</div>
	);
};

export default AddComment;
