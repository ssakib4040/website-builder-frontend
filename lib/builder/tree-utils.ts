import { BuilderNode } from "./types";

export function findNode(tree: BuilderNode[], id: string): BuilderNode | null {
  for (const node of tree) {
    if (node.id === id) return node;
    const found = findNode(node.children, id);
    if (found) return found;
  }
  return null;
}

export function removeNode(tree: BuilderNode[], id: string): BuilderNode[] {
  return tree
    .filter((node) => node.id !== id)
    .map((node) => ({ ...node, children: removeNode(node.children, id) }));
}

export function insertNodeAt(
  tree: BuilderNode[],
  node: BuilderNode,
  index: number,
): BuilderNode[] {
  const copy = [...tree];
  copy.splice(index, 0, node);
  return copy;
}

export function updateNodeProps(
  tree: BuilderNode[],
  id: string,
  props: Record<string, string | number | boolean>,
): BuilderNode[] {
  return tree.map((node) => {
    if (node.id === id) {
      return { ...node, props: { ...node.props, ...props } };
    }
    return { ...node, children: updateNodeProps(node.children, id, props) };
  });
}

export function duplicateNode(
  tree: BuilderNode[],
  id: string,
  genId: () => string,
): BuilderNode[] {
  const result: BuilderNode[] = [];
  for (const node of tree) {
    result.push({ ...node, children: duplicateNode(node.children, id, genId) });
    if (node.id === id) {
      result.push(deepCloneWithNewIds(node, genId));
    }
  }
  return result;
}

function deepCloneWithNewIds(
  node: BuilderNode,
  genId: () => string,
): BuilderNode {
  return {
    ...node,
    id: genId(),
    props: { ...node.props },
    children: node.children.map((child) => deepCloneWithNewIds(child, genId)),
  };
}

export function moveNode(
  tree: BuilderNode[],
  nodeId: string,
  newIndex: number,
): BuilderNode[] {
  const node = findNode(tree, nodeId);
  if (!node) return tree;
  const withoutNode = removeNode(tree, nodeId);
  return insertNodeAt(withoutNode, node, newIndex);
}
