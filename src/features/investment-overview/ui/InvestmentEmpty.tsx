import { Link } from 'react-router-dom';

import { CheckIcon } from '@/shared/icons';
import { buttonStyles, Card } from '@/shared/ui';

function Illustration() {
  return (
    <svg
      width="200"
      height="150"
      viewBox="0 0 200 150"
      aria-hidden="true"
      className="mb-3.5"
    >
      <path
        d="M20 132H180"
        className="stroke-white/15"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <rect
        x="44"
        y="96"
        width="28"
        height="36"
        rx="14"
        className="fill-pebble opacity-55"
      />
      <rect
        x="86"
        y="72"
        width="28"
        height="60"
        rx="14"
        className="fill-secondary opacity-80"
      />
      <rect
        x="128"
        y="46"
        width="28"
        height="86"
        rx="14"
        className="fill-primary"
      />
      <path
        d="M142 6C142 6 133 16.5 133 22a9 9 0 0 0 18 0C151 16.5 142 6 142 6z"
        className="fill-primary"
      />
      <circle
        cx="142"
        cy="38"
        r="2.5"
        className="fill-primary opacity-60"
      />
    </svg>
  );
}

const STEPS = [
  {
    key: 'create',
    text: (
      <>
        Tạo ví loại <strong className="font-medium text-text">Đầu tư</strong>{' '}
        cho mỗi nơi bạn đầu tư: quỹ, cổ phiếu, vàng, tiết kiệm…
      </>
    ),
  },
  {
    key: 'enter',
    text: (
      <>
        Mỗi tháng, nhập{' '}
        <strong className="font-medium text-text">một con số</strong>: tổng giá
        trị trong app môi giới.
      </>
    ),
  },
  {
    key: 'result',
    text: (
      <>
        Leak cho bạn biết tháng này{' '}
        <strong className="font-medium text-text">lãi hay lỗ</strong> — tiền nạp
        thêm không bị tính là lãi.
      </>
    ),
  },
];

/** No investment wallet yet: what the feature does in three steps. */
export function InvestmentEmpty() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col items-center gap-2.5 pt-7 text-center">
        <Illustration />
        <h2 className="text-section-title text-text">Chưa có ví đầu tư</h2>
        <p className="max-w-75 text-body text-muted">
          Tạo một ví loại Đầu tư, rồi nhập số dư mỗi tháng để biết mình lãi hay
          lỗ.
        </p>
      </div>

      <Card
        as="ol"
        className="flex flex-col gap-3.5 !rounded-3xl !p-4.5"
      >
        {STEPS.map((step, index) => (
          <li
            key={step.key}
            className="flex items-start gap-3"
          >
            {index === STEPS.length - 1 ? (
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-tint text-primary">
                <CheckIcon
                  size={14}
                  strokeWidth={2.4}
                  aria-hidden="true"
                />
              </span>
            ) : (
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-track text-caption font-semibold text-text">
                {index + 1}
              </span>
            )}
            <span className="text-description text-soft">{step.text}</span>
          </li>
        ))}
      </Card>

      <Link
        to="/wallets"
        className={buttonStyles({ size: 'lg', fullWidth: true })}
      >
        Tạo ví đầu tư
      </Link>
    </div>
  );
}
