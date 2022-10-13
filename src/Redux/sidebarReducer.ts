let initialState = {
  friends: [
    {
      id: 1,
      name: 'Anton',
      avatar:
        'https://img.favpng.com/25/1/17/avatar-user-computer-icons-software-developer-png-favpng-7SbFpNeqKqhhTrrrnHFUqk6U4.jpg',
    },
    {
      id: 2,
      name: 'Ravil',
      avatar: 'https://cdn-icons-png.flaticon.com/512/1184/1184457.png',
    },
  ],
};

export type InitialStateType = typeof initialState;

const sidebarReducer = (state = initialState, action: null): InitialStateType => state;

export default sidebarReducer;
