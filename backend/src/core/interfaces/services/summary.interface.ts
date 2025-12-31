export interface ISummaryService {
  summarize(text: string): Promise<string>;
}

export const SUMMARY_SERVICE = Symbol('ISummaryService');
