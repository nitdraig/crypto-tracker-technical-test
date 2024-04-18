import jwt from "jsonwebtoken";
import { jwtSecret } from "../db";

interface User {
  id: number;
  username: string;
  password: string;
}

const users: User[] = [];

export const registerUser = async (
  username: string,
  password: string
): Promise<User> => {
  const user: User = { id: users.length + 1, username, password };
  users.push(user);
  return user;
};

export const loginUser = async (
  username: string,
  password: string
): Promise<string> => {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) throw new Error("Invalid credentials");

  const token = jwt.sign({ userId: user.id }, jwtSecret, {
    expiresIn: "1h",
  });
  return token;
};
