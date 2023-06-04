const EventEmitter = require("events");

const myEvent = new EventEmitter();

myEvent.addListener("event1", () => {
  console.log("event1 ==== emit");
});

const event2_1 = () => {
  console.log("event2 first ==== emit");
};
const event2_2 = () => {
  console.log("event2 second ==== emit");
};
myEvent.on("event2", event2_1);
myEvent.on("event2", event2_2);

myEvent.once("event3", () => {
  console.log("event3 === emit");
});

myEvent.emit("event1");
myEvent.emit("event2");

myEvent.emit("event3");
myEvent.emit("event3");

myEvent.on("event4", () => {
  console.log("event4 === emit");
});

myEvent.removeAllListeners("event4");

console.log("==================================");
myEvent.emit("event1");

myEvent.removeListener("event2", event2_1);

myEvent.emit("event2");
console.log(
  "end::==================================",
  myEvent.listenerCount("event2")
);
