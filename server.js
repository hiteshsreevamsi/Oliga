const express = require("express");
const connectionDB = require("./config/db");
const app = express();

connectionDB();

app.use(express.json({ extended: false }));
app.get("/", (req, res) => {
  res.send("Api success");
});
const PORT = process.env.PORT || 4000;

app.use("/api/users", require("./api/user"));
app.use("/api/orders", require("./api/orders"));
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
