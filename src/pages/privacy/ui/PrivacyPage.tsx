import { usePageTitle } from '@/shared/hooks';
import { PublicLayout } from '@/shared/layout';
import { LegalDocument } from '@/shared/ui';

import { PRIVACY_DOCUMENT, PRIVACY_PAGE_TITLE } from '../model/content';

export default function PrivacyPage() {
  usePageTitle(PRIVACY_PAGE_TITLE);

  return (
    <PublicLayout>
      <LegalDocument content={PRIVACY_DOCUMENT} />
    </PublicLayout>
  );
}
