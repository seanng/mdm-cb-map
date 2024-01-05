import Image from 'next/image'
import Link from 'next/link'
import { title } from 'configs/seo'
import { Searchbar } from './Searchbar'

// Original Logo Resolution: 809 x 264
const DESKTOP_WIDTH = 300
const MOBILE_WIDTH = 240
const ORIGINAL_WIDTH = 809
const ORIGINAL_HEIGHT = 264

export function TopSection() {
  return (
    <div className="bg-gradient-to-b from-slate-300 to-slate-100 pt-10">
      <div className="relative flex flex-col sm:flex-row pb-10 lg:pb-12 mx-auto px-4 lg:max-w-[91.66%] 2xl:max-w-[1600px] lg:pl-[8.33%]">
        <div className="flex flex-none text-3xl rounded-xl justify-center items-end mb-7 sm:mb-0 sm:mr-10 lg:mr-20">
          <div className="hidden md:block">
            <Link className="group relative" href="/">
              <Image
                src="/cb-map-logo-2.png"
                alt={title}
                height={(DESKTOP_WIDTH / ORIGINAL_WIDTH) * ORIGINAL_HEIGHT}
                width={DESKTOP_WIDTH}
              />
              <div className="fixed hidden group-hover:block text-orange-700 top-0 left-52 z-10">
                <div className="absolute left-28 -top-3 -z-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="64"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M256.5 64.5l-192 192h112v392h160v-392h112z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="mt-4 bg-orange-700 text-white p-2 rounded-md text-sm">
                  拖動LOGO到書籤欄，立即收藏cb-map
                </div>
              </div>
            </Link>
          </div>
          <div className="md:hidden">
            <Link href="/">
              <Image
                src="/cb-map-logo-2.png"
                alt={title}
                height={(MOBILE_WIDTH / ORIGINAL_WIDTH) * ORIGINAL_HEIGHT}
                width={MOBILE_WIDTH}
              />
            </Link>
          </div>
        </div>
        <div className="grow max-w-4xl mr-[5%]">
          <Searchbar />
        </div>
        {/* <div className="hidden w-[27.5%] lg:w-[60vw] xl:w-[27.5%] max-w-sm xl:max-w-none items-end">
        <SectionTopRight />
      </div> */}
      </div>
    </div>
  )
}

function SectionTopRight() {
  return (
    <div className="bg-transparent relative overflow-hidden h-20 w-full border border-white rounded-sm leading-6 pl-2 text-sm text-gray-500">
      <ul>
        <li>超1.8亿次安装载榜首竟是...</li>
        <li>超1.8亿次安装载榜首竟是...</li>
        <li>超1.8亿次安装载榜首竟是...</li>
        <li>超1.8亿次安装载榜首竟是...</li>
        <li>超1.8亿次安装载榜首竟是...</li>
        <li>超1.8亿次安装载榜首竟是...</li>
        <li>超1.8亿次安装载榜首竟是...</li>
        <li>超1.8亿次安装载榜首竟是...</li>
        <li>超1.8亿次安装载榜首竟是...</li>
        <li>超1.8亿次安装载榜首竟是...</li>
      </ul>
    </div>
  )
}
