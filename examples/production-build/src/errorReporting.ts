export type ErrorReport = {
  message: string;
  release: string;
  source: string;
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
    sendReport({ message: String(error), release, source });
