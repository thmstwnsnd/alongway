import { PortalAccountForm } from "@/components/portal-account-form";
import { requireUser } from "@/lib/require-user";

export default async function PortalAccountPage() {
  await requireUser();
  return <PortalAccountForm />;
}
