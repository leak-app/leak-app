import type { SessionModel } from '@/entities/session';
import { MonitorIcon, SmartphoneIcon } from '@/shared/icons';

interface Props {
  session: SessionModel;
  onRevoke: (session: SessionModel) => void;
  isRevoking: boolean;
}

export function SessionRow({ session, onRevoke, isRevoking }: Props) {
  const Icon = session.icon === 'smartphone' ? SmartphoneIcon : MonitorIcon;
  return (
    <li className="flex items-center gap-3 rounded-2xl bg-surface/60 border border-outline/10 px-4 py-3">
      <Icon
        size={22}
        className="text-on-surface-variant shrink-0"
        aria-hidden="true"
      />
      <div className="flex flex-col flex-1 min-w-0">
        <span className="flex items-center gap-2 text-sm font-semibold text-on-surface">
          <span className="line-clamp-1">{session.deviceText}</span>
          {session.isCurrent && (
            <span className="badge badge-primary badge-soft badge-sm">
              Thiết bị này
            </span>
          )}
        </span>
        <span className="text-xs text-on-surface-variant">
          {session.lastActiveText}
        </span>
        <span className="text-xs text-on-surface-variant">
          {session.ipText}
        </span>
      </div>
      {!session.isCurrent && (
        <button
          type="button"
          disabled={isRevoking}
          onClick={() => onRevoke(session)}
          className="btn btn-ghost btn-sm min-h-11 text-error"
          aria-label={`Đăng xuất ${session.deviceText}`}
        >
          Đăng xuất
        </button>
      )}
    </li>
  );
}
