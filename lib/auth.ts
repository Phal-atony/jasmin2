import jwt from "jsonwebtoken";

const ADMIN_COOKIE_NAME = "admin_token";

function getAdminJwtSecret() {
  const secret = process.env.ADMIN_JWT_SECRET;

  if (!secret) {
    throw new Error("ADMIN_JWT_SECRET is not set");
  }

  return secret;
}

export function signAdminToken(adminId: string) {
  return jwt.sign(
    {
      adminId,
    },
    getAdminJwtSecret(),
    {
      expiresIn: "7d",
    }
  );
}

export function verifyAdminToken(token: string) {
  try {
    return jwt.verify(token, getAdminJwtSecret()) as {
      adminId: string;
      iat: number;
      exp: number;
    };
  } catch {
    return null;
  }
}

export function buildAuthCookie(token: string) {
  const isProduction = process.env.NODE_ENV === "production";

  return [
    `${ADMIN_COOKIE_NAME}=${token}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=604800",
    isProduction ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

export function buildClearCookie() {
  return [
    `${ADMIN_COOKIE_NAME}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=0",
  ].join("; ");
}

export { ADMIN_COOKIE_NAME };