const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "arso-producer",
  brokers: [
    "kafka-service-1.default.svc.cluster.local:9092",
    "kafka-service-2.default.svc.cluster.local:9092",
  ],
});

const producer = kafka.producer();

let message = 0;

const runProducer = async () => {
  await producer.connect();

  setInterval(async () => {
    message++;

    await producer.send({
      topic: "arso-topic",
      messages: [
        {
          value: `Producer time is ${new Date().toLocaleString()} and the message is ${message}`,
        },
      ],
    });
  }, 5000);
};

runProducer.then(() => {
  console.log("Producer is producing messages");
});

process.on("beforeExit", (code) => {
  producer.disconnect().then(() => process.exit(code));
});
