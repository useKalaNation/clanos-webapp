import { AuthLayout } from '@/components/layout/auth-layout';

// Signed-out flows (D01–D08) share the split layout; each page supplies only its content.
export default function AuthRouteLayout({ children }: LayoutProps<'/'>) {
  return <AuthLayout>{children}</AuthLayout>;
}
