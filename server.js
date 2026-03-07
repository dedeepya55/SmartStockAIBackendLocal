const express = require("express");
const path = require("path");
const app = require('./app');
const PORT = process.env.PORT || 3000;

app.use(
  "/output_results",
  express.static(
    path.join(__dirname, "SMARTSTOCKAI-AI", "output_results")
  )
);
app.use(
  "/results",
  express.static(path.join(__dirname, "SMARTSTOCK_AI2", "results"))
);

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});