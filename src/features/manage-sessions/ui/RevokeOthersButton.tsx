import { useState } from 'react';

import { useRevokeOtherSessions, useSessions } from '@/entities/session';
import { getApiErrorMessage } from '@/shared/api';
import { BottomSheet } from '@/shared/ui';

export function RevokeOthersButton() {
  const { data: sessions = [] } = useSessions();
  const revokeOthers = useRevokeOtherSessions();
  const [open, setOpen] = useState(false);
  const others = sessions.filter((s) => !s.isCurrent).length;
  if (others === 0) return null;

  const close = () => {
    revokeOthers.reset();
    setOpen(false);
  };
  return (
    <>
      <button
        type="button"
        className="btn btn-outline btn-error min-h-11 w-full"
        onClick={() => setOpen(true)}
      >
        Đăng xuất khỏi mọi thiết bị khác
      </button>
      <BottomSheet
        open={open}
        onClose={close}
        title={`Đăng xuất khỏi ${others} thiết bị khác?`}
      >
        {revokeOthers.isError && (
          <div
            role="alert"
            className="alert alert-error alert-soft text-xs mb-3"
          >
            {getApiErrorMessage(
              revokeOthers.error,
              'Không thực hiện được. Vui lòng thử lại.'
            )}
          </div>
        )}
        <div className="flex gap-2">
          <button
            type="button"
            className="btn btn-ghost flex-1 min-h-11"
            onClick={close}
          >
            Hủy
          </button>
          <button
            type="button"
            disabled={revokeOthers.isPending}
            className="btn btn-error flex-1 min-h-11"
            onClick={() => revokeOthers.mutate(undefined, { onSuccess: close })}
          >
            Đăng xuất
          </button>
        </div>
      </BottomSheet>
    </>
  );
}
