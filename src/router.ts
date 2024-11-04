
export interface Route {
  pathname: string;
  title: string | undefined;
  mkPageElem: () => Node;
}