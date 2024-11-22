import { setStrings } from '../framework/localization';
import { routes } from '../routes';
import { generateSitemap } from '../sitemap';
import { strings } from '../strings';

setStrings(strings);
console.log(generateSitemap(routes));