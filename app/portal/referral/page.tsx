import { PortalReferralContent } from "@/components/portal-referral-content";
import { requireUser } from "@/lib/require-user";

export default async function PortalReferralPage() {
  await requireUser();
  return <PortalReferralContent />;
}
