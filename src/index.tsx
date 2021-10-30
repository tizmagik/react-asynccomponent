import React, { useEffect, useState } from 'react';
import type { ComponentType } from 'react';

export type AsyncComponentOptions = {
  onError?: (e: Error) => void;
  onLoad?: (C: ComponentType) => void;
  Loading?: ComponentType;
};

type DynamicImport = () => Promise<{
  default: ComponentType;
}>;

export const asyncComponent = (
  dynamicImport: DynamicImport,
  options: AsyncComponentOptions = {}
) => {
  const [LoadedComponent, setLoadedComponent] = useState<ComponentType>();

  return function AsyncComponent(props = {}) {
    useEffect(() => {
      let mounted = true;

      dynamicImport()
        .then(({ default: Component }) => {
          if (mounted) {
            options.onLoad?.(Component);
            setLoadedComponent(Component);
          }
        })
        .catch((e: Error) => {
          if (mounted) {
            options.onError?.(e);
          }
        });

      return () => {
        mounted = false;
      };
    }, []);

    if (LoadedComponent) return <LoadedComponent {...props} />;

    if (options.Loading) return <options.Loading />;

    return null;
  };
};

export default asyncComponent;
