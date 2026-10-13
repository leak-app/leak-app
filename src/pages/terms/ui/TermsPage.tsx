import { usePageTitle } from '@/shared/hooks';
import { PublicLayout } from '@/shared/layout';
import { LegalDocument } from '@/shared/ui';

import { TERMS_DOCUMENT, TERMS_PAGE_TITLE } from '../model/content';

export default function TermsPage() {
  usePageTitle(TERMS_PAGE_TITLE);

  return (
    <PublicLayout>
      <LegalDocument content={TERMS_DOCUMENT} />
    </PublicLayout>
  );
}
