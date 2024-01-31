import React from "react";
import {
  IoMdAdd,
  IoMdDoneAll,
  IoMdEye,
  IoMdMedkit,
  IoMdSave,
  IoMdSettings,
  IoMdShare,
} from "react-icons/io";
import { useEffect, useState } from "react";
const FieldTicket = () => {
  const [ticketData, setTicketData] = useState([]);
  useEffect(() => {
    fetch("/api/field/all")
      .then((response) => response.json())
      .then((data) => setTicketData(data))
      .catch((error) => console.error("Error fetching ticket data:", error));
  }, []);
  const [scnquery, setSCNQuery] = useState("");
  return (
    <div>
      <div class="relative mt-9 overflow-x-auto shadow-lg sm:rounded-lg">
        <div className="ml-2 flex flex-wrap items-center space-x-5">
          <a href="/admin/add/field">
            <button className="    flex text-gray-900 dark:text-gray-300 dark:text-gray-600">
              <IoMdAdd className="h-6 w-6" />
              Add
            </button>
          </a>
          <button className=" flex    text-gray-900 dark:text-gray-300  dark:text-gray-600">
            <IoMdEye className="h-6 w-6" />
            View
          </button>
          <button className=" flex    text-gray-900 dark:text-gray-300  dark:text-gray-600">
            <IoMdSettings className="h-6 w-6" />
            Edit
          </button>
          <button className=" flex    text-gray-900 dark:text-gray-300  dark:text-gray-600">
            <IoMdDoneAll className="h-6 w-6" />
            Solved
          </button>
        </div>
        <br />
        <div className="ml-4 flex flex-wrap items-center space-x-5">
          <label
            htmlFor="search"
            className=" text-gray-700    dark:text-gray-300"
          >
            No Ticket:
          </label>
          <input
            type="text"
            id="search"
            className="block w-40 rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Search"
          />
          <label
            htmlFor="search"
            className=" text-gray-700    dark:text-gray-300"
          >
            Equipement S/N :{" "}
          </label>
          <input
            type="text"
            id="search"
            className="block w-40 rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Search"
          />
          <button
            type="button"
            className="ml-[-5px] inline-flex items-center  rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            <svg
              className="h-5 w-5 text-red-700    dark:text-gray-300"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Search
          </button>
        </div>
        <div class="border-b border-gray-900/10 pb-6"></div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-gray-900 rtl:text-right dark:text-gray-900  sm:table lg:table">
            <thead className="overflow-x-auto bg-gray-50 text-xs uppercase dark:bg-gray-900 ">
              <tr className="">
                <th scope="col" class="p-4">
                  <div class="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      class="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                    />
                    <label for="checkbox-all-search" class="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900   dark:text-gray-300"
                >
                  Ticket No
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900    dark:text-gray-300"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900    dark:text-gray-300"
                >
                  Equipement S/N
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900    dark:text-gray-300"
                >
                  Service Station
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900    dark:text-gray-300"
                >
                  Service type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900    dark:text-gray-300"
                >
                  Fault Level
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900    dark:text-gray-300"
                >
                  Response Time
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900    dark:text-gray-300"
                >
                  Call in Time
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900    dark:text-gray-300"
                >
                  Localisation
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900    dark:text-gray-300"
                >
                  Technicien
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900    dark:text-gray-300"
                >
                  Receiving Time
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-gray-900    dark:text-gray-300"
                >
                  Client
                </th>
              </tr>
            </thead>
            <tbody>
              {ticketData
                .filter((ticket) =>
                  Object.values(ticket)
                    .filter((value) => typeof value === "string")
                    .some((value) =>
                      value.toLowerCase().includes(scnquery.toLowerCase())
                    )
                )
                .map((ticket, index) => (
                  <tr
                    key={index}
                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          id={`checkbox-table-search-${index}`}
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                        />
                        <label
                          htmlFor={`checkbox-table-search-${index}`}
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <td
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {ticket.ticket_no}
                    </td>
                    <td className="bg-tunisys-100 px-6 py-4 text-white">
                      {ticket.status}
                    </td>
                    <td className="px-6 py-4">{ticket.equipement_sn}</td>

                    <td className="px-6 py-4">{ticket.service_station}</td>
                    <td className="px-6 py-4">{ticket.fault_type}</td>
                    <td className="px-6 py-4">{ticket.response_time}</td>

                    <td className="px-6 py-4">{ticket.client}</td>
                    <td className="px-6 py-4">{ticket.created_at}</td>

                    <td className="px-6 py-4">{ticket.completion_time}</td>
                    <td className="px-6 py-4">{ticket.technicien}</td>
                    <td className="px-6 py-4">{ticket.timestamp}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <nav
        className="flex-column flex flex-wrap items-center justify-between pt-4 md:flex-row"
        aria-label="Table navigation"
      >
        <span className="mb-4 block  w-full    text-sm font-normal text-gray-900 dark:text-gray-300 md:mb-0 md:inline md:w-auto">
          Showing{" "}
          <span class="font-semibold text-gray-900 dark:text-white">1-10</span>{" "}
          of{" "}
          <span class="font-semibold text-gray-900 dark:text-white">1000</span>
        </span>
        <ul className="inline-flex h-8 -space-x-px text-sm rtl:space-x-reverse">
          <li>
            <a
              href="#"
              className="flex h-8 items-center justify-center border border-gray-300 bg-white  px-3 leading-tight text-gray-900 ms-0 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800    dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </a>
          </li>
          <li>
            <a
              href="#"
              aria-current="page"
              className="flex h-8 items-center justify-center border border-gray-300 bg-blue-50 px-3 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex h-8 items-center justify-center border border-gray-300  bg-white px-3 leading-tight text-gray-900 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800    dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex h-8 items-center justify-center border border-gray-300  bg-white px-3 leading-tight text-gray-900 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800    dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              3
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex h-8 items-center justify-center border border-gray-300  bg-white px-3 leading-tight text-gray-900 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800    dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              4
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex h-8 items-center justify-center border border-gray-300  bg-white px-3 leading-tight text-gray-900 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800    dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              5
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex h-8 items-center justify-center border border-gray-300  bg-white px-3 leading-tight text-gray-900 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800    dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default FieldTicket;
