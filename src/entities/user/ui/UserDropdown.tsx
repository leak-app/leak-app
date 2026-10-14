import { Link } from 'react-router-dom';

import { useAuth } from '@/app/providers';

export function UserDropdown() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Link
      to="/profile"
      className="avatar cursor-pointer select-none active:scale-95 transition-transform"
      aria-label="View Profile"
    >
      <div className="w-10 h-10 rounded-full border border-outline/10 overflow-hidden shadow-md hover:shadow-[0_0_0.75rem_rgba(56,189,248,0.15)] transition-all bg-surface-bright">
        <img
          src={`https://api.dicebear.com/10.x/lorelei/svg?seed=user-${user.id}`}
          alt={user.name || 'User Avatar'}
          className="w-full h-full object-cover"
        />
      </div>
    </Link>
  );
}
