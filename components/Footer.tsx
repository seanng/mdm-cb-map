import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-slate-700 px-3 xl:px-[4%] mt-6">
      <div className="max-w-7xl lg:w-[92%] text-gray-400">
        <div className="block pt-12 lg:flex justify-between">
          <div className="lg:flex-auto lg:w-48">
            <h2 className="font-bold text-gray-100 mb-5">關於我們</h2>
            <p className="text-sm tracking-wider max-w-lg">
              我們是一家圍繞台灣跨境商家需求，以一站式的形式為商家提供盡可能完整的跨境電商資訊。我們希望透過整合行業資訊，來減少跨境電商資訊的不對稱，降低跨境運營的門檻，幫助台灣跨境商家順利出海！
            </p>
          </div>
          <div className="pt-10 lg:pt-0 flex space-x-8 lg:flex-1 lg:justify-between">
            <div className="flex-none">
              <h2 className="font-bold text-gray-100 mb-5">加入LINE群組</h2>
              <Image
                src="/line-group-qr-code.jpg"
                alt="LINE群組"
                height="131"
                width="131"
              />
            </div>
            <div className="flex-none">
              <h2 className="font-bold text-gray-100 mb-5">加入FB群組</h2>
              <div
                className="fb-page"
                data-href="https://www.facebook.com/profile.php?id=100089033539272"
                data-tabs="events"
                data-width=""
                data-height="180"
                data-small-header="false"
                data-adapt-container-width="true"
                data-hide-cover="false"
                data-show-facepile="true"
              >
                <blockquote
                  cite="https://www.facebook.com/profile.php?id=100089033539272"
                  className="fb-xfbml-parse-ignore"
                >
                  <a href="https://www.facebook.com/profile.php?id=100089033539272">
                    台灣跨境地圖
                  </a>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-10 pb-7 text-sm">
          <span className="block sm:inline mr-10">
            &copy; 2023 CB-Map, Inc. All rights reserved.
          </span>
          <span className="block mt-6 sm:inline sm:mt-0">
            聲明：網站上所有的鏈接均來自第三方，與台灣跨境地圖無任何關係。請各位使用者注意鑑別服務質量，避免上當受騙！
          </span>
        </div>
      </div>
    </footer>
  )
}
