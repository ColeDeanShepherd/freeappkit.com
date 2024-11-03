export function text(_text: string) {
  return document.createTextNode(_text);
}

interface NodeProps {}
interface ANodeProps extends NodeProps {
  href: string;
}

export function elem(tagName: keyof HTMLElementTagNameMap, children: Node[]) {
  const elem = document.createElement(tagName);
  elem.append(...children);
  return elem;
}

export const h1 = (children: Node[]) => elem('h1', children);
export const h2 = (children: Node[]) => elem('h2', children);
export const h3 = (children: Node[]) => elem('h3', children);
export const h4 = (children: Node[]) => elem('h4', children);
export const h5 = (children: Node[]) => elem('h5', children);
export const h6 = (children: Node[]) => elem('h6', children);
export const div = (children: Node[]) => elem('div', children);
export const p = (children: Node[]) => elem('p', children);
export const ul = (children: Node[]) => elem('ul', children);
export const li = (children: Node[]) => elem('li', children);
export const a = (props: ANodeProps, children: Node[]) => {
  const _elem = elem('a', children);
  _elem.setAttribute('href', props.href);
  return _elem;
}
export const textArea = (props: NodeProps) => elem('textarea', []);