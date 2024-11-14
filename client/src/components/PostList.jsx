import React, { useEffect, useState } from "react";
import axios from "axios";
import { post_url, query_url } from "../config";
import AddComment from "./AddComment";
import CommentList from "./CommentList";
const PostList = () => {
	const [postList, setPostList] = useState({});
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const fetchPosts = async () => {
		const response = await axios.get(`${query_url}/posts`, config);
		setPostList(response.data);
	};
	useEffect(() => {
		fetchPosts();
	}, []);

	const renderdPosts = Object.values(postList).map((post) => {
		return (
			<div
				className='card'
				style={{ width: "30%", marginBottom: 20 }}
				key={post.id}>
				<div className='card-body'>
					<h5 className='card-title'>{post.title}</h5>
					<p className='card-text'>{post.description}</p>
					<CommentList comments={post.comments} />
					<AddComment postId={post.id} />
				</div>
			</div>
		);
	});

	return (
		<div className='d-flex flex-row flex-wrap justify-content-between'>
			{renderdPosts}
		</div>
	);
};

export default PostList;
