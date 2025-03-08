"use strict";
const common_vendor = require("../../../../common/vendor.js");
const queueKey = "__QUEUE_KEY__";
function useQueue() {
  const queue = common_vendor.ref([]);
  function pushToQueue(comp) {
    queue.value.push(comp);
  }
  function removeFromQueue(comp) {
    queue.value = queue.value.filter((item) => {
      return item.$.uid !== comp.$.uid;
    });
  }
  function closeOther(comp) {
    queue.value.forEach((item) => {
      if (item.$.uid !== comp.$.uid) {
        item.$.exposed.close();
      }
    });
  }
  function closeOutside() {
    queue.value.forEach((item) => {
      item.$.exposed.close();
    });
  }
  common_vendor.provide(queueKey, {
    queue,
    pushToQueue,
    removeFromQueue,
    closeOther,
    closeOutside
  });
  return {
    closeOther,
    closeOutside
  };
}
exports.queueKey = queueKey;
exports.useQueue = useQueue;
