"use client";
import { FiUser, FiUserPlus } from "react-icons/fi";
import { IoIosHelpCircleOutline } from "react-icons/io";
import Button from "../button";
import { MdFolderOpen, MdKeyboardArrowUp } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { useEffect, useRef, useState } from "react";
import Tooltip from "../tooltip/tooltip";
import Link from "next/link";
import ModalBox from "../modal/modal";
import { MdLogout } from "react-icons/md";
import { useAuth } from "@/providers/auth-provider";
import CreateProjectForm from "./components/form";
export default function Navbar() {
  const [showProjectDropDown, setShowProjectDropDown] = useState(false);
  const [showUserAccountDropDown, setShowUserAccountDropDown] = useState(false);
  const dropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setShowProjectDropDown(false);
      }
      if (
        userDropdownRef.current &&
        !(userDropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setShowUserAccountDropDown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);
  return (
    <div className="flex flex-row justify-between items-center w-full h-16  px-5 shadow-md min-w-[1200px]">
      <div className="flex flex-row items-center gap-5 p-1 h-full">
        <div className="flex flex-row items-center h-full gap-2">
          <h1 className="text-4xl  -skew-x-12 bg-black rounded-md py-1 px-2 font-montserrat uppercase italic font-[900]">
            Qd.
          </h1>
          <span className="flex flex-col text-sm font-semibold capitalize text-black">
            <p>quick</p>
            <p>database solution</p>
          </span>
        </div>
        <hr className="h-full w-[1px] bg-gray-300" />
        <div className="flex flex-row items-center">
          <span className="flex text-sm gap-5 font-semibold capitalize text-black">
            <Link
              href="/home"
              className="p-2 hover:bg-gray-200 cursor-pointer rounded-md duration-100 ease-in-out"
            >
              home
            </Link>
            <div className="relative" ref={dropdownRef}>
              <Button
                type="button"
                className="bg-transparent text-black capitalize hover:bg-gray-200 p-2 rounded-md relative"
                onClick={() => setShowProjectDropDown(!showProjectDropDown)}
              >
                projects
                <span
                // className="relative"
                >
                  <MdKeyboardArrowUp
                    className={
                      showProjectDropDown
                        ? "inline-block ml-2 rotate-180 duration-75 ease-in"
                        : "inline-block ml-2 rotate-0 duration-75 ease-in"
                    }
                  />
                </span>
              </Button>
              {showProjectDropDown && <ProjectDropDown />}
            </div>
            <Link
              href="/about"
              className="p-2 hover:bg-gray-200 cursor-pointer rounded-md duration-100 ease-in-out"
            >
              about
            </Link>
            <Link
              href="/support"
              className="p-2 hover:bg-gray-200 cursor-pointer rounded-md duration-100 ease-in-out"
            >
              support
            </Link>
            <Link
              href="/admin"
              className="p-2 hover:bg-gray-200 cursor-pointer rounded-md duration-100 ease-in-out"
            >
              admin
            </Link>
          </span>
        </div>
      </div>
      <div className="flex flex-row h-full items-center gap-3">
        <hr className="h-full w-[1px] bg-gray-300" />
        <div className="flex flex-row items-center relative">
          <span className="p-2 hover:bg-gray-200 cursor-pointer rounded-md duration-100 ease-in-out">
            <Tooltip value="Help">
              <IoIosHelpCircleOutline size={23} className="text-gray-500" />
            </Tooltip>
          </span>
          <Tooltip value="User Information">
            <div className="relative" ref={userDropdownRef}>
              <Button
                type="button"
                className="bg-gray-100 text-black capitalize hover:bg-gray-200 p-2 ml-3 rounded-md"
                onClick={() =>
                  setShowUserAccountDropDown(!showUserAccountDropDown)
                }
              >
                <span className="relative">
                  <FiUser size={20} className="text-gray-500" />
                </span>
              </Button>
              {showUserAccountDropDown && <UserAccountDropDown />}
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

const ProjectDropDown = () => {
  const [openCreateProjectModal, setOpenCreateProjectModal] = useState(false);

  const { projects } = useAuth();

  return (
    <div className="w-[300px] h-fit bg-white shadow-lg absolute mt-2 flex flex-col items-start rounded-md outline outline-[1px] outline-gray-300">
      <div className="w-full h-26 bg-[#F3F6FF] flex flex-row items-center justify-between">
        <div className="flex flex-col w-[70%] items-start py-4 px-5">
          <h1 className="text-xl mb-1 text-gray-600 font-semibold">Projects</h1>
          <p className="text-left text-xs text-gray-400 lowercase">
            Manage your projects from here with one click.
          </p>
        </div>
        <MdFolderOpen size={70} className="text-gray-400 relative right-3" />
      </div>
      <div className="mt-2 flex flex-col w-full px-5 py-2">
        <h3 className="text-xs px-2 uppercase text-gray-400 my-2">
          Recent Projects
        </h3>
        {projects?.length === 0 ? (
          <div>No projects till now</div>
        ) : (
          projects.map((project) => (
            <div
              className=" p-2 w-full hover:bg-gray-100 text-xs text-gray-500 cursor-pointer rounded-sm duration-75 ease-in-out"
              key={project.id}
            >
              {project.name}
            </div>
          ))
        )}
      </div>
      <hr className="w-full h-[1px] bg-gray-400" />
      <div className="px-5 pb-5 mt-4 flex flex-col ">
        <Button
          type="button"
          className="bg-transparent text-blue-400 flex items-center flex-row"
        >
          <MdFolderOpen size={20} className="text-blue-400" />
          <span className="ml-2">View all projects</span>
        </Button>
        <Button
          type="button"
          className="bg-transparent text-blue-400 flex items-center flex-row"
          onClick={() => setOpenCreateProjectModal(true)}
        >
          <GoPlus size={20} />
          <span className="ml-2">Create project</span>
        </Button>
      </div>
      {openCreateProjectModal && (
        <ModalBox
          onClose={() => setOpenCreateProjectModal(false)}
          title="Create Project"
          description="create new project with your might"
        >
          <CreateProjectForm onClose={() => setOpenCreateProjectModal(false)} />
        </ModalBox>
      )}
    </div>
  );
};

const USER_MENU = [
  {
    label: "User profile",
    icon: <FiUserPlus size={15} />,
  },
  {
    label: "Invites",
    icon: <FiUserPlus size={15} />,
  },
];

const UserAccountDropDown = () => {
  const { user, logOut } = useAuth();
  return (
    <div className="w-[350px] h-fit bg-white shadow-lg absolute mt-2 right-0 flex flex-col items-start rounded-md outline outline-[1px] outline-gray-300">
      <div className="w-full h-26 bg-[#F3F6FF] flex flex-row items-center justify-between">
        <div className="flex flex-col w-[70%] items-start py-4 px-5">
          <h1 className="text-xl mb-1 text-gray-600 font-semibold">
            {user?.name}
          </h1>
          <p className="text-left  text-xs text-gray-400">
            Your personal information and settings.
          </p>
        </div>
        <FiUser size={70} className="text-gray-200" />
      </div>
      <div className="flex flex-col w-full items-center mt-2 ">
        {USER_MENU.map((item, index) => (
          <div
            key={index}
            className="flex flex-row cursor-pointer items-center text-gray-400 text-sm font-light w-[90%] gap-2 p-2 hover:bg-gray-100 duration-75 ease-in-out rounded-md"
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
        <hr className="w-full my-2 h-[1px] bg-gray-100" />
        <div
          className="mt-2 cursor-pointer text-gray-400 gap-1 text-sm font-light flex flex-row items-center w-[90%] hover:bg-gray-100 duration-75 ease-in-out p-2 mb-2 rounded-md"
          onClick={logOut}
        >
          <MdLogout size={15} className="text-gray-400" />
          <span>Log out</span>
        </div>
      </div>
    </div>
  );
};
