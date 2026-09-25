import { useRevokeSession, useSessions } from '@/entities/session';
import { getApiErrorMessage } from '@/shared/api';

import { SessionRow } from './SessionRow';

export function SessionList() {
  const { data: sessions = [], isLoading, isError, refetch } = useSessions();
  const revoke = useRevokeSession();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2">
        <div className="skeleton h-20 rounded-2xl" />
        <div className="skeleton h-20 rounded-2xl" />
      </div>
    );
  }
  if (isError) {
    return (
      <div
        role="alert"
        className="alert alert-error alert-soft text-sm"
      >
        <span>Không tải được danh sách phiên</span>
        <button
          type="button"
          className="btn btn-sm min-h-11"
          onClick={() => refetch()}
        >
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <ul className="flex flex-col gap-2">
        {sessions.map((s) => (
          <SessionRow
            key={s.id}
            session={s}
            isRevoking={revoke.isPending && revoke.variables === s.id}
            onRevoke={(session) => revoke.mutate(session.id)}
          />
        ))}
      </ul>
      {revoke.isError && (
        <p
          role="alert"
          className="text-xs text-error"
        >
          {getApiErrorMessage(
            revoke.error,
            'Không đăng xuất được thiết bị này.'
          )}
        </p>
      )}
      <p className="text-xs text-on-surface-variant">
        Thiết bị sẽ bị đăng xuất trong vòng tối đa 60 phút.
      </p>
    </div>
  );
}
