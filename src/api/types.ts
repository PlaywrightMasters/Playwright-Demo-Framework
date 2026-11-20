/** Resource shapes returned by https://jsonplaceholder.typicode.com */

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export type NewPost = Omit<Post, 'id'>;

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export interface Photo {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: { lat: string; lng: string };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

/** Query parameters supported by json-server style list endpoints. */
export type ListQuery = Record<string, string | number | boolean>;
