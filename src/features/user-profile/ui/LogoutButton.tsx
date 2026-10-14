import { useAuthStore } from '@/entities/auth';
import { Button } from '@/shared/ui';

export function LogoutButton() {
  const { logout } = useAuthStore();

  return (
    <Button
      variant="danger"
      size="lg"
      fullWidth
      onClick={logout}
    >
      Đăng xuất
    </Button>
  );
}
