import Layout from '@components/Layout';
import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

type IPages = Record<string, React.LazyExoticComponent<() => JSX.Element>>;
type ILazyImport = Promise<{
  default: () => JSX.Element;
}>;

/**
 * Add new page here
 * then you can use it with <Pages.YourPage />
 */
const pages = ['Main', 'Root'];

const Pages = pages.reduce<IPages>((P: IPages, p) => {
  P[p] = lazy(async () => import(`@pages/${p}/index.ts`) as ILazyImport);
  return P;
}, {});

/**
 * Please add your `page name` to the `pages` list
 *
 * Then you can use `YourPage` component with `<Pages.YourPage />`
 * @returns
 */
function RoutesContainer() {
  return (
    <Layout>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route
            path='/:type'
            element={<Pages.Main />}
          />
          <Route
            path='/'
            element={<Pages.Root />}
          />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default RoutesContainer;
