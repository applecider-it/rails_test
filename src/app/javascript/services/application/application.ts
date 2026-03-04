import { getMetaJson } from "@/services/data/html";

import { User } from "./types";

/**
 * ログインユーザーを返す。 
 */
export function getCurrentUser(): User | null {
  return getMetaJson('user');
}