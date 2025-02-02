require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
if (!process.env.MONGODB_URI) {
    throw new Error('Please set MONGODB_URI environment variable');
}
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
}
});

async function run() {
try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
} finally {
    await client.close();
}
}

run().catch(console.dir);

