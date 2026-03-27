/**
 * Builder for API URLs.
 * @param parts
 */
function buildApiUrl(parts: string[]): string {
  // prepend the slash too
  return ["/", ...parts].join("/");
}

/**
 * Base URL for all API URLs.
 */
export function getBaseUrl(): string {
  return buildApiUrl(["api", "v1"]);
}

/**
 * Base URL for all API URLs relative to a league.
 */
export function getBaseLeagueUrl(): string {
  return buildApiUrl([getBaseUrl(), "league", ":leagueId"]);
}
