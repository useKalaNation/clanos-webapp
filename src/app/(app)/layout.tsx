import { AppShell } from '@/components/layout/app-shell';
import { PLACEHOLDER_SHELL } from '@/components/layout/app-shell-placeholder';

// Signed-in screens; the proxy sends signed-out visitors to sign-in. The shell's session and
// count props use placeholder data until auth and the API exist.
export default function SignedInLayout({ children }: LayoutProps<'/'>) {
  return <AppShell {...PLACEHOLDER_SHELL}>{children}</AppShell>;
}
