import createError, { HttpError } from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import * as dotenv from "dotenv"

dotenv.config()

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "../", "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../", "public")));


app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.render('portfolio', {
    title: "Farooq's Portfolio"
  })
});

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const port  = process.env.PORT || 4040

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
})

export default app;
