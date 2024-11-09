export function gtag(...args: any[]) {
  const dataLayer = (window as any).dataLayer;

  if (dataLayer) {
    dataLayer.push(args);
    console.log((window as any).dataLayer, args);
  }
}

export function initGoogleAnalytics() {
  const _window = window as any;
  _window.dataLayer = _window.dataLayer || [];

  gtag('js', new Date());
  gtag('config', 'G-JZQEMPD2QS', { send_page_view: false });
}