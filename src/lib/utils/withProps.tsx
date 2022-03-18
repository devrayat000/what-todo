const withProps = <Props, P extends Partial<Props>>(
  Component: React.ComponentType<Props>,
  propsToInclude: P
) => {
  return function FilteredComponent(props: Omit<Props, keyof P>) {
    return <Component {...(propsToInclude as any)} {...(props as any)} />
  }
}

export default withProps
