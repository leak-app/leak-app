import { useAuth } from '@/app/providers';

import { deserializeUserIdentity } from '../lib/deserialize';

/** Avatar initials, name and email. */
export function UserIdentity() {
  const { user } = useAuth();
  if (!user) return null;
  const identity = deserializeUserIdentity(user);

  return (
    <div className="flex items-center gap-3.5 py-1 select-none">
      <span
        aria-hidden="true"
        className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary-tint text-base font-semibold text-secondary"
      >
        {identity.initials}
      </span>
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="truncate text-heading text-text">
          {identity.displayName}
        </span>
        <span className="truncate text-label font-normal text-muted select-all">
          {identity.email}
        </span>
      </div>
    </div>
  );
}
