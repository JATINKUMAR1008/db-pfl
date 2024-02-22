"use client";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const Breadcrumbs = () => {
  const path = usePathname();
  const paths = path.split("/").filter((p) => p);

  return (
    <nav>
      <ol className="flex flex-row gap-1 items-center p-2">
        {paths.map((path, i) => {
          const breadcrumb = paths.slice(0, i + 1);
          const url = `/${breadcrumb.join("/")}`;

          return (
            <li key={url} className="text-blue-500 ">
              <Link href={url} className="bg-tarnsparent capitalize text-sm">
                {path}
              </Link>
              <span className="text-gray-300 ml-1">/</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
