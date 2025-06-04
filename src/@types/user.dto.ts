export interface UserDTO {
  data: {
    userId: number;
    username: string;
    fullName: string;
    email: string;
    createdAt: Date;
  };
}
