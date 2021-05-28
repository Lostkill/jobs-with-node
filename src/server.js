import "dotenv/config";
import express from "express";
import { createBullBoard } from "bull-board";
const { BullAdapter } = require("bull-board/bullAdapter");

const app = express();
app.use(express.json());

import Queue from "./lib/Queue-lib";

const Adapters = Queue.queues.map(
  (QueueBull) => new BullAdapter(QueueBull.bull)
);
const { router } = createBullBoard([...Adapters]);

app.use("/admin/queues", router);

app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = {
      name,
      email,
      password,
    };

    //Add Job registration mail
    await Queue.add("MailRegister", { user });
    await Queue.add("UserReport", { user });

    return res.status(200).json({ name, email, password });
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.listen(8080, () => console.log("Server is running on :8080"));
