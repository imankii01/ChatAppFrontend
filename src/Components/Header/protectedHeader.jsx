import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";

import { Avatar } from "antd";
import headerLogo from "./Screenshot_5.png";
import { logoutUser } from "../../redux/actions/common";
import { reactUserType } from "../Auth/tokenProvider";

const PublicNavigation = [
  {
    title: "Chat",
    icon: "briefcase16",
    href: "/dashboard/chat",
    current: true,
  },
 
];

const userNavigation = [
  { name: "Your Profile", href: "/dashboard/profile" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProtecTedHeader({ type }) {
  const [active, setactive] = useState(0);
  const [navigation, setNavigation] = useState(PublicNavigation);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const getUserDetailReducer = useSelector(
    (state) => state.getUserDetailReducer
  );

  useEffect(() => {
    const { loading, status, error, data } = getUserDetailReducer;
    setLoading(loading);
    if (!loading && data && !error) {
      setData(data);
    }
    if (!loading && !data && error) {
      console.warn("error", error);
    }
  }, [getUserDetailReducer]);
  useEffect(() => {
    const currentPath = location.pathname;
    const activeIndex = navigation.findIndex(
      (item) => item.href === currentPath
    );
    setactive(activeIndex !== -1 ? activeIndex : 0); // Set active index based on current route
  }, [location.pathname]); // Trigger effect when location.pathname changes

  const navigateFunc = (item, index) => {
    setactive(index);
    navigate(`${item?.href}`);
  };
  const dispatch = useDispatch();
  const handleLogOut = () => {
    window.location.assign("/");

    localStorage.clear();
    dispatch(logoutUser(""));
  };
  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      style={{ cursor: "pointer" }}
                      className="h-8 w-full"
                      src={headerLogo}
                      alt="Your Company"
                      onClick={() => navigate("/")}
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation && navigation.length > 0
                        ? navigation.map((item, index) => (
                            <a
                              onClick={() => navigateFunc(item, index)}
                              key={index}
                              style={{ borderRadius: "18px" }}
                              className={`rounded-md px-3 py-2 text-sm font-medium ${
                                index === active
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
                              }`}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.title}
                            </a>
                          ))
                        : null}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          {data?.photo && data?.photo !== "" ? (
                            <Avatar
                              size={{
                                xl: 54,
                                lg: 64,
                              }}
                              src={`${process.env.REACT_APP_IMAGES_BASE_URL}${data?.photo}`}
                            />
                          ) : (
                            <Avatar
                              size={{
                                xl: 54,
                                lg: 64,
                              }}
                              icon={<UserOutlined />}
                            />
                          )}
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-black-700"
                                  )}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    if (item.name === "Sign out") {
                                      handleLogOut();
                                    } else {
                                      navigate(item.href);
                                    }
                                  }}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                {navigation && navigation.length > 0
                  ? navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        style={{ borderRadius: "18px" }}
                        onClick={() => navigate(item.href)}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))
                  : null}
              </div>
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    {data?.photo && data?.photo !== "" ? (
                      <Avatar
                        size={{
                          xs: 24,
                          sm: 32,
                          md: 40,
                          lg: 64,
                          xl: 70,
                        }}
                        src={`${process.env.REACT_APP_IMAGES_BASE_URL}${data?.photo}`}
                      />
                    ) : (
                      <Avatar
                        size={{
                          xs: 24,
                          sm: 32,
                          md: 40,
                          lg: 64,
                          xl: 70,
                        }}
                        icon={<UserOutlined />}
                      />
                    )}
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {`${data?.first_name} ${data?.last_name}`}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {data?.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {navigation && navigation.length > 0
                    ? navigation.map((item) => (
                        <Disclosure.Button
                          key={item.title}
                          as="a"
                          style={{ borderRadius: "18px" }}
                          onClick={() => navigate(item.href)}
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          {item.title}
                        </Disclosure.Button>
                      ))
                    : null}
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      onClick={(e) => {
                        e.preventDefault();
                        if (item.name === "Sign out") {
                          handleLogOut();
                        } else {
                          navigate(item.href);
                        }
                      }}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
