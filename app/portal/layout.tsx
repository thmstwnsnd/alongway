import type { ReactNode } from "react";

import { auth } from "@/auth";
import { PortalShell } from "@/components/portal-shell";

export default async function PortalLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  return <PortalShell signedIn={Boolean(session?.user)}>{children}</PortalShell>;
}
