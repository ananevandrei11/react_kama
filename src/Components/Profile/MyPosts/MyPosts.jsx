import React from "react";
import Post from "./Post/Post";
import classes from './MyPosts.module.css';

const MyPosts = (props) => {
    const posts = props.myPosts;

    const content = posts.map((post) =>
        <Post key={post.id} idItem={`item-${post.id}`}
            children={
                <>
                    <h3>{"Post " + post.id}</h3>
                    <p>{post.message}</p>
                    <i>{"Likes " + post.likesСount}</i>
                </>
            }
        />
    );

    let newPostELem = React.createRef();

    let addPost = (e) => {
        e.preventDefault();
        props.addPost();
    }

    let onPostChange = (e) => {
        e.preventDefault();
        let text = newPostELem.current.value;
        props.updatePost(text);
    }

    return (
        <section className={classes.posts}>
            <h2 className={classes.title}>My Posts</h2>
            <form className={classes.newpost}>
                <textarea
                    ref={newPostELem}
                    name="newpost"
                    id="newpost"
                    cols="30"
                    rows="10"
                    value={props.newPostText}
                    onChange={onPostChange}
                ></textarea>
                <button onClick={addPost}>Add New Post</button>
            </form>
            {content}
        </section>
    );
}

export default MyPosts;