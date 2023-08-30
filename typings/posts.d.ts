interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  user: User;
}

interface Geo {
  lat: string;
  lng: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}