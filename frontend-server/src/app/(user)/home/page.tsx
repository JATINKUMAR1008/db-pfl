"use client";
import Button from "@/components/button";
import ProjectHealth from "@/components/home/projectHealth";
import RecentProjects from "@/components/home/recentProjects";
import { useAuth } from "@/providers/auth-provider";

import Image from "next/image";
export default function Home() {
  const { user } = useAuth();
  return (
    <div className="w-full h-full text-black px-10 flex justify-center pt-10">
      <div className="max-w-[1200px] w-full flex flex-col gap-10">
        <div className=" mt-5 border border-gray-200 rounded-md w-full gap-2 flex items-center justify-between">
          <div className="px-5 py-2 w-[80%]">
            <h3 className="text-xl font-semibold">Welcome, {user.name}</h3>
            <p className="text-md mt-3 text-gray-600">
              The QD. Console homepage shows the status of your projects, the QD
              platform, and product updates all in one place. Think something is
              missing or could be improved? We{"'"}d love to hear about your
              experience!
            </p>
            <Button type="button" className="mt-3 bg-transparent text-blue-950">
              Give FeedBack
            </Button>
          </div>
          <Image
            className="object-cover"
            alt="home"
            width={200}
            height={100}
            src="data:image/svg+xml,%3csvg width='204' height='185' viewBox='0 0 204 185' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cg clip-path='url(%23clip0_2362_98489)'%3e %3cpath opacity='0.28' d='M90.3558 69.039L67.0126 75.2714C55.6493 78.3108 49.9676 79.825 46.2129 83.1826C42.9206 86.1452 40.6414 90.0624 39.7164 94.3855C38.6704 99.3012 40.1899 104.963 43.2399 116.298L45.4201 124.384C47.1048 130.672 47.9526 133.81 49.6483 136.015C51.9056 138.956 55.2529 140.876 58.9306 141.359C61.6943 141.721 64.8434 140.876 71.1527 139.197L78.8604 167.846C79.2788 169.416 79.488 170.195 79.7303 170.831C82.0866 177.063 88.528 180.772 95.1236 179.686C95.8063 179.576 96.588 179.368 98.1626 178.94C99.7372 178.512 100.519 178.314 101.158 178.073C107.412 175.725 111.134 169.306 110.043 162.733C109.933 162.053 109.724 161.274 109.295 159.705L101.587 131.056L106.663 129.706C118.61 126.513 134.95 128.993 147.877 132.109C155.42 133.93 159.185 134.83 161.266 133.996C163.193 133.217 164.471 131.922 165.197 129.98C165.99 127.885 165.043 124.362 163.149 117.318L145.477 51.6037C143.583 44.5594 142.636 41.0482 140.896 39.6217C139.289 38.305 137.538 37.8113 135.468 38.1075C133.244 38.4148 130.436 41.0811 124.82 46.4137C115.186 55.5538 102.292 65.8351 90.3338 69.0281L90.3558 69.039Z' fill='%23B9C5EF'/%3e %3cpath d='M178.708 50.287L185.964 77.2574M94.6942 54.665L71.351 60.8974C59.9877 63.9368 54.306 65.451 50.5513 68.8086C47.259 71.7712 44.9797 75.6883 44.0548 80.0115C43.0088 84.9272 44.5283 90.589 47.5783 101.924L49.7585 110.01C51.4432 116.298 52.291 119.436 53.9867 121.641C56.2439 124.582 59.5913 126.502 63.2689 126.985C66.0327 127.347 69.1818 126.502 75.4911 124.823L83.1988 153.472C83.6172 155.042 83.8264 155.821 84.0686 156.457C86.425 162.689 92.8664 166.398 99.462 165.312C100.145 165.202 100.926 164.994 102.501 164.566C104.076 164.138 104.857 163.94 105.496 163.699C111.75 161.351 115.472 154.932 114.382 148.359C114.272 147.679 114.062 146.9 113.633 145.331L105.925 116.682L111.001 115.332C122.948 112.139 139.289 114.619 152.215 117.735C159.758 119.556 163.524 120.456 165.605 119.622C167.532 118.843 168.809 117.548 169.536 115.606C170.328 113.511 169.382 109.988 167.488 102.944L149.815 37.2297C147.921 30.1853 146.974 26.6741 145.234 25.2477C143.627 23.931 141.876 23.4372 139.806 23.7335C137.582 24.0407 134.774 26.707 129.159 32.0397C119.524 41.1798 106.63 51.461 94.6722 54.654L94.6942 54.665Z' stroke='%23B9C5EF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3e %3cpath opacity='0.28' d='M172.718 61.6108L179.963 88.5703' stroke='%23B9C5EF' stroke-width='5.24' stroke-linecap='round' stroke-linejoin='round'/%3e %3cpath opacity='0.3' d='M10.6366 100.673C16.5164 100.673 21.2732 95.9329 21.2732 90.0736C21.2732 84.2142 16.5054 79.4741 10.6366 79.4741C4.76774 79.4741 0 84.2252 0 90.0845C0 95.9439 4.76774 100.684 10.6366 100.684V100.673Z' fill='%23B9C5EF'/%3e %3cpath opacity='0.42' d='M202.965 190C188.166 177.524 180.161 158.893 180.161 138.067C180.161 117.241 188.97 99.7949 202.965 87.3521' fill='%23B9C5EF'/%3e %3cpath opacity='0.28' d='M203.527 3.60985C200.785 1.88717 197.537 0.888672 194.046 0.888672C184.235 0.888672 176.274 8.79985 176.274 18.5544C176.274 28.309 184.235 36.2202 194.046 36.2202C197.305 36.2202 200.355 35.3533 202.976 33.8281' stroke='%23B9C5EF' stroke-width='1.62' stroke-miterlimit='10'/%3e %3c/g%3e %3cdefs%3e %3cclipPath id='clip0_2362_98489'%3e %3crect width='204' height='190' fill='white'/%3e %3c/clipPath%3e %3c/defs%3e %3c/svg%3e"
          />
        </div>
        <RecentProjects />
        <ProjectHealth />
      </div>
    </div>
  );
}
