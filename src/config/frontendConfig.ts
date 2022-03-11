import SuperTokensReact from 'supertokens-auth-react'
import EmailPasswordReact from 'supertokens-auth-react/recipe/emailpassword'
import SessionReact from 'supertokens-auth-react/recipe/session'
import type { SuperTokensConfig } from 'supertokens-auth-react/lib/build/types'

import { appInfo } from './appInfo'

export const frontendConfig = (): SuperTokensConfig => {
  return {
    appInfo,
    recipeList: [
      EmailPasswordReact.init({
        getRedirectionURL: async context => {
          if (context.action === 'SUCCESS') {
            if (context.redirectToPath !== undefined) {
              // we are navigating back to where the user was before they authenticated
              return context.redirectToPath
            }
            return '/'
          }
          return undefined
        },
      }),
      SessionReact.init(),
    ],
  }
}

export function initFrontend() {
  if (typeof window !== 'undefined') {
    SuperTokensReact.init(frontendConfig())
  }
}
