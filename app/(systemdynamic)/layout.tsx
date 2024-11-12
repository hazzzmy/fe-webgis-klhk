'use client'

import React, { useEffect } from 'react';
import { MainAppResizableLayout } from '@/modules/main-app/layout/MainAppResizableLayout';
import { SystemDynamicLayout } from '@/modules/systemdynamic/layout/SystemDynamicLayout/SystemDynamicLayout';
import { useMainAppControl } from '@/modules/main-app/hooks';
import { usePathname } from 'next/navigation';

const Layout: React.FC<{ children?: React.ReactNode }> = (props) => {
  const mainAppControl = useMainAppControl();
  const pathname = usePathname();
  
	return (
    <MainAppResizableLayout pathname={pathname}>
      <SystemDynamicLayout>
        {props.children}
      </SystemDynamicLayout>   
    </MainAppResizableLayout>
	);
};

export default Layout;