import DonateWidget from './components/DonateWidget';

// Placeholder identity — swap for the NGO's registered name before launch.
const NGO_NAME = 'Bright Futures Cambodia';

const stats = [
  { value: '79', label: 'Children in our care' },
  { value: '28,835', label: 'Meals provided every year' },
  { value: '$0.89', label: 'Feeds one child for a day' },
  { value: '$35,228', label: "Annual children's budget — fully itemized" },
];

const schoolKit = [
  { item: 'Books', quantity: '15 books', cost: '$5.00' },
  { item: 'Pens', quantity: '10 pens', cost: '$2.50' },
  { item: 'School bags', quantity: '2 bags', cost: '$20.00' },
  { item: 'School clothes', quantity: '3 sets', cost: '$45.00' },
  { item: 'Other educational & extra expenses', quantity: '—', cost: '$50.00' },
];

const commitments = [
  {
    emoji: '🧾',
    title: 'A receipt for every gift',
    text: 'Every donation is confirmed personally, with a receipt showing exactly what your money was used for.',
  },
  {
    emoji: '📸',
    title: 'Photo & video proof',
    text: 'We send photos and videos from the meals, school-supply purchases and rice distributions your gift made possible.',
  },
  {
    emoji: '💬',
    title: 'You talk to a real person',
    text: 'No forms, no call centers. You message us directly on Telegram or email, and we reply within 24 hours.',
  },
  {
    emoji: '🚪',
    title: 'An open door',
    text: 'Visiting Phnom Penh? Come meet the children and elders yourself. Any donor is welcome to see our work in person.',
  },
];

const faqs = [
  {
    q: 'How do I actually donate?',
    a: 'Message us on Telegram or email (see the contact section below). We will send you our KHQR code or bank details, confirm when your gift arrives, and follow up with a receipt and photos of what it funded. Online card payments are launching soon.',
  },
  {
    q: 'How do I know my money reaches the children?',
    a: 'Three ways: our full budget is published on this page down to the price of a pen; every donation gets a receipt plus photo or video proof of what it bought; and you are welcome to visit us in Phnom Penh and see the work yourself.',
  },
  {
    q: 'Who runs this organization?',
    a: 'We are a small community team in Phnom Penh working directly with the children and elders you see in the photos and videos on this page. When you contact us, you speak with the people doing the work — not an intermediary.',
  },
  {
    q: 'Can I give supplies instead of money?',
    a: 'Yes. Rice, school supplies, uniforms and books are always needed. Message us first so we can tell you exactly what the children need right now.',
  },
  {
    q: 'Can I visit or volunteer?',
    a: 'Absolutely. Teach English, help at a rice distribution, or just come and meet everyone. Contact us on Telegram or email and we will arrange it.',
  },
];

const budget = [
  {
    program: 'Daily meals for 79 children',
    cost: '$25,550.00',
    percent: 72.5,
    detail: 'Rice, vegetables and meat — $70 per day for all 79 children',
  },
  {
    program: 'School & educational support',
    cost: '$9,677.50',
    percent: 27.5,
    detail: '$122.50 per child per year for books, uniforms, bags and fees',
  },
];

function Header() {
  const links = [
    ['Programs', '#programs'],
    ['Transparency', '#transparency'],
    ['FAQ', '#faq'],
    ['Volunteer', '#volunteer'],
    ['Contact', '#contact'],
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-orange-100/60 bg-[#fdf8f3]/90 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#f26b3a] text-lg text-white">
            ♥
          </span>
          <span className="text-lg font-bold tracking-tight">{NGO_NAME}</span>
        </a>
        <nav className="hidden items-center gap-7 text-sm font-medium text-stone-600 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="transition hover:text-[#f26b3a]">
              {label}
            </a>
          ))}
        </nav>
        <a
          href="#donate"
          className="rounded-xl bg-[#f26b3a] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#e05a29]"
        >
          Donate
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-5 pb-20 pt-14 sm:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-4 inline-block rounded-full bg-orange-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#e05a29]">
            Phnom Penh · Cambodia
          </p>
          <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl">
            Small effort makes a{' '}
            <span className="text-[#f26b3a]">big change.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-stone-600">
            We care for <strong>79 children</strong> and the{' '}
            <strong>elders of our community</strong> in Cambodia — warm meals
            every day, everything the kids need for school, and rice for
            grandmothers and grandfathers with no one else to lean on.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#donate"
              className="rounded-2xl bg-[#f26b3a] px-8 py-4 text-base font-bold text-white transition hover:bg-[#e05a29]"
            >
              Donate now
            </a>
            <a
              href="#volunteer"
              className="rounded-2xl border-2 border-stone-300 px-8 py-4 text-base font-bold text-stone-700 transition hover:border-[#f26b3a] hover:text-[#f26b3a]"
            >
              Become a volunteer
            </a>
          </div>
          <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-stone-500">
            <span className="text-[#f26b3a]">✓</span> Fully published budget
            <span className="text-[#f26b3a]">✓</span> Receipt &amp; photo proof
            for every gift
            <span className="text-[#f26b3a]">✓</span> Visitors welcome
          </p>
        </div>

        <div className="relative">
          <img
            src="/images/hero.jpg"
            alt="Our team with elderly community members receiving rice support"
            className="aspect-[4/3] w-full rounded-[32px] object-cover shadow-xl"
          />
          <div className="absolute -left-3 top-8 rounded-2xl bg-white px-4 py-3 shadow-lg sm:-left-8">
            <p className="text-xs font-semibold text-stone-500">Quick fundraise</p>
            <p className="text-sm font-bold text-[#f26b3a]">
              $70 = one day of meals for all 79
            </p>
          </div>
          <div className="absolute -bottom-6 right-4 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-lg">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-orange-100 text-lg">
              🤝
            </span>
            <div>
              <p className="text-sm font-bold">Become a volunteer</p>
              <p className="text-xs text-stone-500">Give your time &amp; skills</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="border-y border-orange-100/60 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 py-12 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-extrabold tracking-tight text-[#f26b3a] sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1.5 text-sm font-medium text-stone-500">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Programs() {
  return (
    <section id="programs" className="mx-auto max-w-6xl px-5 py-20">
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#f26b3a]">
          Our programs
        </p>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          The promises we keep, every day
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article className="overflow-hidden rounded-3xl border border-orange-100 bg-white">
          <img
            src="/images/children-2.jpg"
            alt="The children in our care with our team at the center"
            className="aspect-[16/9] w-full object-cover"
          />
          <div className="p-7">
            <h3 className="text-xl font-bold">Daily meals for 79 children</h3>
            <p className="mt-2.5 leading-relaxed text-stone-600">
              Nutritious meals with rice, vegetables and meat — every child,
              every day of the year. The total cost is about{' '}
              <strong>$70 per day</strong>, or <strong>$25,550 per year</strong>.
            </p>
            <p className="mt-4 inline-block rounded-xl bg-orange-50 px-4 py-2 text-sm font-bold text-[#e05a29]">
              $0.89 feeds one child for a day
            </p>
          </div>
        </article>

        <article className="overflow-hidden rounded-3xl border border-orange-100 bg-white">
          <img
            src="/images/children-1.jpg"
            alt="The children we support, outside our community building"
            className="aspect-[16/9] w-full object-cover"
          />
          <div className="p-7">
            <h3 className="text-xl font-bold">School &amp; educational support</h3>
            <p className="mt-2.5 leading-relaxed text-stone-600">
              Books, pens, school bags, uniforms and other school expenses for
              every child — <strong>$122.50 per child per year</strong>,{' '}
              <strong>$9,677.50</strong> for all 79 children.
            </p>
            <p className="mt-4 inline-block rounded-xl bg-orange-50 px-4 py-2 text-sm font-bold text-[#e05a29]">
              $122.50 equips one child for a full school year
            </p>
          </div>
        </article>

        <article className="overflow-hidden rounded-3xl border border-orange-100 bg-white">
          <img
            src="/images/food-support.jpg"
            alt="Elderly community members with bags of rice at our distribution"
            className="aspect-[16/9] w-full object-cover"
          />
          <div className="p-7">
            <h3 className="text-xl font-bold">Care for the elderly</h3>
            <p className="mt-2.5 leading-relaxed text-stone-600">
              We bring rice, food and care to elderly people in our community —
              grandmothers and grandfathers living alone or without support,
              through regular distribution events.
            </p>
            <p className="mt-4 inline-block rounded-xl bg-orange-50 px-4 py-2 text-sm font-bold text-[#e05a29]">
              A bag of rice carries an elder through the month
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

function FromTheField() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-20">
      <div className="mb-10 max-w-2xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#f26b3a]">
          From the field
        </p>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Moments with our children and elders
        </h2>
        <p className="mt-4 leading-relaxed text-stone-600">
          From our latest visits — the children in our care and the elders we
          bring rice to.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <img
          src="/images/distribution.jpg"
          alt="The community gathered at our rice distribution event"
          className="aspect-[3/4] w-full rounded-3xl object-cover"
        />
        <video
          src="/videos/distribution.mp4"
          controls
          muted
          playsInline
          preload="metadata"
          className="aspect-[3/4] w-full rounded-3xl bg-stone-900 object-contain"
        />
        <video
          src="/videos/children.mp4"
          controls
          muted
          playsInline
          preload="metadata"
          className="aspect-[3/4] w-full rounded-3xl bg-stone-900 object-contain"
        />
      </div>
    </section>
  );
}

function Transparency() {
  return (
    <section id="transparency" className="border-y border-orange-100/60 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#f26b3a]">
            Full transparency
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Exactly where every dollar goes
          </h2>
          <p className="mt-4 leading-relaxed text-stone-600">
            We publish our complete children&apos;s budget, so you can see the
            price of every book, every uniform and every meal. Rice
            distributions for our elders are organized as separate events on
            top of this.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="mb-4 text-lg font-bold">
              Annual budget — $35,227.50 total
            </h3>
            <div className="space-y-5">
              {budget.map((line) => (
                <div key={line.program}>
                  <div className="mb-1.5 flex items-baseline justify-between gap-4">
                    <p className="font-semibold">{line.program}</p>
                    <p className="font-bold text-[#f26b3a]">{line.cost}</p>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-orange-50">
                    <div
                      className="h-full rounded-full bg-[#f26b3a]"
                      style={{ width: `${line.percent}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-sm text-stone-500">{line.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl bg-[#201a15] p-6 text-white">
              <p className="text-sm font-medium text-stone-400">
                Total estimated annual cost
              </p>
              <p className="mt-1 text-3xl font-extrabold">$35,227.50</p>
              <p className="mt-1.5 text-sm text-stone-400">
                That&apos;s $445.92 to fully support one child for a whole year.
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold">
              What one child&apos;s school kit costs per year
            </h3>
            <div className="overflow-hidden rounded-2xl border border-orange-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-orange-50 text-left text-xs font-bold uppercase tracking-wider text-stone-500">
                    <th className="px-5 py-3.5">Item</th>
                    <th className="px-5 py-3.5">Quantity</th>
                    <th className="px-5 py-3.5 text-right">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {schoolKit.map((row) => (
                    <tr key={row.item} className="border-t border-orange-50">
                      <td className="px-5 py-3.5 font-medium">{row.item}</td>
                      <td className="px-5 py-3.5 text-stone-500">
                        {row.quantity}
                      </td>
                      <td className="px-5 py-3.5 text-right font-semibold">
                        {row.cost}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-orange-100 bg-orange-50/50">
                    <td className="px-5 py-3.5 font-bold" colSpan={2}>
                      Total per child per year
                    </td>
                    <td className="px-5 py-3.5 text-right font-extrabold text-[#f26b3a]">
                      $122.50
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-stone-500">
              × 79 children = <strong>$9,677.50 per year</strong> for full
              school &amp; educational support.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function OurPromise() {
  return (
    <section id="promise" className="mx-auto max-w-6xl px-5 py-20">
      <div className="mb-12 max-w-2xl">
        <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#f26b3a]">
          Our promise to donors
        </p>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          You&apos;ll always know what your gift did
        </h2>
        <p className="mt-4 leading-relaxed text-stone-600">
          We&apos;re a small team, and we treat every donation like it came from
          a friend — because it did. Here is what we commit to, for every
          single gift.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {commitments.map((c) => (
          <div
            key={c.title}
            className="rounded-3xl border border-orange-100 bg-white p-7"
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-orange-100 text-2xl">
              {c.emoji}
            </span>
            <h3 className="mt-5 text-lg font-bold">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              {c.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="border-y border-orange-100/60 bg-white">
      <div className="mx-auto max-w-3xl px-5 py-20">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#f26b3a]">
            Common questions
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Honest answers, before you give
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-2xl border border-orange-100 bg-[#fdf8f3] px-6 py-4 open:bg-white"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold marker:hidden">
                {faq.q}
                <span className="text-xl text-[#f26b3a] transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Donate() {
  return (
    <section id="donate" className="mx-auto max-w-6xl px-5 py-20">
      <div className="grid items-start gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#f26b3a]">
            Donate
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Your support is really powerful.
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-stone-600">
            Every gift maps directly to a real cost in our published budget —
            meals on the table, children in school, and rice in the hands of
            our elders. Give once, or become a monthly supporter and carry a
            child through the whole year.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              ['🍚', '$27 a month feeds one child every single day'],
              ['🏫', '$70 feeds all 79 children for one full day'],
              ['🎒', '$123 sends one child to school for a year'],
              ['💛', '$446 covers one child completely — meals + school'],
            ].map(([emoji, text]) => (
              <li key={text} className="flex items-center gap-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange-100 text-lg">
                  {emoji}
                </span>
                <span className="font-medium text-stone-700">{text}</span>
              </li>
            ))}
          </ul>
        </div>
        <DonateWidget />
      </div>
    </section>
  );
}

function Volunteer() {
  return (
    <section id="volunteer" className="mx-auto max-w-6xl px-5 pb-20">
      <div className="grid items-center gap-10 rounded-[32px] bg-[#201a15] p-8 text-white sm:p-12 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-[#f26b3a]">
            Volunteer
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Can&apos;t donate? Give your time.
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-stone-300">
            Teach English, run activities, help at a rice distribution or share
            your professional skills. A few hours of your time changes what a
            child believes is possible — and brightens an elder&apos;s whole
            week.
          </p>
        </div>
        <a
          href="#contact"
          className="rounded-2xl bg-[#f26b3a] px-8 py-4 text-center text-base font-bold text-white transition hover:bg-[#e05a29]"
        >
          Apply to volunteer
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="border-t border-orange-100/60 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#f26b3a] text-lg text-white">
              ♥
            </span>
            <span className="text-lg font-bold tracking-tight">{NGO_NAME}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone-500">
            Daily meals and full school support for 79 children, and rice and
            care for the elders of our community in Cambodia — with a fully
            published budget.
          </p>
        </div>
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-wider text-stone-400">
            Explore
          </p>
          <ul className="space-y-2.5 text-sm font-medium text-stone-600">
            <li><a href="#programs" className="hover:text-[#f26b3a]">Programs</a></li>
            <li><a href="#transparency" className="hover:text-[#f26b3a]">Transparency</a></li>
            <li><a href="#donate" className="hover:text-[#f26b3a]">Donate</a></li>
            <li><a href="#volunteer" className="hover:text-[#f26b3a]">Volunteer</a></li>
          </ul>
        </div>
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-wider text-stone-400">
            Contact &amp; donate
          </p>
          <ul className="space-y-2.5 text-sm font-medium text-stone-600">
            <li>
              <a
                href="https://t.me/Lemongrassoils"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#f26b3a]"
              >
                Telegram: @Lemongrassoils
              </a>
            </li>
            <li>
              <a
                href="mailto:aloudoil@gmail.com"
                className="hover:text-[#f26b3a]"
              >
                Email: aloudoil@gmail.com
              </a>
            </li>
            <li>Phnom Penh, Cambodia 🇰🇭</li>
          </ul>
          <p className="mt-4 max-w-xs rounded-2xl bg-orange-50 px-4 py-3 text-xs leading-relaxed text-stone-600">
            <strong className="text-stone-800">To donate:</strong> message us
            and we&apos;ll send our KHQR code or bank details, confirm your
            gift, and follow up with a receipt and photos. We reply within 24
            hours.
          </p>
        </div>
      </div>
      <div className="border-t border-orange-100/60 py-5 text-center text-xs text-stone-400">
        © {new Date().getFullYear()} {NGO_NAME}. Made with ♥ in Cambodia.
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Stats />
      <Programs />
      <FromTheField />
      <Transparency />
      <OurPromise />
      <Donate />
      <Faq />
      <Volunteer />
      <Footer />
    </main>
  );
}
