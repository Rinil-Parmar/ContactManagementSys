import React from "react";
import { Link, Outlet } from "react-router-dom";
import { BsPersonPlus } from "react-icons/bs";
import { TbPhone } from "react-icons/tb";
import { VscSignOut } from "react-icons/vsc";

import Row from "react-bootstrap/Row";
// FiUserPlus
export const Sidebar = () => {
  return (
    <div className="grid grid-cols-6 gap-4 min-h-screen">
      <div className="col-start-1 col-end-2 bg-regal-blue h-full">
        <Link className="no-underline" to="../addcontact">
          <div className="mt-20 align-items-center text-white text-center text-3xl rounded-3xl px-3 py-2   hover:bg-gray-400">
            <Row className="justify-content-center">
              <BsPersonPlus />
              Create Contact
            </Row>
          </div>
        </Link>
        <hr />
        <Link className="no-underline" to="../contacts">
          <div className="mt-20 text-white text-center text-3xl rounded-3xl px-3 py-2 hover:bg-gray-400">
            <Row className="justify-content-center">
              <TbPhone/>
               Contacts
            </Row>
          </div>
        </Link>
        <Link className="no-underline" to="../signin">
          <div className="mt-20 text-white text-center text-3xl rounded-3xl px-3 py-2   hover:bg-gray-400">
          <Row className="justify-content-center">
              <VscSignOut/>
               Sign Out
            </Row>
          </div>
        </Link>
      </div>
      <div className="col-end-6 col-span-4">
        <Outlet />
      </div>
    </div>
  );
};
