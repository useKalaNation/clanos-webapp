/** Every route in the HANDOFF.md screen inventory. Build links from these, never by hand. */
export const ROUTES = {
  signIn: '/sign-in',
  signUp: '/sign-up',
  verifyEmail: '/sign-up/verify',
  forgotPassword: '/forgot-password',
  resetLinkSent: '/forgot-password/sent',
  resetPassword: (token: string) => `/reset-password/${encodeURIComponent(token)}`,
  passwordUpdated: '/reset-password/done',
  invitation: (token: string) => `/invitations/${encodeURIComponent(token)}`,
  onboardingGame: '/onboarding/game',
  onboardingGameProfile: '/onboarding/game-profile',
  onboardingClans: '/onboarding/clans',
  dashboard: '/dashboard',
  alerts: '/alerts',
  profile: '/me',
  clans: '/clans',
  newClan: '/clans/new',
  clan: (clanId: string) => `/clans/${encodeURIComponent(clanId)}`,
  clanMembers: (clanId: string) => `/clans/${encodeURIComponent(clanId)}/members`,
  clanRecruitment: (clanId: string) => `/clans/${encodeURIComponent(clanId)}/recruitment`,
  clanStaff: (clanId: string) => `/clans/${encodeURIComponent(clanId)}/staff`,
  clanAnnouncements: (clanId: string) => `/clans/${encodeURIComponent(clanId)}/announcements`,
  clanTeams: (clanId: string) => `/clans/${encodeURIComponent(clanId)}/teams`,
  clanRules: (clanId: string) => `/clans/${encodeURIComponent(clanId)}/rules`,
  clanSettings: (clanId: string) => `/clans/${encodeURIComponent(clanId)}/settings`,
  adminUsers: '/admin/users',
} as const;

/** Routes in the (app) group, for the sign-in gate that returns with API auth (ADR 0008). */
const APP_ROUTE_PREFIXES = ['/dashboard', '/alerts', '/me', '/clans', '/onboarding', '/admin'];

export function isAppRoute(pathname: string): boolean {
  return APP_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
