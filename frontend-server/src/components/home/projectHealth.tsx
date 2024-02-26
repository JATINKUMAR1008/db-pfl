"use client";
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useAuth } from "@/providers/auth-provider";
import { IoCheckmarkOutline } from "react-icons/io5";
import Input from "../commons/input";
import Image from "next/image";
export default function ProjectHealth() {
  const [showProjectDropDown, setShowProjectDropDown] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number>(0);
  const dropdownRef = useRef(null);
  const { projects } = useAuth();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setShowProjectDropDown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);
  return (
    <div className="flex flex-col w-full h-full">
      <h3 className="text-xl font-semibold text-gray-500">Project health</h3>
      <div className="mt-3 w-full h-full relative" ref={dropdownRef}>
        <div
          className="w-[300px] border border-gray-300 h-full py-2 px-3 flex flex-row cursor-pointer items-center  justify-between bg-gray-100"
          onClick={() => setShowProjectDropDown(!showProjectDropDown)}
        >
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-gray-600">
              {projects ? projects[selectedProject]?.name : "No projects found"}
            </h3>
            <p className="text-xs text-gray-400">
              {projects?.length !== 0
                ? "No services require your attention"
                : "No projects found"}
            </p>
          </div>
          <span className="relative">
            <MdKeyboardArrowDown
              size={30}
              className={
                showProjectDropDown
                  ? "text-gray-500 rotate-180 duration-100 ease-in cursor-pointer"
                  : "text-gray-500 rotate-0 duration-100 ease-in cursor-pointer"
              }
            />
          </span>
        </div>
        {showProjectDropDown && (
          <ProjectSearchDropdown
            setSelectedProject={(e) => setSelectedProject(e)}
            selectedProject={selectedProject}
            projects={projects}
            setShowProjectDropDown={setShowProjectDropDown}
          />
        )}
      </div>
      <ShowProjectHealth />
    </div>
  );
}
interface IProjectData {
  name: string;
  id: number;
  created_at: string;
  services: {
    name: string;
    nodes: number;
    plan: string;
    cloud: string;
    createdAt: string;
  }[];
}
const ProjectSearchDropdown = ({
  selectedProject,
  setSelectedProject,
  projects,
  setShowProjectDropDown,
}: {
  selectedProject: number;
  setSelectedProject: React.Dispatch<React.SetStateAction<number>>;
  projects: IProjectData[];
  setShowProjectDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    // Filter projects based on input value
    const filtered = projects.filter((pro) =>
      pro.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProjects(filtered);
  };
  return (
    <div className="absolute w-[300px] h-fit border shadow-lg -right-3 mt-1 bg-white z-10 left-0 py-2 px-2">
      <div
        className="w-full border border-gray-300 flex flex-row items-center gap-3 px-3 py-2 focus:border-blue-700"
        autoFocus
      >
        <HiMiniMagnifyingGlass size={20} className="text-gray-500" />
        <input
          type="text"
          className="w-full h-full outline-none "
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <div className="w-full flex flex-col mt-4 px-2">
        {filteredProjects?.length === 0 ? (
          <div className="text-gray-400 capitalize">No projects found</div>
        ) : (
          filteredProjects?.map((pro, index) => (
            <div
              className="text-md flex flex-row p-2 justify-between items-center cursor-pointer text-gray-600 hover:bg-gray-100 duration-75 ease-in-out"
              key={pro.id}
              onClick={() => {
                setSelectedProject(index);
                setShowProjectDropDown(false);
              }}
            >
              <span>{pro.name}</span>
              {selectedProject === index && (
                <IoCheckmarkOutline size={15} className="" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const ShowProjectHealth = () => {
  return (
    <div className="w-full border-dotted border-gray-100 px-4 y-2">
      <div className="flex flex-row">
        <Image
          src="data:image/svg+xml,%3csvg width='140' height='140' viewBox='0 0 140 140' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cg id='Illustration' clip-path='url(%23clip0_6506_163990)'%3e %3crect width='140' height='140' fill='white'/%3e %3cpath id='Vector' opacity='0.24' d='M100.563 140.102C122.344 140.102 140 122.445 140 100.665C140 78.8849 122.344 61.2285 100.563 61.2285C78.7832 61.2285 61.1268 78.8849 61.1268 100.665C61.1268 122.445 78.7832 140.102 100.563 140.102Z' fill='%23FF5200' fill-opacity='0.16'/%3e %3cpath id='Vector_2' d='M42.2858 0H85.1136V42.8279C85.1136 66.166 66.166 85.1136 42.8279 85.1136H0V42.2858C0 18.9476 18.9476 0 42.2858 0Z' fill='%23FF5200' fill-opacity='0.16'/%3e %3cpath id='Icon' d='M120 65.4286V70.0286C119.994 80.8107 116.502 91.302 110.047 99.9377C103.591 108.573 94.5164 114.891 84.1768 117.948C73.8371 121.005 62.7863 120.638 52.6723 116.902C42.5584 113.165 33.9233 106.259 28.0548 97.2139C22.1863 88.1688 19.399 77.4689 20.1084 66.7102C20.8178 55.9514 24.986 45.7102 31.9914 37.514C38.9968 29.3177 48.4639 23.6055 58.9809 21.2293C69.498 18.8532 80.5013 19.9403 90.35 24.3286M120 30L70 80.05L55 65.05' stroke='%23FF5200' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3e %3c/g%3e %3cdefs%3e %3cclipPath id='clip0_6506_163990'%3e %3crect width='140' height='140' fill='white'/%3e %3c/clipPath%3e %3c/defs%3e %3c/svg%3e"
          alt="image"
          width={60}
          height={60}
        />
        <div className="flex flex-col items-start gap-3">
          <h1 className="text-xl font-bold text-gray-800">
            Everything is looking good.
          </h1>
          <p className="text-xs text-gray-700">
            There are no alerts or notifications for the services in this
            project. To check the status of services in another project, select
            the project name.
          </p>
        </div>
      </div>
    </div>
  );
};
