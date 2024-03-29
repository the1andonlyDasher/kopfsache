import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { useFetcher } from '@remix-run/react';
import { useAtom } from 'jotai';
import { model } from './atoms';

interface gridProps{
  url:any;
  collection: any;
}
export default function ProductGrid({collection, url}:gridProps) {
  const [nextPage, setNextPage] = useState(
    collection.products.pageInfo.hasNextPage,
  );
  const [endCursor, setEndCursor] = useState(
    collection.products.pageInfo.endCursor,
  );
  const [products, setProducts] = useState(collection.products.nodes || []);
  // For making client-side requests
  // https://remix.run/docs/en/v1/hooks/use-fetcher
  const fetcher:any = useFetcher();
  function fetchMoreProducts() {
    // ?index differentiates index routes from their parent layout routes
    // https://remix.run/docs/en/v1/guides/routing#what-is-the-index-query-param
    fetcher.load(`${url}?index&cursor=${endCursor}`);
  }


  useEffect(() => {
    if (!fetcher.data) return;
    const {collection} = fetcher.data;
    setProducts((prev:any) => [...prev, ...collection.products.nodes]);
    setNextPage(collection.products.pageInfo.hasNextPage);
    setEndCursor(collection.products.pageInfo.endCursor);
  }, [fetcher.data]);

  
  return (
<>
      <div className="grid-flow-row grid gap-6 gap-y-6 w-full" style={{gridTemplateColumns:`repeat(auto-fit, minmax(min(250px, 100%), 1fr))`}}>  {/*  md:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 */}
       {products.map((product:any, index: number) => (
          <ProductCard key={product.id + index} product={product} />
        ))} 
      </div>
      {nextPage && (
        <div className="flex items-center justify-center mt-6">
          <button
            className="inline-block rounded font-medium text-center py-3 px-6 border w-full cursor-pointer"
            disabled={fetcher.state !== 'idle'}
            onClick={fetchMoreProducts}
          >
            {fetcher.state !== 'idle' ? 'Laden...' : 'Lade mehr Produkte'}
          </button>
        </div>
      )}
      </>
  );
}
