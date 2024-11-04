interface NodeProps {
  id?: string;
  class?: string;
  style?: string;
  onClick?: () => void;
}

interface ANodeProps extends NodeProps {
  href?: string;
}

interface TextAreaNodeProps extends NodeProps {
  readonly?: boolean;
}
export function elem<K extends keyof HTMLElementTagNameMap>(tagName: K, propsOrChildren?: NodeProps | Node[], children?: Node[]): HTMLElementTagNameMap[K] {
  const elem = document.createElement(tagName);

  if (propsOrChildren !== undefined) {
    if (Array.isArray(propsOrChildren)) {
      elem.append(...propsOrChildren);
    } else {
      if (propsOrChildren.id !== undefined) {
        elem.setAttribute('id', propsOrChildren.id);
      }

      if (propsOrChildren.class !== undefined) {
        elem.setAttribute('class', propsOrChildren.class);
      }

      if (propsOrChildren.style !== undefined) {
        elem.setAttribute('style', propsOrChildren.style);
      }

      if (propsOrChildren.onClick !== undefined) {
        elem.addEventListener('click', propsOrChildren.onClick);
      }
    }
  }
  
  if (children !== undefined) {
    elem.append(...children);
  }

  return elem;
}
export const text = (_text: string) => document.createTextNode(_text);
export const h1 = (propsOrChildren?: NodeProps | Node[], children?: Node[]) => elem('h1', propsOrChildren, children);
export const h2 = (propsOrChildren?: NodeProps | Node[], children?: Node[]) => elem('h2', propsOrChildren, children);
export const h3 = (propsOrChildren?: NodeProps | Node[], children?: Node[]) => elem('h3', propsOrChildren, children);
export const h4 = (propsOrChildren?: NodeProps | Node[], children?: Node[]) => elem('h4', propsOrChildren, children);
export const h5 = (propsOrChildren?: NodeProps | Node[], children?: Node[]) => elem('h5', propsOrChildren, children);
export const h6 = (propsOrChildren?: NodeProps | Node[], children?: Node[]) => elem('h6', propsOrChildren, children);
export const div = (propsOrChildren?: NodeProps | Node[], children?: Node[]) => elem('div', propsOrChildren, children);
export const span = (propsOrChildren?: NodeProps | Node[], children?: Node[]) => elem('span', propsOrChildren, children);
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
export const textArea = (propsOrChildren?: TextAreaNodeProps | Node[], children?: Node[]) => {
  const _elem = elem('textarea', propsOrChildren, children);

  if (!Array.isArray(propsOrChildren) && (propsOrChildren !== undefined)) {
    const props = propsOrChildren

    if (props.readonly) {
      _elem.setAttribute('readonly', '');
    }
  }

  return _elem;
}
export const button = (propsOrChildren?: NodeProps | Node[], children?: Node[]) => elem('button', propsOrChildren, children);
export const i = (propsOrChildren?: NodeProps | Node[], children?: Node[]) => elem('i', propsOrChildren, children);