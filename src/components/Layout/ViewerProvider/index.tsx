import gql from 'graphql-tag'
import React from 'react'

const ViewerFragments = {
  user: gql`
    fragment ViewerUser on User {
      id
    }
  `,
}

type ViewerUser = {
  id: string
}

export type Viewer = ViewerUser & {
  isAuthed: boolean
}

export const processViewer = (viewer: ViewerUser): Viewer => {
  const isAuthed = !!viewer.id

  return {
    ...viewer,
    isAuthed,
  }
}

export const ViewerContext = React.createContext({} as Viewer)

export const ViewerConsumer = ViewerContext.Consumer

export const ViewerProvider = ({
  children,
  viewer,
}: {
  children: React.ReactNode
  viewer: ViewerUser
}) => {
  return (
    <ViewerContext.Provider value={processViewer(viewer)}>
      {children}
    </ViewerContext.Provider>
  )
}

ViewerProvider.fragments = ViewerFragments
