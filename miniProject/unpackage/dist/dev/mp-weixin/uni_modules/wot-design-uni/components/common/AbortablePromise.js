"use strict";
class AbortablePromise {
  constructor(executor) {
    this._reject = null;
    this.promise = new Promise((resolve, reject) => {
      executor(resolve, reject);
      this._reject = reject;
    });
  }
  // 提供abort方法来中止Promise
  abort(error) {
    if (this._reject) {
      this._reject(error);
    }
  }
  then(onfulfilled, onrejected) {
    return this.promise.then(onfulfilled, onrejected);
  }
  catch(onrejected) {
    return this.promise.catch(onrejected);
  }
}
exports.AbortablePromise = AbortablePromise;
