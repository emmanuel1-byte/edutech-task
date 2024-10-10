const express = require("express");
const app = express();

const { createServer } = require("http");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");
const helmet = require("helmet");
const fs = require("fs");
const YAML = require("yaml");
const swaggerUi = require("swagger-ui-express");
const {
  globalErrorHanlder,
  routeNotFoundHandler,
} = require("./src/middlewares/error");
const auth = require("./src/modules/authentication/route");
const connectDatabase = require("./src/utils/database");
const category = require("./src/modules/category/route");
const course = require("./src/modules/courses/route");
const profile = require("./src/modules/profiles/route");
const review = require("./src/modules/review/route");
const enrollment = require("./src/modules/enrollement/route");
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

app.use(limiter);
app.use(cors({ origin: "*" }));
app.use(helmet());

const file = fs.readFileSync("doc/api/swagger/swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running" });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", auth);
app.use("/api/profiles", profile);
app.use("/api/category", category);
app.use("/api/courses", course);
app.use("/api/reviews", review);
app.use("/api/enrollment", enrollment);

app.use(globalErrorHanlder);
app.use(routeNotFoundHandler);

const PORT = 3000;
server.listen(PORT, async () => {
  connectDatabase();
  console.log(`Server is running on port ${PORT}`);
});
