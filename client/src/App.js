import React from "react";
import NewPost from "./components/NewPost";
import PostList from "./components/PostList";
const App = () => {
	return (
		<div className='container'>
			{/* <div style={{ marginLeft: 20, width: 260 }} className='container'> */}
			<h1>Add New Post</h1>
			<NewPost />
			<div style={{ marginTop: 60 }}>
				<PostList />
			</div>
		</div>
	);
};

export default App;
