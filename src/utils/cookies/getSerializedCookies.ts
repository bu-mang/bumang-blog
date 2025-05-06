import { cookies } from "next/headers";

export function getSerializedCookies() {
  return cookies()
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
}
