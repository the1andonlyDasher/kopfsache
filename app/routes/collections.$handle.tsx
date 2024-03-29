import { useLoaderData, useLocation } from '@remix-run/react';
import { LoaderFunctionArgs, json } from '@shopify/remix-oxygen';
import ProductGrid from '../components copy/ProductGrid';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { model, pDisplay, productViewer } from '../components copy/atoms';
import Footer from '../components copy/Footer';
import { Bounds, useBounds } from '@react-three/drei';
import { View } from '~/components copy/Canvas/View';
import { GLShop } from '~/components copy/GLShop';

const seo = ({ data }: any) => ({
  title: data?.collection?.title,
  description: data?.collection?.description.substr(0, 154),
});

export const handle = {
  seo,
};

export async function loader({ params, context, request }: LoaderFunctionArgs) {
  const { handle }: any = params;
  const searchParams = new URL(request.url).searchParams;
  const cursor = searchParams.get('cursor');
  const { collection }: any = await context.storefront.query(COLLECTION_QUERY, {
    variables: {
      handle,
      cursor,
    },
  });

  // Handle 404s
  if (!collection) {
    throw new Response(null, { status: 404 });
  }

  // json is a Remix utility for creating application/json responses
  // https://remix.run/docs/en/v1/utils/json
  return json({
    collection,
  });
}

export function meta({ data }: any) {
  return [
    { title: data?.collection?.title ?? 'Collection' },
    { description: data?.collection?.description },
  ];
}

export default function Collection() {
  const { collection }: any = useLoaderData() || {};
  const [m, setM] = useAtom(model);
  const [pWindow, setPWindow] = useAtom(pDisplay);
  const productDisplay = useRef<any>(!null)
  const prices: any = [];
  const [stableData, setData] = useState(collection);
  const [products, setProducts] = useState(stableData.products.nodes || []);
  const [pvAtom, setPVAtom] = useAtom(productViewer)
  const productRef = useRef<any>(!null)

  const setCoords = () => {
    const { width, height, left, top } = productDisplay?.current.getBoundingClientRect()
    setPVAtom({ width, height, left, top })
    console.log("setting coords")
  };

  useEffect(() => {
    window.addEventListener('scroll', setCoords);

    return () => {
      window.removeEventListener('scroll', setCoords);
    };
  });

  useEffect(() => {
    window.addEventListener('resize', setCoords);

    return () => {
      window.removeEventListener('resize', setCoords);
    };
  });

  useEffect(() => {
    console.log(stableData);

  }, [stableData]);

  useEffect(() => {
    setCoords()
  }, []);

  //   products.map((node:any)=>
  //   node.media.nodes.map((med: any, index:number) => {
  //     if (med.mediaContentType === 'MODEL_3D') {
  //                 if (!m.find((item: any) => item.name === node.handle)) {
  //                  var k:any = Object.values(med)[2];
  //                  var url = k[1].url
  //                 m.push({ name: node.handle, url: `${med.sources[0].url}`, collection: stableData.handle, price:  prices[index] })
  //                 }
  //               }
  //   })
  //   )
  //   // console.log(m, fetcher.data)
  //   collection && setData(collection);
  //   var o = products.map((object:any)=>(Object.values(object)[6]))
  //   var k = Object.values(o)
  //   var p = k.map((node:any)=>Object.values(node)[0])
  //   var q = p.map((item:any)=>Object.values(item)[0])

  //   var r = Object.values(q)
  //   var s = Object.values(r)
  //   var u = s.map((item:any)=>Object.values(item)[2])
  //   var v = u.map((item:any)=>Object.values(item)[0])
  //   prices.push(v)
  // };



  return (
    <>
      <section className="w-full gap-4 md:gap-8 grid">
        <div ref={productDisplay} className="collectionDisplay flex flex-1  w-full h-full min-h-[15rem] xs:min-h-[17rem] sm:min-h-[20rem] md:min-h-[25rem] lg:min-h-[30rem] xl:min-h-[35rem]">

        </div>
        <header className="grid w-full gap-8 py-8 justify-items-start">
          <div className="w-full max-w-full flex flex-wrap  rounded-[2px]">
            {stableData.description && (
              <div className="flex items-baseline justify-between w-full">
                <p className=" whitespace-pre-wrap inherit text-copy flex-auto ">
                  {stableData.description}
                </p>
              </div>
            )}
          </div>
        </header>
        <ProductGrid
          collection={stableData}
          url={`/collections/${stableData.handle}`}
        />
      </section>

    </>
  );
}

const COLLECTION_QUERY = `#graphql
  query CollectionDetails($handle: String!, $cursor: String) {
    collection(handle: $handle) {
      id
      title
      description
      handle
      products(first: 4, after: $cursor) {

        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          title
          descriptionHtml
          publishedAt
          handle
          media(first: 10) {
            nodes {
              ... on MediaImage {
                mediaContentType
                image {
                  id
                  url
                  altText
                  width
                  height
                }
              }
              ... on Model3d {
                id
                mediaContentType
                sources {
                  mimeType
                  url
                }
              }
            }
          }
          metafield(namespace:"custom", key:"seo_desc") {
            id
            value
          }
          variants(first: 1) {
            nodes {
              id
              image {
                url
                altText
                width
                height
              }
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`;
