import { Route } from '../framework/router';
import { commands } from '../commands';
import { appList } from './ui-components';

export const route: Route = {
  pathname: '/all-apps',
  title: 'All Apps',
  mkPageElem: () => appList(commands),
};