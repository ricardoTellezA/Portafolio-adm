export interface Register {
  name: string;
  email: string;
  password: string;
  username: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface User {
  name: string;
  presentation: string;
  profession: string;
  about: string;


}


export interface ImageComponent {
  onChange: (e: any) => void;
  title: string;
}