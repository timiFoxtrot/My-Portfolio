"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const email_config_1 = require("../config/email.config");
const router = express_1.default.Router();
/* GET users listing. */
router.post("/", async (req, res, next) => {
    try {
        console.log(req.body);
        const { email, fullname, phone, subject, message } = req.body;
        const text = `<h1><span style="color: grey; font-size: 24px;">${fullname}</span> with email ${email} might be interested in you</h1>
    <div>
      <p><h3>${message}</h3></p>
      <h3>Call me: ${phone}</h3>
    </div>
    `;
        await (0, email_config_1.sendEmail)(email, subject, text);
        return res.send({
            status: true,
        });
    }
    catch (error) { }
});
exports.default = router;
