import { connnectDataBase, insertDocument } from "../../helpers/db-utils";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    let client;
    try {
      client = await connnectDataBase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to database failed" });
    }
    try {
      await insertDocument(client, "newsLetter", { email: userEmail });
      client.close();
    } catch (err) {
      res.status(500).json({ message: "Inserting data failed" });
      return;
    }

    res.status(201).json({ message: "signed up" });
  }
}

export default handler;
