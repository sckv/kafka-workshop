const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "arso-consumer",
  brokers: [
    "kafka-service-1.default.svc.cluster.local:9092",
    "kafka-service-2.default.svc.cluster.local:9092",
  ],
});

const consumer = kafka.consumer({ groupId: "arso-consumer-group" });

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "arso-topic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Message from topic ${topic} is ${message.value.toString()}`);
    },
  });
};

runConsumer.then(() => {
  console.log("Consumer ready");
});

process.on("beforeExit", (code) => {
  consumer.disconnect().then(() => process.exit(code));
});
