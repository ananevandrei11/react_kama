export type PhotosType = {
  small: string | null;
  large: string | null;
};

export type PhotoResponseDataType = {
  photos: PhotosType;
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
  aboutMe?: string;
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

export type LoginDataType = {
  email: string;
  password: string;
  rememberMe: boolean | false;
  captcha: string | null;
};

/* API TYPES */
export enum ResultCodeEnum {
  Success = 0,
  Error = 1,
  CaptchaIsRequired = 10,
}

export enum ResultCodeWithCaptchaEnum {
  CaptchaIsRequired = 10,
}

export type MeResponseDataType = {
  id: number;
  email: string;
  login: string;
};

export type LoginResponseDataType = {
  userId: number; 
};

export type GetCaptchaUrlResponseDataType = {
  url: string;
}

export type GetItemsType = {
  items: Array<UsersType>;
  totalCount: number;
  error: string | null;
};

export type ResponseType<D = {}> = {
  data: D;
  fieldsErrors: any;
  resultCode: ResultCodeEnum;
  messages: Array<string | null>;
};
