"use strict";
const common_vendor = require("../../../../common/vendor.js");
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function flattenVNodes(children) {
  const result = [];
  const traverse = (children2) => {
    if (Array.isArray(children2)) {
      children2.forEach((child) => {
        var _a;
        if (isVNode(child)) {
          result.push(child);
          if ((_a = child.component) == null ? void 0 : _a.subTree) {
            result.push(child.component.subTree);
            traverse(child.component.subTree.children);
          }
          if (child.children) {
            traverse(child.children);
          }
        }
      });
    }
  };
  traverse(children);
  return result;
}
const findVNodeIndex = (vnodes, vnode) => {
  const index = vnodes.indexOf(vnode);
  if (index === -1) {
    return vnodes.findIndex((item) => vnode.key !== void 0 && vnode.key !== null && item.type === vnode.type && item.key === vnode.key);
  }
  return index;
};
function sortChildren(parent, publicChildren, internalChildren) {
  const vnodes = parent && parent.subTree && parent.subTree.children ? flattenVNodes(parent.subTree.children) : [];
  internalChildren.sort((a, b) => findVNodeIndex(vnodes, a.vnode) - findVNodeIndex(vnodes, b.vnode));
  const orderedPublicChildren = internalChildren.map((item) => item.proxy);
  publicChildren.sort((a, b) => {
    const indexA = orderedPublicChildren.indexOf(a);
    const indexB = orderedPublicChildren.indexOf(b);
    return indexA - indexB;
  });
}
function useChildren(key) {
  const publicChildren = common_vendor.reactive([]);
  const internalChildren = common_vendor.reactive([]);
  const parent = common_vendor.getCurrentInstance();
  const linkChildren = (value) => {
    const link = (child) => {
      if (child.proxy) {
        internalChildren.push(child);
        publicChildren.push(child.proxy);
        sortChildren(parent, publicChildren, internalChildren);
      }
    };
    const unlink = (child) => {
      const index = internalChildren.indexOf(child);
      publicChildren.splice(index, 1);
      internalChildren.splice(index, 1);
    };
    common_vendor.provide(
      key,
      Object.assign(
        {
          link,
          unlink,
          children: publicChildren,
          internalChildren
        },
        value
      )
    );
  };
  return {
    children: publicChildren,
    linkChildren
  };
}
exports.useChildren = useChildren;
