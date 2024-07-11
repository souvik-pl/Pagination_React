import { User } from "../common/common.type";
import { USER_DB } from "./db";

export function getTotalPageCount(limit: number): number {
  return Math.ceil(USER_DB.length / limit);
}

export function getUsers(offset: number, limit: number): User[] {
  const startIndex = offset * limit;
  const endIndex = startIndex + limit;
  return USER_DB.slice(startIndex, endIndex + 1);
}
