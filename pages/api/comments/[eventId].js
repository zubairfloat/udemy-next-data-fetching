import { MongoClient } from "mongodb";

async function handler(req, res) {
  const eventID = req.query.eventId;
  const client = await MongoClient.connect(
    "mongodb+srv://zubair:11223344@cluster0.bwmkg.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  console.log(client);
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
    const result = await db.collection("comments").insertOne(newComment);
    console.log(result);
    res.status(201).json({ message: "Added Comment", comment: newComment });
  }
  if (req.method === "GET") {
    const document = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();
    console.log({ document });
    res.status(200).json({ comments: document });
  }
  client.close();
}

export default handler;
