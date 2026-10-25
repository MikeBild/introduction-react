export type ErrorReport = {
  message: string;
  release: string;
  source: string;
  url: string;
};
export type ReportError = (error: unknown, source: string) => void;

export const sendReportAsBeacon = (report: ErrorReport) =>
  navigator.sendBeacon('/api/client-errors', JSON.stringify(report));

export const createErrorReporter =
  (
    release: string,
    sendReport: (report: ErrorReport) => void = sendReportAsBeacon
  ): ReportError =>
  (error, source) =>
    sendReport({
      message: String(error),
      release,
      source,
      url: window.location.pathname,
    });

export const installGlobalErrorHandlers = (reportError: ReportError) => {
  window.addEventListener('error', (event) =>
    reportError(event.error, 'window')
  );
  window.addEventListener('unhandledrejection', (event) =>
    reportError(event.reason, 'promise')
  );
};
