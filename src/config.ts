export const googleAnalyticsMeasurementId = 'G-JZQEMPD2QS';
export const googlePageViewConversionRecipient = 'AW-16763524210/YqTZCObdg-UZEPKovLk-';
export const productionSiteHostname = 'freeappkit.com';

export function isDevEnv() {
  return process.env.NODE_ENV === 'development';
}

export function getOpenAiApiKey() {
  return process.env.OPEN_AI_API_KEY;
}