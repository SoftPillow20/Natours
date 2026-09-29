import e from "express";

const app = e();

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
