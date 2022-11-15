import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import router from "./router";

const app = express();

// Parse JSON requests.
app.use(
  bodyParser.json({
    limit: "100mb",
    type: "application/json",
  })
);

app.use(express.static(path.join(__dirname, "..", "..", "dist/public")));
app.use(router);

app.listen(process.env.PORT || 8080);

export default app;
