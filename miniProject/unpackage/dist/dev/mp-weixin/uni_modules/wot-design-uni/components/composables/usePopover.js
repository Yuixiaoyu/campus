"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
function usePopover(visibleArrow = true) {
  const { proxy } = common_vendor.getCurrentInstance();
  const popStyle = common_vendor.ref("");
  const arrowStyle = common_vendor.ref("");
  const showStyle = common_vendor.ref("");
  const arrowClass = common_vendor.ref("");
  const popWidth = common_vendor.ref(0);
  const popHeight = common_vendor.ref(0);
  const left = common_vendor.ref(0);
  const bottom = common_vendor.ref(0);
  const width = common_vendor.ref(0);
  const height = common_vendor.ref(0);
  const top = common_vendor.ref(0);
  function noop() {
  }
  function init(placement, visibleArrow2, selector) {
    if (visibleArrow2) {
      const arrowClassArr = [
        `wd-${selector}__arrow`,
        placement === "bottom" || placement === "bottom-start" || placement === "bottom-end" ? `wd-${selector}__arrow-up` : "",
        placement === "left" || placement === "left-start" || placement === "left-end" ? `wd-${selector}__arrow-right` : "",
        placement === "right" || placement === "right-start" || placement === "right-end" ? `wd-${selector}__arrow-left` : "",
        placement === "top" || placement === "top-start" || placement === "top-end" ? `wd-${selector}__arrow-down` : ""
      ];
      arrowClass.value = arrowClassArr.join(" ");
    }
    uni_modules_wotDesignUni_components_common_util.getRect("#target", false, proxy).then((rect) => {
      if (!rect)
        return;
      left.value = rect.left;
      bottom.value = rect.bottom;
      width.value = rect.width;
      height.value = rect.height;
      top.value = rect.top;
    });
    uni_modules_wotDesignUni_components_common_util.getRect("#pos", false, proxy).then((rect) => {
      if (!rect)
        return;
      popWidth.value = rect.width;
      popHeight.value = rect.height;
    });
  }
  function control(placement, offset) {
    const arrowSize = visibleArrow ? 9 : 0;
    const verticalX = width.value / 2;
    const verticalY = arrowSize + height.value + 5;
    const horizontalX = width.value + arrowSize + 5;
    const horizontalY = height.value / 2;
    let offsetX = 0;
    let offsetY = 0;
    if (Array.isArray(offset)) {
      offsetX = (verticalX - 17 > 0 ? 0 : verticalX - 25) + offset[0];
      offsetY = (horizontalY - 17 > 0 ? 0 : horizontalY - 25) + (offset[1] ? offset[1] : offset[0]);
    } else if (uni_modules_wotDesignUni_components_common_util.isObj(offset)) {
      offsetX = (verticalX - 17 > 0 ? 0 : verticalX - 25) + offset.x;
      offsetY = (horizontalY - 17 > 0 ? 0 : horizontalY - 25) + offset.y;
    } else {
      offsetX = (verticalX - 17 > 0 ? 0 : verticalX - 25) + offset;
      offsetY = (horizontalY - 17 > 0 ? 0 : horizontalY - 25) + offset;
    }
    const placements = /* @__PURE__ */ new Map([
      // 上
      ["top", [`left: ${verticalX}px; bottom: ${verticalY}px; transform: translateX(-50%);`, "left: 50%;"]],
      [
        "top-start",
        [
          `left: ${offsetX}px; bottom: ${verticalY}px;`,
          `left: ${(popWidth.value >= width.value ? width.value / 2 : popWidth.value - 25) - offsetX}px;`
        ]
      ],
      [
        "top-end",
        [
          `right: ${offsetX}px; bottom: ${verticalY}px;`,
          `right: ${(popWidth.value >= width.value ? width.value / 2 : popWidth.value - 25) - offsetX}px; transform: translateX(50%);`
        ]
      ],
      // 下
      ["bottom", [`left: ${verticalX}px; top: ${verticalY}px; transform: translateX(-50%);`, "left: 50%;"]],
      [
        "bottom-start",
        [`left: ${offsetX}px; top: ${verticalY}px;`, `left: ${(popWidth.value >= width.value ? width.value / 2 : popWidth.value - 25) - offsetX}px;`]
      ],
      [
        "bottom-end",
        [
          `right: ${offsetX}px; top: ${verticalY}px;`,
          `right: ${(popWidth.value >= width.value ? width.value / 2 : popWidth.value - 25) - offsetX}px; transform: translateX(50%);`
        ]
      ],
      // 左
      ["left", [`right: ${horizontalX}px; top: ${horizontalY}px; transform: translateY(-50%);`, "top: 50%"]],
      [
        "left-start",
        [
          `right: ${horizontalX}px; top: ${offsetY}px;`,
          `top: ${(popHeight.value >= height.value ? height.value / 2 : popHeight.value - 20) - offsetY}px;`
        ]
      ],
      [
        "left-end",
        [
          `right: ${horizontalX}px; bottom: ${offsetY}px;`,
          `bottom: ${(popHeight.value >= height.value ? height.value / 2 : popHeight.value - 20) - offsetY}px; transform: translateY(50%);`
        ]
      ],
      // 右
      ["right", [`left: ${horizontalX}px; top: ${horizontalY}px; transform: translateY(-50%);`, "top: 50%"]],
      [
        "right-start",
        [
          `left: ${horizontalX}px; top: ${offsetY}px;`,
          `top: ${(popHeight.value >= height.value ? height.value / 2 : popHeight.value - 20) - offsetY}px;`
        ]
      ],
      [
        "right-end",
        [
          `left: ${horizontalX}px; bottom: ${offsetY}px;`,
          `bottom: ${(popHeight.value >= height.value ? height.value / 2 : popHeight.value - 20) - offsetY}px; transform: translateY(50%);`
        ]
      ]
    ]);
    popStyle.value = placements.get(placement)[0];
    arrowStyle.value = placements.get(placement)[1];
  }
  return { popStyle, arrowStyle, showStyle, arrowClass, init, control, noop };
}
exports.usePopover = usePopover;
