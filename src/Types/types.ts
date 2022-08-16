export type PhotosType = {
  small: string | null;
  large: string | null;
};

export type ContactsType = {
  github: string | null;
  vk: string | null;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  website: string | null;
  youtube: string | null;
  mainLink: string | null;
};

export type ProfileType = {
  userId?: number | undefined;
  lookingForAJob?: boolean | undefined;
  lookingForAJobDescription?: string | undefined;
  fullName?: string | undefined;
  contacts?: ContactsType;
  photos?: PhotosType;
};

export type PostType = {
  id: number;
  message: string;
  likesСount: number;
};

export type UsersType = {
  id: number;
  name: string;
  status: string | null;
  photos: PhotosType;
  followed: boolean;
};

export type UsersMessagesType = {
  id: number;
  name: string;
};

export type MessagesType = {
  id: number;
  text: string;
};