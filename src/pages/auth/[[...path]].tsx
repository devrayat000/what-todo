import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import SuperTokens from 'supertokens-auth-react'
import { redirectToAuth } from 'supertokens-auth-react/recipe/emailpassword'

const SuperTokensComponentNoSSR = dynamic(() => import('../../config/ui'), {
  ssr: false,
})

export default function Auth() {
  console.log('auth page')

  // if the user visits a page that is not handled by us (like /auth/random), then we redirect them back to the auth page.
  useEffect(() => {
    if (SuperTokens.canHandleRoute() === false) {
      redirectToAuth()
    }
    console.log(SuperTokensComponentNoSSR)
  }, [])

  return (
    <>
      <h1>Auth Page</h1>
      <SuperTokensComponentNoSSR />
    </>
  )
}
