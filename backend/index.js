import app from "./server.js";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import MoviesDAO from "./dao/moviesDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";

dotenv.config();

const port = process.env.PORT || 8000;

async function main() {
    const client = new MongoClient(process.env.MOVIEREVIEW_DB_URI);

    try {
        await client.connect();
        await MoviesDAO.injectDB(client);
        await ReviewsDAO.injectDB(client);

        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

main().catch(console.error);