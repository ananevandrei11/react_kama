import { render, screen } from "@testing-library/react";
import profileReducer, {
  addPostCreator,
  deletePostCreator,
} from "./profileReducer";

let state = {
  posts: [
    {
      id: 1,
      message: "I`m first Post!",
      likesСount: 3,
    },
    {
      id: 2,
      message: "I`m second Post!",
      likesСount: 12,
    },
    {
      id: 3,
      message: "I`m third Post!",
      likesСount: 0,
    },
    {
      id: 4,
      message: "I`m fourth Post!",
      likesСount: 2,
    },
  ],
};

test("length of posts should be incremented", () => {
  let action = addPostCreator("new post text");
  let newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(5);
});

test('message of added post should be "new post text"', () => {
  let action = addPostCreator("new post text");
  let newState = profileReducer(state, action);
  expect(newState.posts[newState.posts.length - 1].message).toBe(
    "new post text"
  );
});

test("after deleting length of posts should be decrement", () => {
  let action = deletePostCreator(1);
  let newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(3);
});
