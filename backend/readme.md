## Json web tokens

- how to use it

```js
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
  expiresIn: "30d",
});
```

## Set jwt as HTTP-ONLY cookie

```js
res.cookie("jwt", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV !== "development",
  sameSite: "strict",
  maxAge: 30 * 24 * 60 * 60 * 1000,
});
```

- cookie parser allow us to acces request.cookies

## Login

1. hit the route
2. find user in database
3. check if user exsist and if password match
4. generate token
   - generate token
   - set up the cookies

## How to handle protect route

- get the token from cookies req.cookies
