export type UserRole = "user" | "editor" | "admin";

export type Permission = "read" | "edit" | "create" | "delete";

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  user: ["read"],
  editor: ["read", "edit"],
  admin: ["read", "edit", "create", "delete"],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}
