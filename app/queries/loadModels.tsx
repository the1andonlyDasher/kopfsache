import { LoaderArgs } from "@shopify/remix-oxygen";
import { handle } from "collections.$handle_backup";
import { defer } from "react-router-dom";
import { COLLECTIONS_QUERY } from "./models";

export async function mLoader({ context }: LoaderArgs) {
    return defer({
      models: await context.storefront.query(COLLECTIONS_QUERY, {
        variables: {
          handle,
        }
      })
    })
  }