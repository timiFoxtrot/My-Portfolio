import express, { Request, Response, NextFunction } from "express";
import { sendEmail } from "../config/email.config";
const router = express.Router();

/* GET users listing. */
// router.get(
//   "/portfolio",
//   async (req: Request, res: Response, next: NextFunction) => {
//     console.log("hello world");
//     res.render("portfolio");
//   }
// );

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body);
    const { email, fullname, phone, subject, message } = req.body;
    const text = `<h1><span style="color: grey; font-size: 24px;">${fullname}</span> might be interested in you</h1>
    <div>
      <p><h3>${message}</h3></p>
      <h3>Call me: ${phone}</h3>
    </div>
    `;
    await sendEmail(email, subject, text);

    return res.send({
      status: true,
    });
  } catch (error) {}
});

export default router;
