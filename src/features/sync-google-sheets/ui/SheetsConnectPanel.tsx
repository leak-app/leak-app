import { Link } from 'react-router-dom';

import {
  ArrowRightIcon,
  FolderIcon,
  ICON,
  MoonIcon,
  ShieldCheckIcon,
  TableIcon,
  type IconComponent,
} from '@/shared/icons';
import { Button, Card } from '@/shared/ui';

import { SHEETS_SYNC_COPY as COPY } from '../model/content';

const PITCH_ICON: Record<(typeof COPY.pitch)[number]['id'], IconComponent> = {
  'own-file': FolderIcon,
  'one-file': ShieldCheckIcon,
  nightly: MoonIcon,
};

interface SheetsConnectPanelProps {
  onConnect: () => void;
}

/** Not connected yet: what the sync is, then one clear way in. */
export function SheetsConnectPanel({ onConnect }: SheetsConnectPanelProps) {
  return (
    <>
      <Card
        as="section"
        aria-labelledby="sheets-sync-title"
        className="flex flex-col gap-5"
      >
        <div className="flex items-center gap-3.5">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-tint text-primary">
            <TableIcon
              size={22}
              strokeWidth={ICON.stroke.idle}
              aria-hidden="true"
            />
          </span>
          <div className="flex flex-col gap-0.5">
            <h3
              id="sheets-sync-title"
              className="text-base font-medium text-text"
            >
              {COPY.title}
            </h3>
            <span className="text-sm text-muted">{COPY.subtitle}</span>
          </div>
        </div>

        <ul className="flex flex-col gap-3.5">
          {COPY.pitch.map((item) => {
            const Icon = PITCH_ICON[item.id];
            return (
              <li
                key={item.id}
                className="flex items-start gap-3"
              >
                <span className="shrink-0 pt-px text-primary">
                  <Icon
                    size={ICON.size.row}
                    strokeWidth={ICON.stroke.idle}
                    aria-hidden="true"
                  />
                </span>
                <span className="text-description text-soft">
                  <span className="font-medium text-text">{item.lead}</span>{' '}
                  {item.text}
                </span>
              </li>
            );
          })}
        </ul>

        <Button
          size="lg"
          fullWidth
          onClick={onConnect}
          trailingIcon={
            <ArrowRightIcon
              size={ICON.size.row}
              strokeWidth={ICON.stroke.onPrimary}
              aria-hidden="true"
            />
          }
        >
          {COPY.connect}
        </Button>
      </Card>
      <Link
        to="/privacy"
        className="flex h-touch items-center justify-center self-center px-3 text-label text-primary hover:underline"
      >
        {COPY.privacyLink}
      </Link>
    </>
  );
}
