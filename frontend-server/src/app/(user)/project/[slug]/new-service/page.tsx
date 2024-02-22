"use client";
import CreateNewTypeService from "@/components/services/create-service";
import { useSearchParams } from "next/navigation";
interface Iprops {
  params: {
    slug: string;
  };
}
export default function NewServicePage({ params }: Iprops) {
  const searchParams = useSearchParams();
  const serviceType = searchParams.get("serviceType") || "";
  return (
    <div className="text-black mt-5">
      <CreateNewTypeService
        serviceType={serviceType}
        projectId={Number(params.slug)}
      />
    </div>
  );
}
