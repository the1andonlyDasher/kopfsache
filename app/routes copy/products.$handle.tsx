import { useLoaderData, useMatches, useFetcher } from '@remix-run/react';
import { LoaderArgs, json } from '@shopify/remix-oxygen';
import { MediaFile, Money, ShopPayButton, Image } from '@shopify/hydrogen-react';
import ProductOptions from '@components/ProductOptions'
import { useEffect, useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { model } from '@components/atoms';
import { useLocation } from '@remix-run/react';
import Footer from '@components/Footer';
import { SeoHandleFunction } from '@shopify/hydrogen';
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg className='w-full h-full absolute top-0 right-0' width='100%' height='100%' {...props} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern
        id="a"
        width={100}
        height={100}
        patternTransform="scale(2)"
        patternUnits="userSpaceOnUse"
      >
        <rect width="100%" height="100%" fill="hsla(0, 0%, 100%, 0)" />
        <path
          fill="hsla(217, 91%, 92%, 1)"
          d="M0 0v1l1-1H0zm6.29 0-.147.143 11.81 11.619 8.19-8.143L22.666.047 22.709 0h-1.998l-.045.047 3.477 3.572-6.19 6.143L8.238.192 8.434 0H6.289zm6.759 0 1.047 1.047L15.143 0h-2.094zm14.474 0 7.143 7.143-2.428 2.523-3.43-3.523-4.855 4.572 8.238 8.142L43.857 7.143 36.686 0h-2.008l7.226 7.191-9.666 9.713L26 10.762l2.762-2.57 3.476 3.617 4.477-4.618L29.572.047 29.62 0h-2.096zm14.288 0 4.808 4.809 4.572-4.57L50.953 0h-2.047l.285.285-2.572 2.572L43.762 0H41.81zm14.068 0-17.64 17.904 4.57 4.62L65 .333 64.697 0H62.79l.258.285-20.19 20.192-2.572-2.573L57.857 0H55.88zm14.549 0-3.62 3.62 8.145 8.142L86.666.047 86.619 0h-1.951l.047.047L75 9.762l-6.143-6.143 2.57-2.572L75 4.619 79.62 0h-2.048l-2.619 2.62L72.334 0h-1.906zm21.43 0-3.62 3.62 4.57 4.571L100 .998V0h-.953l-6.19 6.191-2.572-2.572L93.905 0h-2.048zm-88 2.191L0 6.091v2.04l3.762-3.846 2.666 3.049-6.381 6.19-.047-.05v2.098l8.38-8.095L3.858 2.19zM100 6.091l-4.572 4.624L100 15.572v-2.097l-2.572-2.713L100 8.13V6.09zm-35.762.1-4.572 4.57 4.572 4.573 4.57-4.572-4.57-4.57zm21.428 0L74.953 16.904l-3.572-3.57-4.572 4.57 8.144 8.143 15.285-15.285-4.572-4.57zm-21.428 2 2.57 2.57-2.57 2.573-2.572-2.572 2.572-2.57zm21.477 0 2.57 2.57L75 24.048l-6.143-6.143 2.57-2.57L75 18.904 85.715 8.191zM10.666 10 0 20.668v2L10.666 12l2.572 2.572L0 27.811v2l15.238-15.239L10.666 10zm46.43 3.334L42.809 27.619l-7.381-7.38-8.143 8.142 4.572 4.572 3.57-3.572 2.811 2.81-6.142 6.143L21.38 27.619l-4.572 4.572 15.287 15.286 25-25L67.809 33.19l4.572-4.572-15.285-15.285zm35.713.238-4.57 4.57 11.714 11.715.047-.046v-1.954l-9.715-9.714 2.572-2.57L100 22.714v-2.047l-.047.047-7.144-7.143zm-71.143.094-12 11.38 4.572 4.669 7.334-7.238 3.381 3.57 4.62-4.62-7.907-7.761zm35.43 1.62L70.38 28.571l-2.572 2.57-10.713-10.714-25 25-13.287-13.285 2.572-2.57 10.715 10.712 8.142-8.142-4.81-4.809-3.57 3.57-2.573-2.57 6.143-6.143 7.38 7.381 14.288-14.287zm-35.477.429 5.904 5.762L25 24l-3.38-3.523-7.335 7.285-2.57-2.62 9.904-9.427zm64.047 4.762-4.57 4.57L96.38 40.334l3.619-3.62V34.81L85.666 20.477zm.049 2L99 35.762l-2.572 2.572-13.285-13.287 2.572-2.57zm-6.953 4.904L67.809 38.334l-3.57-3.572-4.573 4.572 8.143 8.143 15.525-15.524-4.572-4.572zm-71.666.238-4.573 4.572L17.81 47.477l4.572-4.573L7.096 27.62zm50 0L45.38 39.334l4.572 4.57 11.713-11.713-4.57-4.572zm21.713 1.762 2.572 2.572-13.524 13.524-6.142-6.143 2.57-2.572 3.572 3.572L78.81 29.381zm-71.713.238L20.38 42.904l-2.572 2.573L4.523 32.19l2.573-2.572zm50 0 2.57 2.572-9.713 9.713-2.572-2.57 9.715-9.715zm28.57 5.143-4.57 4.572 11.713 11.713 4.572-4.57-11.715-11.715zM0 34.809v1.906l.953-.953L0 34.809zm85.715 1.953 9.713 9.715-2.57 2.57-9.715-9.713 2.572-2.572zm-82.192 1.81L0 41.877v2.08l2.523 2.424L0 48.973v2.12l7.096 7.098 8.142-8.144L3.523 38.572zm0 1.951L13.238 50l-6.142 6.143L.953 50l3.57-3.715L1 42.857l2.523-2.334zM100 41.877l-1.096 1.027L100 43.957v-2.08zm-57.191.027-4.57 4.573 4.57 4.57 4.572-4.57-4.572-4.573zm14.287 0L45.38 53.62l4.572 4.572 7.143-7.144 10.713 10.715 4.572-4.57-15.285-15.288zm21.476 0-8.144 8.143L75 54.619l3.572-3.572 7.143 7.144 4.57-4.572-11.713-11.715zm-35.763 2 2.572 2.573-2.572 2.57-2.57-2.57 2.57-2.573zm14.287 0L70.38 57.191l-2.572 2.57-10.713-10.714-7.143 7.144-2.572-2.572 9.715-9.715zm21.476 0 9.713 9.715-2.57 2.572-7.143-7.144L75 52.619l-2.572-2.572 6.144-6.143zm-53.619 1.573L9.666 60.762l4.572 4.572 15.285-15.287-4.57-4.57zm0 2 2.57 2.57-13.285 13.287-2.572-2.572 13.287-13.285zM100 48.973l-1.047 1.074L100 51.094v-2.121zm-64.334.074-4.57 4.572 18.857 18.858 11.713-11.715-4.57-4.57-7.143 7.142-14.287-14.287zm0 2 14.287 14.287 7.143-7.143 2.57 2.57-9.713 9.716-16.857-16.858 2.57-2.572zm60.953 1.81-4.572 4.57L100 65.382v-2.049l-5.904-5.904 2.57-2.57L100 58.19v-1.953l-3.38-3.38zm-68.096 3.334L9.666 75.047l4.572 4.572 7.143-7.142 7.142 7.142 4.573-4.572-7.143-7.143 2.57-2.57 7.143 7.143 4.572-4.573-11.715-11.713zm50 0-8.142 8.143 8.142 8.143 4.573-4.573-3.573-3.57 3.573-3.572-4.573-4.57zM0 56.238v2l9.666 9.666-2.57 2.573L0 63.38v2l7.096 7.096 4.57-4.573L0 56.238zm28.523 1.905 9.715 9.714-2.572 2.57-7.143-7.142-4.57 4.572L31.096 75l-2.573 2.572-7.142-7.144-7.143 7.144L11.666 75l16.857-16.857zm50 .048 2.573 2.57-3.573 3.573 3.573 3.57-2.573 2.573-6.142-6.143 6.142-6.143zm10.715 1.57-4.572 4.573 3.572 3.57-6.904 6.905 4.57 4.572 11.477-11.477-8.143-8.142zm.047 2 6.143 6.143-9.475 9.477-2.572-2.572 6.904-6.905-3.57-3.57 2.57-2.572zm-25.047 1.573-8.142 8.143 4.57 4.57 8.143-8.143-4.57-4.57zm0 2 2.57 2.57-6.142 6.143-2.57-2.57 6.142-6.143zm-21.43 5.143L28.524 84.762l-7.142-7.143-4.572 4.57 11.714 11.715 18.858-18.857-4.572-4.57zm28.573 0-4.572 4.57 11.714 11.715 4.573-4.573L71.38 70.477zm28.572 0L88.238 82.189l4.57 4.43 7.145-7 .047.047v-2.094l-7.143 7.047-2.572-2.476L100 72.428v-1.905l-.047-.046zM0 70.523v1.952l16.809 16.81-2.57 2.572-3.573-3.572-7.143 7.143L0 91.904v2.05l3.523 3.523 7.143-7.143 3.572 3.57 4.57-4.57L0 70.524zm42.809 1.954 2.572 2.57-16.858 16.857-9.714-9.715 2.572-2.57 7.142 7.143L42.81 72.477zm28.572 0 9.715 9.712-2.573 2.573-9.714-9.715 2.572-2.57zm-17.858 1.57-4.57 4.572 4.57 4.57 4.573-4.57-4.573-4.572zm0 2 2.573 2.572-2.573 2.57-2.57-2.57 2.57-2.572zM0 77.619v2.047l6.096 6.096-2.573 2.666L0 84.81v1.953l3.523 3.664 4.573-4.713L0 77.619zm64.238 0L53.523 88.334l-7.142-7.145-4.572 4.573 11.714 11.715L68.81 82.189l-4.57-4.57zm0 2 2.57 2.57-13.285 13.288-9.714-9.715 2.572-2.573 7.142 7.145 10.715-10.715zm7.143 5.143-8.143 8.142 4.57 4.573 3.573-3.573 3.572 3.573 4.57-4.573-8.142-8.142zm14.285 0-4.57 4.572L89 97.238l4.572-4.572-7.906-7.904zm14.287 0-4.572 4.572 4.619 4.62v-2.097l-2.572-2.572 2.572-2.57V84.81l-.047-.05zm-28.525 1.953 6.144 6.142L75 95.427l-3.572-3.57-3.57 3.57-2.573-2.57 6.143-6.142zm14.287.047 5.904 5.904-2.572 2.572-5.904-5.904 2.572-2.572zm-46.477 1.572-4.572 4.57L41.762 100h2l-7.096-7.096 2.572-2.57L48.906 100h2L39.238 88.334zm-18.095 3.57-7.096 7.143-3.332-3.332L6.289 100h2.143l2.33-2.285L13.049 100h2.094l6.095-6.096L24 96.524 20.71 100h1.999L26 96.428l-4.857-4.524zm75.476 3.334L91.857 100h2.047l2.762-2.762 2.572 2.57-.191.192H100v-1.38l-3.38-3.382zm-36.142.096L55.879 100h1.978l2.57-2.62L62.79 100h1.908l-4.22-4.666zm-28.381.094L27.523 100h2.096l2.524-2.523L34.678 100h2.008l-4.59-4.572zm50 .049L77.572 100h2.047l2.524-2.523L84.668 100h1.951l-4.523-4.523zM0 98.617V100h1l.191-.191L0 98.617zm71.38.43-.952.953h1.906l-.953-.953z"
        />
      </pattern>
    </defs>
    <rect width="800%" height="800%" fill="url(#a)" />
  </svg>
)

const seo: SeoHandleFunction<typeof loader> = ({ data }) => ({
  title: data?.product?.seo?.title,
  description: data?.product?.seo?.description,
});

export const handle = {
  seo,
};

export async function loader({ params, request, context }: LoaderArgs) {
  const storeDomain = context.storefront.getShopifyDomain();
  const { handle } = params;
  const searchParams = new URL(request.url).searchParams;
  const selectedOptions: any = [];

  // set selected options from the query string
  searchParams.forEach((value, name) => {
    selectedOptions.push({ name, value });
  });

  const { product }: any = await context.storefront.query(PRODUCT_QUERY, {

    variables: {
      handle,
      selectedOptions,
      cache: context.storefront.CacheLong(),
    },
  });

  const selectedVariant =
    product.selectedVariant ?? product?.variants?.nodes[0];

  if (!product?.id) {
    throw new Response(null, { status: 404 });
  }

  return json({
    product,
    selectedVariant,
    storeDomain
  });
}


function PrintJson({ data }: any) {
  return (
    <details className="outline outline-2 outline-blue-300 p-4 my-2">
      <summary>Product JSON</summary>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </details>
  );
}

function ProductGallery({ media }: any) {
  const [m, setM] = useAtom(model);
  if (!media.length) {
    return null;
  }

  const typeNameMap: any = {
    MODEL_3D: 'Model3d',
    VIDEO: 'Video',
    IMAGE: 'MediaImage',
    EXTERNAL_VIDEO: 'ExternalVideo',
  };


  return (


    <div
      className={`grid gap-4 overflow-x-hidden grid-flow-col md:grid-flow-row  md:p-0 md:overflow-x-auto md:grid-cols-2 w-[90vw] md:w-full lg:col-span-2`}
    >
      {media.map((med: any, i: number) => {
        let extraProps = {};

        if (med.mediaContentType === 'MODEL_3D') {

          // console.log(`${med.sources[0].url}`)
          extraProps = {
            interactionPromptThreshold: '0',
            ar: true,
            loading: 'eager',
            disableZoom: true,
            style: { height: '100%', margin: '0 auto' },
          };


          const data = {
            ...med,
            __typename: typeNameMap[med.mediaContentType] || typeNameMap['IMAGE'],
            image: {
              ...med.image,
              altText: med.alt || 'Product image',
            },
          };

          return (
            <div
              className={`${i % 3 === 0 ? 'md:col-span-2' : 'md:col-span-1'
                // } snap-center card-image bg-white aspect-square md:w-full w-[80vw] shadow-sm rounded`}
                } snap-center card-image  aspect-square md:w-full w-[80vw]  rounded`}
              key={data.id || data.image.id}
            >
              <MediaFile
                tabIndex={0}
                className={`w-full h-full aspect-square object-cover model-viewer`}
                data={data}
                {...extraProps}
              />
            </div>
          );
        }
      })}
    </div>
  );
}

function ProductForm({ variantId }: any) {
  const [root] = useMatches();
  const selectedLocale = root?.data?.selectedLocale;
  const fetcher = useFetcher();

  const lines = [{ merchandiseId: variantId, quantity: 1 }];

  return (
    <fetcher.Form action="/cart" method="post" className='w-full'>
      <input type="hidden" name="cartAction" value={'ADD_TO_CART'} />
      <input
        type="hidden"
        name="countryCode"
        value={selectedLocale?.country ?? 'US'}
      />
      <input type="hidden" name="lines" value={JSON.stringify(lines)} />
      <button className="self-start bg-black text-white my-4 px-6 py-3 w-full rounded-md text-center font-medium ">
        In den Warenkorb
      </button>
    </fetcher.Form>
  );
}



export default function ProductHandle() {
  const [m, setM]: any = useAtom(model)
  const [productModel, setModel] = useState<any>();
  const loc = useLocation();
  const { handle }: any = useLoaderData<typeof loader>() || {};
  const { product, selectedVariant, storeDomain }: any = useLoaderData<typeof loader>() || {};
  const [stableProductData, setProductData] = useState(product)
  const [stableSelectedVariantData, setSelectedVariantData] = useState(selectedVariant)
  const [stableStoreDomainData, setStoreDomainData] = useState(storeDomain)
  const [stableHandleData, setHandleData] = useState(handle)
  const orderable = selectedVariant?.availableForSale || false;
  const [imgFeature, setImgFeature] = useState<any>({})
  const typeNameMap: any = {
    MODEL_3D: 'Model3d',
    VIDEO: 'Video',
    IMAGE: 'MediaImage',
    EXTERNAL_VIDEO: 'ExternalVideo',
  };

  useEffect(() => {
    product && setProductData(product);
    selectedVariant && setSelectedVariantData(selectedVariant);
    storeDomain && setStoreDomainData(storeDomain)
    handle && setHandleData(handle)
    stableProductData.media.nodes.map((node: any) => {
      if (node.mediaContentType === "IMAGE") {
        if (node.image.width === 1024) {
          setImgFeature(node.image)
        }
      }
    })
  }, [product, selectedVariant, storeDomain, handle])




  const node = JSON.parse(stableProductData.metafield.value)

  return (
    <>
      <section>
        <div className="product-grid w-full max-w-full grid items-start gap-6 lg:gap-10 md:grid-cols-[repeat(2,_minmax(auto,_1fr))]">
          <div className=" product max-h-[500px] w-full max-w-full grid md:grid-flow-row md:p-0  md:grid-cols-2 md:w-full lg:col-span-2">
            <div className="md:col-span-2 snap-center card-image aspect-square md:w-full w-[80vw]  rounded">
              <div
                className={`grid gap-4  grid-flow-col md:grid-flow-row  md:p-0  md:grid-cols-2 w-[90vw] md:w-full lg:col-span-2`}
              ></div>
              {/* <ProductGallery media={stableProductData.media.nodes} /> */}
            </div>
          </div>
          <div className="grid gap-2 name">
            <h1 className="text-4xl font-bold leading-10 whitespace-normal">
              {stableProductData.title}
            </h1>
            <span className="max-w-prose whitespace-pre-wrap inherit text-copy opacity-50 font-medium">
              {stableProductData.vendor}
            </span>
            <Money
              withoutTrailingZeros
              data={stableSelectedVariantData.price}
              className="text-xl font-semibold mb-2"
            />
          </div>
          <div className='grid gap-2 desc border-t border-[#222] md:pt-6'>
            <p>{stableProductData.descriptionHtml}</p>
          </div>
          <div className="buy grid">

            {/* {stableSelectedVariantData && <ProductOptions options={stableProductData.options} selectedVariant={stableSelectedVariantData} />}  */}
            {orderable && (
              <div className="flex flex-wrap space-y-2 max-w-[400px]">
                <ShopPayButton
                  storeDomain={stableStoreDomainData}
                  variantIds={[stableSelectedVariantData?.id]}
                  className='w-full flex flex-auto'
                  width='auto'
                />
                <ProductForm variantId={stableSelectedVariantData?.id} className='w-full flex flex-auto' />
              </div>
            )}

          </div>
        </div>
      </section>
      <section>
        <div className='overflow-hidden w-full my-4 py-10 px-8  border border-[#151515] rounded-md bg-gradient-to-br from-zinc-950 to-[#101010] relative'>
          <div className='h-full w-[30%] opacity-[0.1] absolute top-0 right-0'>
            <SvgComponent />
            <div className='absolute z-10 w-full h-full bg-gradient-to-r from-zinc-950 top-0 left-0'></div>
          </div>
          {node.children.map((child: any, index: number) => {
            if (child.type === "paragraph") {
              return <p key={index + child.type}>{child.children[0].value}</p>
            } else if (child.type === "heading") {
              if (child.level === 2) { return <h2 key={index + child.type} className='font-alt font-bold text-slate-100'>{child.children[0].value}</h2> }
              if (child.level === 3) { return <h3 key={index + child.type} className='text-3xl mt-10 mb-4 md:text-4xl my-2 text-slate-200 font-bold'>{child.children[0].value}</h3> }
              if (child.level === 4) { return <h4 key={index + child.type} className='font-text font-bold text-lg text-slate-300 md:text-xl '>{child.children[0].value}</h4> }
            }
          })}
        </div>
      </section>
      <Footer />
    </>
  );
}

const PRODUCT_QUERY = `#graphql
  query product($handle: String!, $selectedOptions: [SelectedOptionInput!]!) {
    product(handle: $handle) {
      id
      title
      handle
      vendor
      descriptionHtml
      metafield(namespace:"custom", key:"seo_desc"){
        value
      }
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
      options {
        name,
        values
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
        id
        availableForSale
        selectedOptions {
          name
          value
        }
        image {
          id
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
        sku
        title
        unitPrice {
          amount
          currencyCode
        }
        product {
          title
          handle
        }
      }
      variants(first: 1) {
        nodes {
          id
          title
          availableForSale
          price {
            currencyCode
            amount
          }
          compareAtPrice {
            currencyCode
            amount
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;


