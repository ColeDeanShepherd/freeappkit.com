import { isDevEnv, productionSiteHostname } from "../config";

export function getApexHost() {
  return isDevEnv()
    ? `localhost:${window.location.port}`
    : productionSiteHostname;
}

export function getApexHostname() {
  return isDevEnv()
    ? `localhost`
    : productionSiteHostname;
}

export function getSubdomain(): string | undefined {
  const apexHost = getApexHostname();
  let subdomain = window.location.hostname.replace(`${apexHost}`, '');
  subdomain = subdomain.replace(/\.$/, '');
  return (subdomain.length >= 1) ? subdomain : undefined;
}

export function getUrlWithNewSubdomain(url: URL, newSubdomain: string | undefined) {
  const subdomain = getSubdomain();
  
  const hostnameWithoutSubdomain = (subdomain !== undefined)
    ? url.hostname.replace(`${subdomain}.`, '')
    : url.hostname;
  const hostnameWithNewSubdomain = (newSubdomain !== undefined)
    ? `${newSubdomain}.${hostnameWithoutSubdomain}`
    : hostnameWithoutSubdomain;

  const newUrl = new URL(url.href);
  newUrl.hostname = hostnameWithNewSubdomain;
  return newUrl;
}

export function changeSubdomain(newSubdomain: string | undefined) {
  const newUrl = getUrlWithNewSubdomain(new URL(window.location.href), newSubdomain);
  window.location.href = newUrl.href;
}