"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_wdSkeleton_types = require("./types.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const __default__ = {
  options: { virtualHost: true, addGlobalClass: true, styleIsolation: "shared" }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  __name: "wd-skeleton",
  props: uni_modules_wotDesignUni_components_wdSkeleton_types.skeletonProps,
  setup(__props) {
    const themeMap = {
      avatar: [{ type: "circle", height: "64px", width: "64px" }],
      image: [{ type: "rect", height: "64px", width: "64px" }],
      text: [
        1,
        [
          { width: "24%", height: "16px", marginRight: "16px" },
          { width: "76%", height: "16px" }
        ]
      ],
      paragraph: [1, 1, 1, { width: "55%" }]
    };
    const props = __props;
    const rowCols = common_vendor.ref([]);
    const parsedRowCols = common_vendor.computed(() => {
      return rowCols.value.map((item) => {
        if (uni_modules_wotDesignUni_components_common_util.isNumber(item)) {
          return [
            {
              class: getColItemClass({ type: "text" }),
              style: {}
            }
          ];
        }
        if (Array.isArray(item)) {
          return item.map((col) => {
            return {
              ...col,
              class: getColItemClass(col),
              style: getColItemStyle(col)
            };
          });
        }
        const nItem = item;
        return [
          {
            ...nItem,
            class: getColItemClass(nItem),
            style: getColItemStyle(nItem)
          }
        ];
      });
    });
    function getColItemClass(rowCol) {
      return ["wd-skeleton__col", `wd-skeleton--type-${rowCol.type || "text"}`, { [`wd-skeleton--animation-${props.animation}`]: props.animation }];
    }
    function getColItemStyle(rowCol) {
      const style = {};
      const styleName = ["size", "width", "height", "margin", "background", "marginLeft", "marginRight", "borderRadius", "backgroundColor"];
      for (const name of styleName) {
        if (Object.prototype.hasOwnProperty.call(rowCol, name)) {
          const px = uni_modules_wotDesignUni_components_common_util.addUnit(rowCol[name]);
          if (name === "size") {
            style.width = px;
            style.height = px;
          } else {
            style[name] = px;
          }
        }
      }
      return style;
    }
    common_vendor.watch(
      () => props.rowCol,
      (rowCol) => {
        rowCols.value = [...Array.isArray(rowCol) && rowCol.length ? props.rowCol : themeMap[props.theme]];
      },
      { immediate: true }
    );
    const show = common_vendor.computed(() => props.loading == void 0 || props.loading === true);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: show.value
      }, show.value ? {
        b: common_vendor.f(parsedRowCols.value, (row, index, i0) => {
          return {
            a: common_vendor.f(row, (col, idx, i1) => {
              return {
                a: `col-${idx}`,
                b: common_vendor.n(col.class),
                c: common_vendor.s(col.style)
              };
            }),
            b: `row-${index}`
          };
        })
      } : {}, {
        c: common_vendor.n(`wd-skeleton ${_ctx.customClass}`),
        d: common_vendor.s(_ctx.customStyle)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a7cc99aa"]]);
wx.createComponent(Component);
