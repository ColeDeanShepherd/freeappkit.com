export function text(_text: string) {
  return document.createTextNode(_text);
}

interface NodeProps {
  id?: string;
}

interface ANodeProps extends NodeProps {
  href?: string;
}

export function elem(tagName: keyof HTMLElementTagNameMap, propsOrChildren?: NodeProps | Node[], children?: Node[]) {
  const elem = document.createElement(tagName);

  if (propsOrChildren !== undefined) {
    if (Array.isArray(propsOrChildren)) {
      elem.append(...propsOrChildren);
    } else {
      if (propsOrChildren.id !== undefined) {
        elem.setAttribute('id', propsOrChildren.id);
      }
    }
  }
  
  if (children !== undefined) {
    elem.append(...children);
  }

  return elem;
}

export const h1 = (propsOrChildren?: NodeProps | Node[], children?: Node[]) => elem('h1', propsOrChildren, children);
export const h2 = (propsOrChildren?: NodeProps | Node[], children?: Node[]) => elem('h2', propsOrChildren, children);
export const h3 = (propsOrChildren?: NodeProps | Node[], children?: Node[]) => elem('h3', propsOrChildren, children);
export const h4 = (propsOrChildren?: NodeProps | Node[], children?: Node[]) => elem('h4', propsOrChildren, children);
export const h5 = (propsOrChildren?: NodeProps | Node[], children?: Node[]) => elem('h5', propsOrChildren, children);
export const h6 = (propsOrChildren?: NodeProps | Node[], children?: Node[]) => elem('h6', propsOrChildren, children);
export const div = (propsOrChildren?: NodeProps | Node[], children?: Node[]) => elem('div', propsOrChildren, children);
export const p = (propsOrChildren?: NodeProps | Node[], children?: Node[]) => elem('p', propsOrChildren, children);
export const ul = (propsOrChildren?: NodeProps | Node[], children?: Node[]) => elem('ul', propsOrChildren, children);
export const li = (propsOrChildren?: NodeProps | Node[], children?: Node[]) => elem('li', propsOrChildren, children);
export const a = (propsOrChildren?: ANodeProps | Node[], children?: Node[]) => {
  const _elem = elem('a', propsOrChildren, children);

  if (!Array.isArray(propsOrChildren) && (propsOrChildren !== undefined)) {
    const props = propsOrChildren

    if (props.href) {
      _elem.setAttribute('href', props.href);
    }
  }

  return _elem;
}
export const textArea = (propsOrChildren?: NodeProps | Node[], children?: Node[]) => elem('textarea', propsOrChildren, children);