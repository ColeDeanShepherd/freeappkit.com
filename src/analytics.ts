export function gtag(...args: any[]) {
  const dataLayer = (window as any).dataLayer;

  if (dataLayer) {
    // Must use `arguments`, not `args`.
    dataLayer.push(arguments);
  }
}

export function initGoogleAnalytics() {
  const _window = window as any;
  _window.dataLayer = _window.dataLayer || [];

  gtag('js', new Date());
  gtag('config', 'G-JZQEMPD2QS', { send_page_view: false });
}