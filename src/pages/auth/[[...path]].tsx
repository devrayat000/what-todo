import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { getRoutingComponent, canHandleRoute } from 'supertokens-auth-react'
import { redirectToAuth } from 'supertokens-auth-react/recipe/emailpassword'

const SuperTokensComponentNoSSR = dynamic(
  Promise.resolve(getRoutingComponent as () => JSX.Element),
  { ssr: false }
)

export default function Auth() {
  console.log('auth page');
  
  // if the user visits a page that is not handled by us (like /auth/random), then we redirect them back to the auth page.
  useEffect(() => {
    if (canHandleRoute() === false) {
      redirectToAuth()
    }
  }, [])

  return <SuperTokensComponentNoSSR />
}
