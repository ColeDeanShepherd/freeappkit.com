import { ICommand } from "../command";
import { googleAnalyticsMeasurementId, googlePageViewConversionRecipient } from "../config";

function gtag(...args: any[]) {
  const dataLayer = (window as any).dataLayer;

  if (dataLayer) {
    // Must use `arguments`, not `args`.
    dataLayer.push(arguments);
  }
}

export function initAnalytics() {
  const _window = window as any;
  _window.dataLayer = _window.dataLayer || [];

  gtag('js', new Date());
  gtag('config', googleAnalyticsMeasurementId, { send_page_view: false });
}

export function trackPageView() {
  gtag('event', 'page_view');
}

export function trackEvent(name: string, args: object) {
  gtag('event', name, args);
}

export function trackPageViewConversion() {
  gtag('event', 'conversion', {
    'send_to': googlePageViewConversionRecipient,
    'value': 1.0,
    'currency': 'USD'
  });
}

export function trackCommandRun(command: ICommand, args: { [key: string]: any }) {
  trackEvent('run_command', {
    name: command.name,
    args: JSON.stringify(args),
  });
}