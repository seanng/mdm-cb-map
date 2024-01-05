import 'server-only'

import dayjs from 'dayjs'
import Image from 'next/image'

interface Rate {
  currency: string
  rate: number
  flag?: string
}

async function getForexRates(): Promise<Rate[]> {
  const { data } = await fetch(
    'https://api.coinbase.com/v2/exchange-rates?currency=TWD',
    // Revalidate every 60 seconds
    { next: { revalidate: 60 } }
  ).then((res) => res.json())

  return [
    {
      flag: '/images/timezone/us.png',
      currency: 'USD',
      rate: 1 / data.rates.USD,
    },
    {
      flag: '/images/timezone/cn.png',
      currency: 'RMB',
      rate: 1 / data.rates.CNY,
    },
    {
      flag: '/images/timezone/uk.png',
      currency: 'GBP',
      rate: 1 / data.rates.GBP,
    },
    {
      flag: '/images/timezone/eu.png',
      currency: 'EUR',
      rate: 1 / data.rates.EUR,
    },
    {
      flag: '/images/timezone/jp.png',
      currency: 'JPY',
      rate: 1 / data.rates.JPY,
    },
    {
      flag: '/images/timezone/ca.png',
      currency: 'CAD',
      rate: 1 / data.rates.CAD,
    },
  ]
}

export async function ForexRatesSection() {
  const rates = await getForexRates()
  const updatedAt = dayjs().format('MM-DD HH:mm')

  return (
    <section className="hidden lg:flex items-center justify-between border -mb-1 py-1 px-2 rounded-md border-[#eee] text-[13px] text-gray-500">
      <p>實時匯率（{updatedAt}）</p>
      {rates.map((rate) => (
        <span key={rate.currency} className="flex items-center">
          <span className="hidden lg:block mr-2">
            {rate.flag && (
              <Image
                src={rate.flag}
                alt={rate.currency}
                width={18}
                height={12}
              />
            )}
          </span>
          <span>
            1 {rate.currency} = NT {Number(rate.rate).toFixed(3)}
          </span>
        </span>
      ))}
    </section>
  )
}
