import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { useEffect } from "react";
 
function NavList() {
  const items = [
    {
      label:"Deudas",
      path:"deudas"
    },
    {
      label: "Recibos",
      path:"recibos"
    },
    {
      label:"Asistencia",
      path:"asistencia"
    },
    {
      label: "Vecinos",
      path:"vecinos"
    },
  ]
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {
        items.map((el, index)=>(
          <Typography
            key={index}
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium"
          >
            <a  href={el.path} className="flex items-center hover:text-blue-500 transition-colors">
              {el.label}
            </a>
          </Typography>
        ))
      }
    </ul>
  );
}
 
export function NavbarApp() {
  const [openNav, setOpenNav] = React.useState(false);
 
  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);
 
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
 
  return (
    <Navbar 
    // className="mx-auto max-w-screen-xl px-6 py-3"

    >
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h4"
          className="mr-4 cursor-pointer py-1.5"
        >
          OTB - Miraflores
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}