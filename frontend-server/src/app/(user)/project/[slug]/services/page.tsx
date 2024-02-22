"use client";
import Button from "@/components/button";
import Breadcrumbs from "@/components/commons/breadcrum";
import CreateNewTypeService from "@/components/services/create-service";
import CreateNewServices from "@/components/services/new-services";
import ServiceTable from "@/components/services/service-table";
import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface IProps {
  params: {
    slug: string;
  };
}
export default function ServicePage({ params }: IProps) {
  const { projects } = useAuth();
  const [open, setOpen] = useState(false);
  const services = projects?.find(
    (project) => project.id === Number(params.slug)
  )?.services;
  return services?.length === 0 ? (
    <div className="text-black max-w-[1200px] m-auto mt-10">
      <Breadcrumbs />
      <CreateNewServices />
    </div>
  ) : (
    services && (
      <div className="max-w-[1500px] m-auto mt-5">
        <Breadcrumbs />
        <div className="mt-2 text-black px-2">
          <div className="flex flex-row justify-between ">
            <h1 className="text-2xl font-extrabold mb-5">Services</h1>
            {!open && (
              <Button
                type="button"
                className="py-2 px-3 rounded-sm"
                onClick={() => setOpen(!open)}
              >
                Create service
              </Button>
            )}
          </div>
          {open ? (
            <CreateNewServices />
          ) : (
            <ServiceTable services={services} projectId={params.slug} />
          )}
        </div>
      </div>
    )
  );
}
