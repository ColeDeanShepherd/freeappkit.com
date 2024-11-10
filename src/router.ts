import { MaybeLocalizedString } from "./localization";

export interface Route {
  pathname: MaybeLocalizedString;
  title: MaybeLocalizedString | undefined;
  mkPageElem: () => Node;
}