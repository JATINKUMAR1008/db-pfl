"use client";
import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdFolderOpen } from "react-icons/md";
import { useQuery } from "react-query";

interface IProjectData {
  name: string;
  id: number;
  created_at: string;
  services: [];
}

export default function RecentProjects() {
  const { projects } = useAuth();
  const router = useRouter();
  return (
    <div className="flex flex-col mt-2">
      <div className="flex flex-row items-center justify-between">
        <h4 className="capitalize text-xl font-semibold text-gray-500">
          recent projects
        </h4>
        <p className="text-sm text-blue-950 flex items-center gap-2 hover:underline cursor-pointer">
          view all projects{" "}
          <span>
            <IoIosArrowRoundForward className="inline-block" size={20} />
          </span>
        </p>
      </div>
      <div className="flex flex-wrap w-full h-full gap-3 mt-5">
        {projects?.length === 0 ? (
          <div className="text-gray-500 text-center w-full">
            No projects found
          </div>
        ) : (
          projects?.map((project) => (
            <div
              key={project.id}
              className="border border-gray-200 hover:border-gray-400 cursor-pointer py-3 px-4 flex items-center gap-4 w-[250px]"
              onClick={() => router.push(`/project/${project.id}/services`)}
            >
              <MdFolderOpen size={40} className="text-gray-700" />
              <div className="flex flex-col">
                <p className="text-md capitalize font-semibold text-gray-700 max-w-[100%] overflow-hidden text-ellipsis">
                  {project.name}
                </p>
                <p className="text-xs text-gray-600">
                  {project.services.length} services
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
