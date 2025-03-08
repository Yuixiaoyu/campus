"use strict";
let queue = [];
function pushToQueue(comp) {
  queue.push(comp);
}
function removeFromQueue(comp) {
  queue = queue.filter((item) => {
    return item.$.uid !== comp.$.uid;
  });
}
function closeOther(comp) {
  queue.forEach((item) => {
    if (item.$.uid !== comp.$.uid) {
      item.$.exposed.close();
    }
  });
}
exports.closeOther = closeOther;
exports.pushToQueue = pushToQueue;
exports.removeFromQueue = removeFromQueue;
