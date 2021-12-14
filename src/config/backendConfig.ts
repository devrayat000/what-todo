import EmailPasswordNode from 'supertokens-node/recipe/emailpassword'
import SessionNode from 'supertokens-node/recipe/session'
import JWTNode from 'supertokens-node/recipe/jwt'
import type { TypeInput } from 'supertokens-node/lib/build/types'
import { appInfo } from './appInfo'

export const backendConfig = (): TypeInput => {
  return {
    framework: 'express',
    supertokens: {
      // try.supertokens.io is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.io), or self host a core.
      connectionURI: process.env.NEXT_PUBLIC_SUPERTOKENS_CONNECTION_URI!,
      // apiKey: process.env.NEXT_PUBLIC_SUPERTOKENS_API_KEY,
    },
    appInfo,
    recipeList: [EmailPasswordNode.init(), SessionNode.init()],
    isInServerlessEnv: true,
  }
}
