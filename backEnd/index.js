import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import dipaRoute from "./routes/dipaRoute.js"
import referenceRoute from "./routes/referenceRoute.js"


//---------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// --------------------------------------------------------
app.use(cors({
  origin: "*"
}));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(dipaRoute);
app.use(referenceRoute);


app.get("/", (req, res) => {
  console.log('ok')
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});