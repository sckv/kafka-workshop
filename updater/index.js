const express = require("express");
const yaml = require("yaml");
const fs = require("fs");
const shell = require("shelljs");

const app = express();
const port = 3333;

const producerFilePath = "./kubernetes-apps/producer-app.yaml";
const consumerFilePath = "./kubernetes-apps/consumer-app.yaml";

app.post("/hook/:sha", async (req, res) => {
  const consumerFile = fs.readFileSync(consumerFilePath, { encoding: "utf8" });
  const producerFile = fs.readFileSync(producerFilePath, { encoding: "utf8" });

  const parsedConsumerFile = yaml.parse(consumerFile).toJSON();
  const parsedProducerFile = yaml.parse(producerFile).toJSON();

  [
    { file: parsedConsumerFile, path: consumerFilePath },
    { file: parsedProducerFile, path: producerFilePath },
  ].forEach((doc) => {
    const imageName = doc.file.spec.containers[0].image.split(":")[0];
    const newImageName = [imageName, `master-${req.params.sha}`].join(":");

    doc.file.spec.containers[0].image = newImageName;

    fs.writeFileSync(doc.path, yaml.stringify(doc.file), { encoding: "utf8" });
  });

  console.log(shell.exec("kubectl apply -f ./kubernetes-apps/"));

  res.send(newVersionsDocs);
});

app.listen(port, () => {
  console.log(`Hook updater app listening at http://localhost:${port}`);
});
