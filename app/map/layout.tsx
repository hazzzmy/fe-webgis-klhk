'use client'

import React, { useEffect } from 'react';
import { MainAppLayout } from '@/modules/main-app/layout/MainAppLayout';
import { Earth, EarthIcon, LayersIcon, Settings2Icon, SlidersHorizontal } from 'lucide-react';
import { MapLayout } from '@/modules/map/layout/MapLayout';
import { MainAppResizableLayout } from '@/modules/main-app/layout/MainAppResizableLayout';
import { useMainAppControl } from '@/modules/main-app/hooks';
import { usePathname } from 'next/navigation';

const Layout: React.FC<{ children?: React.ReactNode }> = (props) => {

  const pathname = usePathname();

  return (
    <MainAppLayout
      navItems={[
        {
          path: "/",
          title: "System Dynamic",
          icon: SlidersHorizontal,
        },
        {
          path: "/map",
          title: "Map",
          icon: EarthIcon,
        },
      ]}
    >
       <MainAppResizableLayout pathname={pathname}>
      <MapLayout>
        {props.children}
      </MapLayout>
    </MainAppResizableLayout>
    </MainAppLayout>
  );
};

export default Layout;