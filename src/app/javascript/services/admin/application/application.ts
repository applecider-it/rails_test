import { getMetaJson } from "@/services/data/html";

import { AdminUser } from "./types";

/**
 * ログイン中の管理者を返す。 
 */
export function getCurrentAdminUser(): AdminUser | null {
  return getMetaJson('admin-user');
}