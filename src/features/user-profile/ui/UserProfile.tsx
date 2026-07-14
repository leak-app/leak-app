import { useAuth } from '@/app/providers';
import { useAuthStore } from '@/entities/auth';

export function UserProfile() {
  const { user } = useAuth();
  const { logout } = useAuthStore();

  if (!user) return null;

  return (
    <div className="flex-1 flex flex-col mt-4 gap-6">
      {/* Profile Header Info Card */}
      <div className="p-6 rounded-3xl bg-surface border border-outline/10 shadow-lg flex flex-col items-center text-center select-none">
        <div className="avatar">
          <div className="w-20 h-20 rounded-full border-2 border-primary/20 bg-surface-bright overflow-hidden">
            <img
              src={`https://api.dicebear.com/10.x/lorelei/svg?seed=user-${user.id}`}
              alt={user.name || 'User Avatar'}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <h2 className="text-headline-md font-bold text-on-surface mt-4">
          {user.name || 'User'}
        </h2>
        <span className="text-xs text-on-surface-variant font-mono mt-1 select-all">
          {user.email}
        </span>
        <span className="mt-3 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
          Premium Account
        </span>
      </div>

      {/* Account Settings List */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider select-none text-left">
          Settings
        </h3>

        <div className="rounded-2xl bg-surface/50 border border-outline/5 overflow-hidden flex flex-col select-none">
          {[
            { label: 'Security & Password', desc: 'Manage your credentials' },
            { label: 'Payment Methods', desc: 'Link cards or bank accounts' },
            {
              label: 'App Notifications',
              desc: 'Configure alerts and triggers',
            },
            { label: 'Language', desc: 'English (US)' },
          ].map((item, idx) => (
            <button
              key={idx}
              className="px-5 py-3.5 border-b border-outline-variant/30 last:border-b-0 hover:bg-surface/50 transition-colors flex items-center justify-between text-left group"
            >
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">
                  {item.label}
                </span>
                <span className="text-xs text-on-surface-variant mt-0.5">
                  {item.desc}
                </span>
              </div>
              <svg
                className="w-4 h-4 text-on-surface-variant group-hover:text-on-surface transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-auto pt-6 pb-4">
        <button
          onClick={logout}
          className="w-full py-3.5 rounded-full bg-error/15 hover:bg-error/25 border border-error/20 active:scale-98 transition-all text-error font-bold text-sm shadow-md"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
