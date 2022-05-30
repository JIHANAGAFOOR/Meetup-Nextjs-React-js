import { MongoClient } from 'mongodb'

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        // const { title, image, address, description } = data;

        const client = await MongoClient.connect(
            'mongodb+srv://Jihana:Jihaan%40123@cluster0.xi6vh.mongodb.net/meetups?retryWrites=true&w=majority')
       
        const db = client.db();
        const meetsupCollection = db.collection('meetups');

        const result = await meetsupCollection.insertOne(data)
        console.log(result);

        client.close();
        res.status(201).json({message:'Meetup Inserted'})
    }
}
export default handler;