"use client";
import { MdKeyboardArrowDown } from "react-icons/md";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useAuth } from "@/providers/auth-provider";
import { IoCheckmarkOutline } from "react-icons/io5";
import Input from "../commons/input";
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
