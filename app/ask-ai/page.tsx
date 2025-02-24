import { PageHeader } from '@/components/page-header';
import { CustomAlertDialog } from '@/components/custom-alert-dialog';
import { auth } from '@/auth';

export default async function AskAIPage() {
  const session = await auth();
  if (!session) {
    return (
      <CustomAlertDialog
        title="Unauthorized"
        description="Sorry, you must be signed in to access this feature."
        href="/"
      />
    );
  }

  return (
    <div>
      <PageHeader title="Ask AI" />
    </div>
  );
}
