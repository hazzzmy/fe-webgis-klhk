'use client'

import React, { useEffect } from 'react';
import { MainAppResizableLayout } from '@/modules/main-app/layout/MainAppResizableLayout';
import { SystemDynamicLayout } from '@/modules/systemdynamic/layout/SystemDynamicLayout/SystemDynamicLayout';
import { useMainAppControl } from '@/modules/main-app/hooks';
import { usePathname } from 'next/navigation';
import { MainAppLayout } from '@/modules/main-app/layout/MainAppLayout';
import { EarthIcon, SlidersHorizontal } from 'lucide-react';

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
        <SystemDynamicLayout>
          {props.children}
        </SystemDynamicLayout>
      </MainAppResizableLayout>
    </MainAppLayout>
  );
};

export default Layout;