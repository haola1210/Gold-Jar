import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

type Pages = Record<string, React.LazyExoticComponent<() => JSX.Element>>;

/**
 * add new page here
 * then you can use it with <Pages.YourPage />
 */
const pages = ['Main', 'Root'];

const Pages = pages.reduce((P: Pages, p) => {
  P[p] = lazy(() => import(`@pages/${p}/index.ts`));
  return P;
}, {} as Pages);


/**
 * Please add your `page name` to the `pages` list
 * 
 * Then you can use `YourPage` component with `<Pages.YourPage />`
 * @returns 
 */
function RoutesContainer() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route path='/:type' element={<Pages.Main />}/>
        <Route path='/' element={<Pages.Root />}/>
      </Routes>
    </Suspense>
  );
}

export default RoutesContainer;