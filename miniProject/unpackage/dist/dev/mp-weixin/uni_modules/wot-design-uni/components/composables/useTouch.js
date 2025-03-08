"use strict";
const common_vendor = require("../../../../common/vendor.js");
function useTouch() {
  const direction = common_vendor.ref("");
  const deltaX = common_vendor.ref(0);
  const deltaY = common_vendor.ref(0);
  const offsetX = common_vendor.ref(0);
  const offsetY = common_vendor.ref(0);
  const startX = common_vendor.ref(0);
  const startY = common_vendor.ref(0);
  function touchStart(event) {
    const touch = event.touches[0];
    direction.value = "";
    deltaX.value = 0;
    deltaY.value = 0;
    offsetX.value = 0;
    offsetY.value = 0;
    startX.value = touch.clientX;
    startY.value = touch.clientY;
  }
  function touchMove(event) {
    const touch = event.touches[0];
    deltaX.value = touch.clientX - startX.value;
    deltaY.value = touch.clientY - startY.value;
    offsetX.value = Math.abs(deltaX.value);
    offsetY.value = Math.abs(deltaY.value);
    direction.value = offsetX.value > offsetY.value ? "horizontal" : offsetX.value < offsetY.value ? "vertical" : "";
  }
  return {
    touchStart,
    touchMove,
    direction,
    deltaX,
    deltaY,
    offsetX,
    offsetY,
    startX,
    startY
  };
}
exports.useTouch = useTouch;
