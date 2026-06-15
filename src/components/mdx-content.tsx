"use client"

import * as runtime from "react/jsx-runtime"

type MDXContentProps = {
  code: string
  components?: Record<string, React.ComponentType>
}

function useMDXComponent(code: string) {
  const fn = new Function(code)
  return fn({ ...runtime }).default
}

export function MDXContent({ code, components }: MDXContentProps) {
  const Component = useMDXComponent(code)
  return <Component components={components} />
}
