'use client';

import { useState } from 'react';

type Frequency = 'once' | 'monthly';

const tiers = [
  { amount: 27, impact: 'feeds one child every day for a month' },
  { amount: 70, impact: 'feeds all 79 children for a full day' },
  { amount: 123, impact: 'covers a full year of school supplies for one child' },
  { amount: 446, impact: 'fully supports one child for an entire year' },
];

const paymentMethods = ['KHQR', 'ABA Pay', 'Visa', 'Mastercard'];

export default function DonateWidget() {
  const [frequency, setFrequency] = useState<Frequency>('once');
  const [selected, setSelected] = useState<number | null>(70);
  const [custom, setCustom] = useState('');

  const amount = custom !== '' ? Number(custom) : selected;
  const activeTier = tiers.find((t) => t.amount === selected && custom === '');

  return (
    <div className="rounded-3xl border border-orange-100 bg-white p-4 shadow-[0_24px_60px_rgb(242_107_58/8%)] min-[360px]:p-5 sm:p-8">
      <div className="mb-6 grid grid-cols-2 gap-2 rounded-2xl bg-orange-50 p-1.5">
        {(
          [
            ['once', 'One-time'],
            ['monthly', 'Monthly'],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setFrequency(value)}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
              frequency === value
                ? 'bg-[#f26b3a] text-white shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2">
        {tiers.map((tier) => (
          <button
            key={tier.amount}
            type="button"
            onClick={() => {
              setSelected(tier.amount);
              setCustom('');
            }}
            className={`rounded-2xl border-2 px-4 py-3 text-left transition ${
              selected === tier.amount && custom === ''
                ? 'border-[#f26b3a] bg-orange-50'
                : 'border-stone-200 hover:border-orange-200'
            }`}
          >
            <span className="block text-lg font-bold">${tier.amount}</span>
            <span className="mt-0.5 block text-xs leading-snug text-stone-500">
              {tier.impact.charAt(0).toUpperCase() + tier.impact.slice(1)}
            </span>
          </button>
        ))}
      </div>

      <label className="mt-3 flex items-center gap-3 rounded-2xl border-2 border-stone-200 px-4 py-3 focus-within:border-[#f26b3a]">
        <span className="text-lg font-bold text-stone-400">$</span>
        <input
          type="number"
          min="1"
          inputMode="decimal"
          placeholder="Custom amount"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          className="w-full bg-transparent text-lg font-semibold outline-none placeholder:text-sm placeholder:font-normal placeholder:text-stone-400"
        />
      </label>

      <p className="mt-5 min-h-10 rounded-xl bg-stone-50 px-4 py-2.5 text-sm text-stone-600">
        {amount && amount > 0 ? (
          <>
            Your <strong>${amount}</strong>{' '}
            {frequency === 'monthly' ? 'monthly' : 'one-time'} gift{' '}
            {activeTier ? activeTier.impact : 'goes directly to meals and school support for our 79 children and rice for our elders'}
            .
          </>
        ) : (
          'Choose an amount to see the impact of your gift.'
        )}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {paymentMethods.map((method) => (
          <span
            key={method}
            className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-semibold text-stone-600"
          >
            {method}
          </span>
        ))}
      </div>

      <a
        href="#contact"
        className="mt-5 block rounded-2xl bg-[#f26b3a] px-6 py-4 text-center text-base font-bold text-white transition hover:bg-[#e05a29]"
      >
        Donate {amount && amount > 0 ? `$${amount}` : ''}{' '}
        {frequency === 'monthly' ? 'monthly' : ''}
      </a>
      <p className="mt-3 text-center text-xs text-stone-400">
        Online payments via KHQR &amp; ABA PayWay are launching soon. Contact
        us below to give today.
      </p>
    </div>
  );
}
