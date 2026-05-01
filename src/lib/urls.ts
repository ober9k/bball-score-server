/**
 * Builder for API URLs.
 * @param parts
 */
function buildApiUrl(parts: string[]): string {
  return parts.join("/");
}

/**
 * Base URL for all API URLs.
 */
export function getBaseUrl(): string {
  return buildApiUrl(["", "api", "v1"]);
}

/**
 * Base URL for auth API URLs.
 */
export function getBaseAuthUrl(): string {
  return buildApiUrl([getBaseUrl(), "auth"]);
}

/**
 * Base URL for all API URLs relative to a league.
 */
export function getBaseLeagueUrl(): string {
  return buildApiUrl([getBaseUrl(), "leagues", ":leagueId"]);
}

/**
 * Base URL for all manage API urls relative to a league.
 */
export function getBaseManageUrl(): string {
  return buildApiUrl([getBaseLeagueUrl(), "manage"]);
}
