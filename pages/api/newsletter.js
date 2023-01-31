import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    const client = await MongoClient.connect(
      "mongodb+srv://zubair:11223344@cluster0.bwmkg.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log(client);

    const db = client.db();
    await db.collection("newsLetter").insertOne({ email: userEmail });

    client.close();

    console.log(userEmail);
    res.status(201).json({ message: "signed up" });
  }
}

export default handler;
