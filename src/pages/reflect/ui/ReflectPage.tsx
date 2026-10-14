import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
  useReflectionQueue,
  type TransactionModel,
} from '@/entities/transaction';
import { ReflectionSession } from '@/features/reflection-ritual';
import { BackButton, MainLayout, Screen, ScreenHeader } from '@/shared/layout';
import { buttonStyles, Card, EmptyState } from '@/shared/ui';

import { reflectView } from '../lib/reflectView';

export default function ReflectPage() {
  const navigate = useNavigate();
  const { data, isError } = useReflectionQueue();

  // The queue shrinks after every review. Take one snapshot when it first
  // arrives so the session walks a fixed list instead of reshuffling.
  const [items, setItems] = useState<TransactionModel[] | null>(null);
  if (items === null && data) {
    setItems(data.items);
  }

  const goToToday = () => navigate('/overview');

  const view = reflectView({
    hasSnapshot: items !== null,
    count: items?.length ?? 0,
    isError,
  });

  let body;
  if (view === 'error') {
    body = (
      <Card
        variant="danger"
        role="alert"
        className="text-description text-text"
      >
        Không thể tải các khoản chi cần nhìn lại. Vui lòng thử lại sau.
      </Card>
    );
  } else if (view === 'loading' || items === null) {
    body = (
      <div className="flex justify-center py-10">
        <span
          className="loading loading-spinner loading-md text-primary"
          aria-label="Đang tải"
        />
      </div>
    );
  } else if (view === 'empty') {
    body = (
      <EmptyState
        title="Chưa có khoản chi nào cần nhìn lại"
        description="Leak sẽ hỏi lại bạn sau 24 giờ kể từ lúc bạn ghi chi tiêu."
        action={
          <Link
            to="/overview"
            className={buttonStyles({ variant: 'secondary' })}
          >
            Về trang Hôm nay
          </Link>
        }
      />
    );
  } else {
    body = (
      <ReflectionSession
        items={items}
        onClose={goToToday}
      />
    );
  }

  return (
    <MainLayout
      showBottomNav={false}
      mist="lavender"
    >
      <Screen
        header={
          <ScreenHeader
            title="Nhìn lại chi tiêu"
            leftAction={<BackButton onClick={goToToday} />}
          />
        }
      >
        {body}
      </Screen>
    </MainLayout>
  );
}
