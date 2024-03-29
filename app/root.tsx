import { Seo, useNonce } from '@shopify/hydrogen';
import styles from './styles/style.css';
import {
  defer,
  type SerializeFrom,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  LiveReload,
  useMatches,
  useRouteError,
  useLoaderData,
  ScrollRestoration,
  isRouteErrorResponse,
  type ShouldRevalidateFunction,
  useLocation,
} from '@remix-run/react';
import type { CustomerAccessToken } from '@shopify/hydrogen/storefront-api-types';
import favicon from '../public/favicon.svg';
import resetStyles from './styles/reset.css';
import { Layout } from "./components copy/Layout"
import { useAtom } from 'jotai';
import { model } from './components copy/atoms';
import { useRef, useState, useEffect } from 'react';
import { Layout as HydrogenLayout } from "./components/Layout"
import { CookieConsent } from './components copy/CookieConsent';
import GL from './components copy/GL';
import tailwind from './styles/tailwind-build.css';
import { COLLECTIONS_QUERY } from './queries/models';
import { CART_QUERY } from './queries/cart';

/**
 * This is important to avoid re-fetching root queries on sub-navigations
 */
export const shouldRevalidate: ShouldRevalidateFunction = ({
  formMethod,
  currentUrl,
  nextUrl,
}) => {
  // revalidate when a mutation is performed e.g add to cart, login...
  if (formMethod && formMethod !== 'GET') {
    return true;
  }

  // revalidate when manually revalidating via useRevalidator
  if (currentUrl.toString() === nextUrl.toString()) {
    return true;
  }

  return false;
};

export function links() {
  return [
    // { rel: 'stylesheet', href: resetStyles },
    { rel: 'stylesheet', href: tailwind },
    { rel: 'stylesheet', href: styles },
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    { rel: 'icon', type: 'image/svg+xml', href: favicon },
  ];
}

export const useRootLoaderData = () => {
  const [root] = useMatches();
  return root?.data as SerializeFrom<typeof loader>;
};

async function getCart({ storefront }: any, cartId: any) {
  if (!storefront) {
    throw new Error('missing storefront client in cart query');
  }

  const { cart } = await storefront.query(CART_QUERY, {
    variables: {
      cartId,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
    cache: storefront.CacheNone(),
  });

  return cart;
}

export async function loader({ context }: LoaderFunctionArgs) {
  const cartId = await context.session.get('cartId');
  const { storefront, session } = context;
  const customerAccessToken = await session.get('customerAccessToken');
  const publicStoreDomain = context.env.PUBLIC_STORE_DOMAIN;

  // validate the customer access token is valid
  const { isLoggedIn, headers } = await validateCustomerAccessToken(
    session,
    customerAccessToken,
  );


  // defer the footer query (below the fold)
  const footerPromise = storefront.query(FOOTER_QUERY, {
    cache: storefront.CacheLong(),
    variables: {
      footerMenuHandle: 'footer', // Adjust to your footer menu handle
    },
  });

  // await the header query (above the fold)
  const headerPromise = storefront.query(HEADER_QUERY, {
    cache: storefront.CacheLong(),
    variables: {
      headerMenuHandle: 'main-menu', // Adjust to your header menu handle
    },
  });

  return defer(
    {
      cart: cartId ? getCart(context, cartId) : undefined,
      footer: footerPromise,
      header: await headerPromise,
      isLoggedIn,
      publicStoreDomain,
      collection: await context.storefront.query(COLLECTIONS_QUERY, {
        variables: {
          handle
        },
      })
    },
    { headers },
  );
}

export const handle = {
  seo: {
    title: 'Kopfsache by Stephan',
    description:
      'Kopfsache by Stephan ist dein Friseur und Barber Shop in Unterensingen. Entdecke neue Haarschnitte, Styles und Produkte.',
  },
};

export default function App() {
  const data: any = useLoaderData<typeof loader>() || {};
  const nonce = useNonce();
  const prices: any = []
  const [m, setM] = useAtom(model)
  const { name }: any = data.header.shop.name;
  const location = useLocation();
  const lastLocationKey = useRef<string>('');
  const [stableData, setData] = useState<any>(data);


  useEffect(() => {
    // Filter out useEffect running twice
    if (lastLocationKey.current === location.key) return;
    lastLocationKey.current = location.key;
    // This hook is where you can send a page view event to Shopify and other third-party analytics
  }, [location]);



  useEffect(() => {
    stableData && stableData.collection.collections.nodes.map((node: any) => {
      node.products.edges.map((edge: any, index: number) =>
        Object.values(edge).map((edgeItem: any) => {
          edgeItem.media.nodes.map((med: any) => {
            if (med.mediaContentType === 'MODEL_3D') {
              if (!m.find((item: any) => item.name === edgeItem.handle)) {
                m.push({ name: edgeItem.handle, index: index + 1, url: `${med.sources[0].url}`, collection: node.handle, price: prices[index] })
              }
            }
          })
        })
      )
    })
    data && setData(data)
    stableData && stableData.collection.collections.nodes.map((node: any) => {
      node.products.edges.map((edge: any) =>
        Object.values(edge).map((edgeItem: any) =>
          edgeItem.variants.nodes.map((node: any) =>
            Object.values(node).map((item: any) => {
              if (Object.prototype.toString.call(item) === "[object Object]") {
                prices.push(item.amount)

              }
            }))))
    })



  }, [stableData])

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Seo />
        <Meta />
        <Links />
      </head>
      <body className='bg-gradient-to-r from-cyan-500 to-blue-500'>
        <CookieConsent />
        <Layout title={name} />
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        <LiveReload nonce={nonce} />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const rootData = useRootLoaderData();
  const nonce = useNonce();
  let errorMessage = 'Unknown error';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>

        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        <LiveReload nonce={nonce} />
      </body>
    </html>
  );
}

/**
 * Validates the customer access token and returns a boolean and headers
 * @see https://shopify.dev/docs/api/storefront/latest/objects/CustomerAccessToken
 *
 * @example
 * ```js
 * const {isLoggedIn, headers} = await validateCustomerAccessToken(
 *  customerAccessToken,
 *  session,
 * );
 * ```
 */
async function validateCustomerAccessToken(
  session: LoaderFunctionArgs['context']['session'],
  customerAccessToken?: CustomerAccessToken,
) {
  let isLoggedIn = false;
  const headers = new Headers();
  if (!customerAccessToken?.accessToken || !customerAccessToken?.expiresAt) {
    return { isLoggedIn, headers };
  }

  const expiresAt = new Date(customerAccessToken.expiresAt).getTime();
  const dateNow = Date.now();
  const customerAccessTokenExpired = expiresAt < dateNow;

  if (customerAccessTokenExpired) {
    session.unset('customerAccessToken');
    headers.append('Set-Cookie', await session.commit());
  } else {
    isLoggedIn = true;
  }

  return { isLoggedIn, headers };
}

const MENU_FRAGMENT = `#graphql
  fragment MenuItem on MenuItem {
    id
    resourceId
    tags
    title
    type
    url
  }
  fragment ChildMenuItem on MenuItem {
    ...MenuItem
  }
  fragment ParentMenuItem on MenuItem {
    ...MenuItem
    items {
      ...ChildMenuItem
    }
  }
  fragment Menu on Menu {
    id
    items {
      ...ParentMenuItem
    }
  }
` as const;

const HEADER_QUERY = `#graphql
  fragment Shop on Shop {
    id
    name
    description
    primaryDomain {
      url
    }
    brand {
      logo {
        image {
          url
        }
      }
    }
  }
  query Header(
    $country: CountryCode
    $headerMenuHandle: String!
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    shop {
      ...Shop
    }
    menu(handle: $headerMenuHandle) {
      ...Menu
    }
  }
  ${MENU_FRAGMENT}
` as const;

const FOOTER_QUERY = `#graphql
  query Footer(
    $country: CountryCode
    $footerMenuHandle: String!
    $language: LanguageCode
  ) @inContext(language: $language, country: $country) {
    menu(handle: $footerMenuHandle) {
      ...Menu
    }
  }
  ${MENU_FRAGMENT}
` as const;
