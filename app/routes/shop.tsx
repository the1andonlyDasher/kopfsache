import { Link, useLoaderData } from '@remix-run/react';
import { LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { Image } from '@shopify/hydrogen';
import { useIsPresent } from "framer-motion"
import { useEffect, useRef, useState } from 'react';
import { model } from '../components copy/atoms';
import { useAtom } from 'jotai';
import Footer from '../components copy/Footer';
import { COLLECTIONS_QUERY } from '../queries/models';

export function meta() {
  return [
    { title: 'Hydrogen' },
    { description: 'A custom storefront powered by Hydrogen' },
  ];
}

export async function loader({ context }: LoaderFunctionArgs) {
  return await context.storefront.query(COLLECTIONS_QUERY);
}

export default function Shop() {
  const ref = useRef<any>(!null);
  const { collections }: any = useLoaderData() || {}
  const [stableData, setData] = useState(collections);
  const [m, setM] = useAtom(model)
  const prices: any = []

  useEffect(() => {
    collections && setData(collections)
    console.log(stableData)
    stableData && stableData.collection.collections.nodes.map((node: any) => {
      node.products.edges.map((edge: any, index: number) =>
        Object.values(edge).map((edgeItem: any) => {
          edgeItem.media.nodes.map((med: any) => {
            if (med.mediaContentType === 'MODEL_3D') {
              if (!m.find((item: any) => item.name === edgeItem.handle)) {
                m.push({ name: edgeItem.handle, url: `${med.sources[0].url}`, collection: node.handle, price: prices[index] })
              }
            }
          })
        })
      )
    })

    stableData && stableData.collection.collections.nodes.map((node: any) => {
      node.products.edges.map((edge: any) =>
        Object.values(edge).map((edgeItem: any) =>
          edgeItem.variants.nodes.map((node: any) =>
            Object.values(node).map((item: any) => {
              if (Object.prototype.toString.call(item) === "[object Object]") {
                prices.push(item.amount)
              }
            })
          )
        )
      )
    })
  }, [])


  return (<>

    <section className="w-full gap-4" id="shopSection">
      <h2 className="whitespace-pre-wrap max-w-prose font-bold text-lead my-3">
        Collections
      </h2>
      <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-3">
        {stableData.nodes.map((collection: any) => {
          return (
            <Link to={`/collections/${collection.handle}`} key={collection.id}>
              <div className="grid gap-4">
                {collection?.image && (
                  <Image
                    loading='lazy'
                    alt={`Image of ${collection.title}`}
                    data={collection.image}
                    key={collection.id}
                    sizes="(max-width: 32em) 100vw, 33vw"
                  />
                )}
                <h2 className="whitespace-pre-wrap max-w-prose font-medium text-copy">
                  {collection.title}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  </>
  );
}


