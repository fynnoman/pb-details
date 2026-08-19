import type { Access } from "payload";

export const isAdmin: Access = ({ req: { user } }) =>
  Boolean(user && Array.isArray(user.roles) && user.roles.includes("admin"));

export const isAdminOrEditor: Access = ({ req: { user } }) =>
  Boolean(
    user &&
      Array.isArray(user.roles) &&
      (user.roles.includes("admin") || user.roles.includes("editor")),
  );
