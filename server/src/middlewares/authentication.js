import { tokenDecode } from "../utility/tokenUtility.js";

export const IsLoggedIn = (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log( req.cookies);
    if (!token) {
      return res.status(401).send("Please Login First");
    }
    const decode = tokenDecode(token);
    req.headers.userId = decode.user._id;
    req.headers.email = decode.user.email;
    next();
  } catch (error) {
    next(error);
  }
};

export const isLoggedOut = (req, res, next) => {
  const token = req.cookies.token;
  if(token) {
    return res.status(406).send("User Already Logged In");
  }
  next();
}
