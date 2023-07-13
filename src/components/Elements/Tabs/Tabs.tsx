import { useState } from 'react';
import { Tab } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface Service {
  name: string;
  description: string;
  url: string;
}

interface TabsProps {
  data: Service[];
}

export default function Tabs({ data }: TabsProps) {
  return (
    <div className='w-full h-full px-2 py-16 sm:px-0'>
      <Tab.Group>
        <Tab.List className='flex space-x-1 rounded-xl bg-blue-900/20 p-1'>
          {data.map((dat) => (
            <Tab
              key={dat.name}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-semibold leading-5 text-white',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-blue-900 shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {dat.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className='w-full h-full mt-5'>
          {data.map((dat, idx) => (
            <Tab.Panel
              unmount={false}
              key={dat.name}
              className='w-full h-full pb-[5rem] px-[2rem] overflow-hidden bg-white'
            >
              {/* Iframes */}
              <iframe
                className='w-full h-full overflow-hidden text-white'
                scrolling='no'
                src={dat.url}
                title={dat.name}
              />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
