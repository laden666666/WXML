/**
 * @since 20180808 10:56
 * @author vivaxy
 */

// 基础类型
module.exports = class BaseNode {
  constructor(type) {
    this.type = type;
    this.parentNode = null;
  }

  toJSON() {
    throw new Error('To be implemented');
  }
};
