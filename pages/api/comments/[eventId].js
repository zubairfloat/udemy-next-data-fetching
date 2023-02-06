import {
  connnectDataBase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-utils";

async function handler(req, res) {
  const eventID = req.query.eventId;
  let client;
  try {
    client = await connnectDataBase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to database failed" });
  }
  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "invalid input" });
      return;
    }

    console.log(email, name, text);
    const newComment = {
      name,
      email,
      text,
      eventID,
    };

    let result;
    try {
      result = await insertDocument(client, "comments", { newComment });
    } catch (err) {
      res.status(500).json({ message: "Inserting comment Failed" });
    }
    res.status(201).json({ message: "Added Comment", comment: newComment });
  }
  if (req.method === "GET") {
    let document;
    try {
      document = await getAllDocuments(client, "comments", { _id: -1 });
    } catch (err) {
      res.status(500).json({ message: "Getting comments failed" });
    }

    res.status(200).json({ comments: document });
  }
  client.close();
}

export default handler;
