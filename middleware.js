
export function authcheck(req, res, next) {
  if (req.headers.authorization === "password") {
    next();
  } else {
    res.status(401).json({ msg: "authorization failed" });
  }
}

export function logger(req, res, next){
  console.log(`${req.url} ,${req.method},  ${new Date().toISOString()}`);

  next();
}