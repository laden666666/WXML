/**
 * @since 2018-09-08 12:58:35
 * @author vivaxy
 */

const nodeTypes = require('../types/node-types.js');

// 节点更具类型序列化
const serializeByType = {
  [nodeTypes.TEXT](node) {
    // 文本直接返回文本
    return node.text;
  },
  [nodeTypes.COMMENT](node) {
    // 注释返回注释
    return `<!--${node.comment}-->`;
  },
  [nodeTypes.ELEMENT](node) {

    // 拼接<tag>代码，并递归生成子元素
    const tagName = node.tagName || '';
    let attrsString = Object.keys(node.attrs || {})
      .map((name) => {
        if (node.attrs[name] === true) {
          return name;
        }
        return `${name}="${node.attrs[name]}"`;
      })
      .join(' ');
    if (attrsString) {
      attrsString = ' ' + attrsString;
    }

    if (node.selfClosing) {
      return `<${tagName}${attrsString} />`;
    }

    if (node.childNodes && node.childNodes.length) {
      // 子元素递归
      const childNodesString = node.childNodes.map(serialize).join('');

      return `<${tagName || ''}${attrsString}>${childNodesString}</${tagName}>`;
    }

    return `<${tagName}${attrsString}></${tagName}>`;
  },
  [nodeTypes.CDATA_SECTION](node) {
    throw new Error('Implement');
  },
};

function serialize(node) {
  if (!serializeByType[node.type]) {
    throw new Error('Unexpected node.type: ' + node.type);
  }
  return serializeByType[node.type](node);
}

module.exports = serialize;
