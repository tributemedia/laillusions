import { PATH_PAGE } from '@/routes/paths'


export default function ThankYou() {
  return (
    <>
      <main className="flex min-h-fullVH colorPurple items-center justify-center bg-white px-2 py-2 ">
        <div className="text-center">
          <h2 className="text-base text-5xl font-semibold">Thank you for your order</h2>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Thank You</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Thank you for your order, a ticket will be sent to your email after confirmation of payment</p>
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
