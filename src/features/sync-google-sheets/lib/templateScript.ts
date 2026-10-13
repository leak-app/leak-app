/** Where nginx / Vite serve the Apps Script that builds the report tabs. */
export const TEMPLATE_SCRIPT_PATH = '/sheet-template/build-template.gs';

export type CopyScriptResult = 'copied' | 'failed';

export interface CopyScriptDeps {
  fetchText: (url: string) => Promise<string>;
  writeClipboard: (text: string) => Promise<void>;
}

/** Real browser dependencies; kept separate so the flow is testable without a DOM. */
export const browserCopyDeps: CopyScriptDeps = {
  fetchText: async (url) => {
    const response = await fetch(url);
    if (!response.ok)
      throw new Error(`Script request failed: ${response.status}`);
    return response.text();
  },
  writeClipboard: (text) => navigator.clipboard.writeText(text),
};

export async function copyTemplateScript(
  deps: CopyScriptDeps = browserCopyDeps
): Promise<CopyScriptResult> {
  try {
    const script = await deps.fetchText(TEMPLATE_SCRIPT_PATH);
    if (!script.trim()) return 'failed';
    await deps.writeClipboard(script);
    return 'copied';
  } catch {
    return 'failed';
  }
}
