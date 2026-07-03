const crypto = require("crypto");

const CSRF_COOKIE = "csrfToken";
const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

function parseCookies(cookieHeader) {
  return String(cookieHeader || "")
    .split(";")
    .map((cookie) => cookie.trim())
    .filter(Boolean)
    .reduce((cookies, cookie) => {
      const separatorIndex = cookie.indexOf("=");
      if (separatorIndex === -1) return cookies;

      const name = cookie.slice(0, separatorIndex);
      const value = cookie.slice(separatorIndex + 1);
      cookies.set(name, decodeURIComponent(value));
      return cookies;
    }, new Map());
}

function isValidToken(token) {
  return typeof token === "string" && /^[a-f0-9]{64}$/.test(token);
}

function tokensMatch(actual, expected) {
  if (!isValidToken(actual) || !isValidToken(expected)) return false;

  return crypto.timingSafeEqual(
    Buffer.from(actual, "hex"),
    Buffer.from(expected, "hex")
  );
}

function getRequestToken(req) {
  return req.get("x-csrf-token") || (req.body && req.body._csrf);
}

function csrfProtection(req, res, next) {
  const cookies = parseCookies(req.headers.cookie);
  let token = cookies.get(CSRF_COOKIE);

  if (!isValidToken(token)) {
    token = crypto.randomBytes(32).toString("hex");
    res.cookie(CSRF_COOKIE, token, {
      sameSite: "strict",
      secure: req.secure,
      path: "/",
    });
  }

  req.csrfToken = () => token;
  res.locals.csrfToken = token;

  if (SAFE_METHODS.has(req.method)) {
    return next();
  }

  if (!tokensMatch(getRequestToken(req), token)) {
    return res.status(403).json({ error: "Invalid CSRF token" });
  }

  return next();
}

module.exports = csrfProtection;
