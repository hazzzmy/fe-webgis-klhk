'use client'

import React, { useEffect } from 'react';
import { MainAppLayout } from '@/modules/main-app/layout/MainAppLayout';
import { Earth, LayersIcon, Settings2Icon } from 'lucide-react';
import { MapLayout } from '@/modules/map/layout/MapLayout';
import { MainAppResizableLayout } from '@/modules/main-app/layout/MainAppResizableLayout';
import { useMainAppControl } from '@/modules/main-app/hooks';
import { usePathname } from 'next/navigation';

const Layout: React.FC<{ children?: React.ReactNode }> = (props) => {

  const pathname = usePathname();


  return (
    <MainAppResizableLayout pathname={pathname}>
      <MapLayout>
        {props.children}
      </MapLayout>
    </MainAppResizableLayout>
  );
};

export default Layout;