const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
	posts: [{
			id: 1,
			message: 'I`m first Post!',
			likesСount: 3
		},
		{
			id: 2,
			message: 'I`m second Post!',
			likesСount: 12
		},
		{
			id: 3,
			message: 'I`m third Post!',
			likesСount: 0
		},
		{
			id: 4,
			message: 'I`m fourth Post!',
			likesСount: 2
		},
	],
	newPostText: 'New Post Text',
}

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST:
			let newPost = {
				id: state.posts.length + 1,
				message: state.newPostText,
				likesСount: 0,
			};
			return {
				...state,
				posts: [...state.posts, newPost],
					newPostText: 'New Post Text'
			};

		case UPDATE_NEW_POST_TEXT:
			return {
				...state,
				newPostText: action.newText
			};

		default:
			return state;
	}
};

export const addPostCreator = () => ({
	type: ADD_POST
});
export const updateNewPostTextCreator = (text) => ({
	type: UPDATE_NEW_POST_TEXT,
	newText: text,
});

export default profileReducer;