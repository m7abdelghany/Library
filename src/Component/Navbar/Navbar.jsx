import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../Redux/CounterSlice';
import { useEffect, useState } from 'react';

export default function Example() {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  let { dataUser } = useSelector((state) => state.dataUser);
  console.log(dataUser);
  useEffect(() => {
    dispatch(getData());
  }, []);
  function removeToken() {
    localStorage.removeItem("token");
    navigate("login");
    location.reload();
  }
  const navigation = [
    { name: 'Books', href: 'books', current: false },
    { name: 'Authors', href: 'authors', current: false },
    {
      name: 'Category',
      href: '#',
      current: false,
      subMenuItems: [
        { name: 'Political science', href: 'سياسة', current: false },
        { name: 'Marketing and business management', href: 'تسويق وادارة اعمال', current: false },
        { name:  'Philosophy of logic', href: 'فلسفة ومنطق', current: false },
        { name: 'Religions and beliefs', href: 'اديان ومعتقدات', current: false },
        { name: 'psychology', href: 'علم نفس', current: false },
  
      ],
    },
  ];
  let Registerion = [
    { name: 'Login', href: 'login', current: false },
    { name: 'Register', href: 'Register', current: false },
    // { name: 'Calendar', href: '#', current: false },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  return (

    <Disclosure as="nav" className="bg-blue-200	h-15">
      {({ open }) => (
        <>

          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-blue-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center lg:justify-center sm:items-stretch sm:justify-end">
              <div className="flex flex-shrink-0 items-center text-xl text-blue-800 rounded-md px-3 py-2 font-serif font-medium  ">
  <div className="flex h-8  w-auto justify-start lg:hidden">Me<span className='font-mono'>do</span></div>
  <div className="hidden h-8 w-auto lg:block ">Me<span className='font-mono'>do</span></div>
</div>
<div className="hidden sm:ml-6 sm:block  flex-grow mx-auto">
  <div className="flex space-x-4 justify-center">
            {navigation.map((item) => {
              if (item.subMenuItems) {
                return (
                  <Menu key={item.name}>
                    {({ open }) => (
                      <div className="relative z-10">
                        <Menu.Button
                          className={classNames(
                            open ? 'text-blue-300 flex' : 'text-gray-600 hover:bg-blue-300 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium flex items-center'
                          )}
                        >
                          {item.name}
                          <svg
                            className={classNames(
                              open ? '-mr-1 mt-1 transform rotate-180' : 'ml-1 mt-1',
                              'h-5 w-5 transition duration-150 ease-in-out'
                            )}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d={
                                open
                                  ? 'M6 8l4 4 4-4'
                                  : 'M10 12.5L4.5 7H15l-5.5 5.5z'
                              }
                            />
                          </svg>
                        </Menu.Button>

                        <Transition
                          show={open}
                          enter="transition duration-100 ease-out"
                          enterFrom="transform scale-95 opacity-0"
                          enterTo="transform scale-100 opacity-100"
                          leave="transition duration-75 ease-out"
                          leaveFrom="transform scale-100 opacity-100"
                          leaveTo="transform scale-95 opacity-0"
                        >
                          <Menu.Items
                            static
                            className="absolute right-0 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            <div className="px-1 py-1">
                              {item.subMenuItems.map((subItem) => (
                                <Menu.Item key={subItem.name}>
                                  {({ active }) => (
                                    <Link
                                to={`/category/${subItem.href}`}

                                      className={classNames(
                                        active ? 'bg-blue-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                      )}
                                    >
                                      {subItem.name}
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                            </div>
                          </Menu.Items>
                        </Transition>
                      </div>
                    )}
                  </Menu>
                );
              } else {
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current ? 'bg-blue-300 text-white flex' : 'text-gray-600 hover:bg-blue-300 hover:text-white flex',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                );
              }
            })}
          </div>
                </div>
              </div>
             
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
             
                {dataUser?
                <>
<div className="flex items-center space-x-4">

                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={dataUser.img}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to='profile'
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link to='login'
                          onClick={removeToken}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>

                    <div className="font-medium dark:text-white">
        <div>{dataUser.username}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{dataUser.email}</div>
    </div>
</div>


              </>
                :<div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {Registerion.map((itemLogin) => (
                      <Link
                        key={itemLogin.name}
                        to={itemLogin.href}
                        className={classNames(
                          itemLogin.current ? 'bg-blue-300 text-white' : 'text-gray-600 hover:bg-blue-300 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={itemLogin.current ? 'page' : undefined}
                      >
                        {itemLogin.name}
                      </Link>
                    ))}
                  </div>
                </div>}
  







              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
