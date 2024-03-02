import { PATH_PAGE } from '@/routes/paths'

import dynamic from "next/dynamic";

const MetaTags = dynamic(() => import('@/components/MetaTags'));


export default function Example() {
  return (
    <>
      <MetaTags />
      <main className="flex min-h-fullVH colorPurple items-center justify-center bg-white px-2 py-2 ">
        <div className="text-center">
          <h2 className="text-base text-5xl font-semibold">404</h2>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href={PATH_PAGE.landing}
              className="buttonPurple"
            >
              Go back home
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
