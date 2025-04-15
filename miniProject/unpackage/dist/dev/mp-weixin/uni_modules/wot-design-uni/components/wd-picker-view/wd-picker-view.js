"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_wotDesignUni_components_common_util = require("../common/util.js");
const uni_modules_wotDesignUni_components_wdPickerView_types = require("./types.js");
if (!Math) {
  wdLoading();
}
const wdLoading = () => "../wd-loading/wd-loading.js";
const __default__ = {
  name: "wd-picker-view",
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: "shared"
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  props: uni_modules_wotDesignUni_components_wdPickerView_types.pickerViewProps,
  emits: ["change", "pickstart", "pickend", "update:modelValue"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const formatColumns = common_vendor.ref([]);
    const itemHeight = common_vendor.ref(35);
    const selectedIndex = common_vendor.ref([]);
    common_vendor.watch(
      [() => props.modelValue, () => props.columns],
      (newValue, oldValue) => {
        if (!uni_modules_wotDesignUni_components_common_util.isEqual(oldValue[1], newValue[1]) && uni_modules_wotDesignUni_components_common_util.isArray(newValue[1]) && newValue[1].length > 0) {
          formatColumns.value = uni_modules_wotDesignUni_components_wdPickerView_types.formatArray(newValue[1], props.valueKey, props.labelKey);
        }
        if (uni_modules_wotDesignUni_components_common_util.isDef(newValue[0])) {
          selectWithValue(newValue[0]);
        }
      },
      {
        deep: true,
        immediate: true
      }
    );
    const { proxy } = common_vendor.getCurrentInstance();
    function selectWithValue(value) {
      if (formatColumns.value.length === 0)
        return;
      if (value === "" || !uni_modules_wotDesignUni_components_common_util.isDef(value) || uni_modules_wotDesignUni_components_common_util.isArray(value) && value.length === 0) {
        value = formatColumns.value.map((col) => {
          return col[0][props.valueKey];
        });
      }
      const valueType = uni_modules_wotDesignUni_components_common_util.getType(value);
      const type = ["string", "number", "boolean", "array"];
      if (type.indexOf(valueType) === -1)
        console.error(`value must be one of ${type.toString()}`);
      value = uni_modules_wotDesignUni_components_common_util.isArray(value) ? value : [value];
      value = value.slice(0, formatColumns.value.length);
      let selected = uni_modules_wotDesignUni_components_common_util.deepClone(selectedIndex.value);
      value.forEach((target, col) => {
        let row = formatColumns.value[col].findIndex((row2) => {
          return row2[props.valueKey].toString() === target.toString();
        });
        row = row === -1 ? 0 : row;
        selected = correctSelectedIndex(col, row, selected);
      });
      selectedIndex.value = selected.slice(0, value.length);
    }
    function correctSelected(value) {
      let selected = uni_modules_wotDesignUni_components_common_util.deepClone(value);
      value.forEach((row, col) => {
        row = uni_modules_wotDesignUni_components_common_util.range(row, 0, formatColumns.value[col].length - 1);
        selected = correctSelectedIndex(col, row, selected);
      });
      return selected;
    }
    function correctSelectedIndex(columnIndex, rowIndex, selected) {
      const col = formatColumns.value[columnIndex];
      if (!col || !col[rowIndex]) {
        throw Error(`The value to select with Col:${columnIndex} Row:${rowIndex} is incorrect`);
      }
      const select = uni_modules_wotDesignUni_components_common_util.deepClone(selected);
      select[columnIndex] = rowIndex;
      if (col[rowIndex].disabled) {
        const prev = col.slice(0, rowIndex).reverse().findIndex((s) => !s.disabled);
        const next = col.slice(rowIndex + 1).findIndex((s) => !s.disabled);
        if (prev !== -1) {
          select[columnIndex] = rowIndex - 1 - prev;
        } else if (next !== -1) {
          select[columnIndex] = rowIndex + 1 + next;
        } else if (select[columnIndex] === void 0) {
          select[columnIndex] = 0;
        }
      }
      return select;
    }
    function onChange({ detail: { value } }) {
      value = value.map((v) => {
        return Number(v || 0);
      });
      const index = getChangeDiff(value);
      selectedIndex.value = uni_modules_wotDesignUni_components_common_util.deepClone(value);
      common_vendor.nextTick$1(() => {
        selectedIndex.value = correctSelected(value);
        if (props.columnChange) {
          if (props.columnChange.length < 4) {
            props.columnChange(proxy.$.exposed, getSelects(), index || 0, () => {
            });
            handleChange(index || 0);
          } else {
            props.columnChange(proxy.$.exposed, getSelects(), index || 0, () => {
              handleChange(index || 0);
            });
          }
        } else {
          handleChange(index || 0);
        }
      });
    }
    function getChangeColumn(now, origin) {
      if (!now || !origin)
        return -1;
      const index = now.findIndex((row, index2) => row !== origin[index2]);
      return index;
    }
    function getChangeDiff(value) {
      value = value.slice(0, formatColumns.value.length);
      const origin = uni_modules_wotDesignUni_components_common_util.deepClone(selectedIndex.value);
      let selected = uni_modules_wotDesignUni_components_common_util.deepClone(selectedIndex.value);
      value.forEach((row, col) => {
        row = uni_modules_wotDesignUni_components_common_util.range(row, 0, formatColumns.value[col].length - 1);
        if (row === origin[col])
          return;
        selected = correctSelectedIndex(col, row, selected);
      });
      const diffCol = getChangeColumn(selected, origin);
      if (diffCol === -1)
        return;
      const diffRow = selected[diffCol];
      return selected.length === 1 ? diffRow : diffCol;
    }
    function handleChange(index) {
      const value = getValues();
      if (uni_modules_wotDesignUni_components_common_util.isEqual(value, props.modelValue))
        return;
      emit("update:modelValue", value);
      setTimeout(() => {
        emit("change", {
          picker: proxy.$.exposed,
          value,
          index
        });
      }, 0);
    }
    function getSelects() {
      const selects = selectedIndex.value.map((row, col) => formatColumns.value[col][row]);
      if (selects.length === 1) {
        return selects[0];
      }
      return selects;
    }
    function getValues() {
      const { valueKey } = props;
      const values = selectedIndex.value.map((row, col) => {
        return formatColumns.value[col][row][valueKey];
      });
      if (values.length === 1) {
        return values[0];
      }
      return values;
    }
    function getLabels() {
      const { labelKey } = props;
      return selectedIndex.value.map((row, col) => formatColumns.value[col][row][labelKey]);
    }
    function getColumnIndex(columnIndex) {
      return selectedIndex.value[columnIndex];
    }
    function getColumnData(columnIndex) {
      return formatColumns.value[columnIndex];
    }
    function setColumnData(columnIndex, data, rowIndex = 0) {
      formatColumns.value[columnIndex] = uni_modules_wotDesignUni_components_wdPickerView_types.formatArray(data, props.valueKey, props.labelKey).reduce((acc, val) => acc.concat(val), []);
      selectedIndex.value = correctSelectedIndex(columnIndex, rowIndex, selectedIndex.value);
    }
    function getColumnsData() {
      return uni_modules_wotDesignUni_components_common_util.deepClone(formatColumns.value);
    }
    function getSelectedIndex() {
      return selectedIndex.value;
    }
    function resetColumns(columns) {
      if (uni_modules_wotDesignUni_components_common_util.isArray(columns) && columns.length) {
        formatColumns.value = uni_modules_wotDesignUni_components_wdPickerView_types.formatArray(columns, props.valueKey, props.labelKey);
      }
    }
    function onPickStart() {
      emit("pickstart");
    }
    function onPickEnd() {
      emit("pickend");
    }
    __expose({
      getSelects,
      getValues,
      setColumnData,
      getColumnsData,
      getColumnData,
      getColumnIndex,
      getLabels,
      getSelectedIndex,
      resetColumns
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: _ctx.loading
      }, _ctx.loading ? {
        b: common_vendor.p({
          color: _ctx.loadingColor
        })
      } : {}, {
        c: common_vendor.f(formatColumns.value, (col, colIndex, i0) => {
          return {
            a: common_vendor.f(col, (row, rowIndex, i1) => {
              return {
                a: common_vendor.t(row[_ctx.labelKey]),
                b: rowIndex,
                c: common_vendor.n(`wd-picker-view-column__item ${row["disabled"] ? "wd-picker-view-column__item--disabled" : ""}  ${selectedIndex.value[colIndex] == rowIndex ? "wd-picker-view-column__item--active" : ""}`)
              };
            }),
            b: colIndex
          };
        }),
        d: common_vendor.s(`line-height: ${itemHeight.value}px;`),
        e: `height: ${itemHeight.value}px;`,
        f: common_vendor.s(`height: ${_ctx.columnsHeight - 20}px;`),
        g: selectedIndex.value,
        h: _ctx.immediateChange,
        i: common_vendor.o(onChange),
        j: common_vendor.o(onPickStart),
        k: common_vendor.o(onPickEnd),
        l: common_vendor.s(`height: ${_ctx.columnsHeight - 20}px;`),
        m: common_vendor.n(`wd-picker-view ${_ctx.customClass}`),
        n: common_vendor.s(_ctx.customStyle)
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c3bc94ff"]]);
wx.createComponent(Component);
