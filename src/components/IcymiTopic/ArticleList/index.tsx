import * as React from 'react'
import { Card } from 'antd'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import { arrayMoveImmutable } from 'array-move'

import { toGlobalId } from '../../../utils'
import ErrorMessage from '../../ErrorMessage'
import withArticleList, { ChildProps } from './withArticleList'

type Article = {
  id: string
  title: string
}

type ArticleListState = {
  articles: Article[]
  loading: boolean
  error: any
}

class ArticleList extends React.Component<ChildProps, ArticleListState> {
  state: Readonly<ArticleListState> = {
    articles: this.props.articles,
    loading: false,
    error: null,
  }

  private _onSortEnd = async ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number
    newIndex: number
  }) => {
    this.setState(({ articles }) => ({
      articles: arrayMoveImmutable(articles, oldIndex, newIndex),
      loading: true,
      error: null,
    }))

    const { mutate, id } = this.props
    const { articles } = this.state

    try {
      await mutate({
        variables: {
          input: {
            id,
            articles: articles.map(({ id }) => id),
          },
        },
      })
      this.setState({ loading: false, error: null })
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  private SortableItem = SortableElement(({ value }: { value: Article }) => (
    <li>
      <Card>{value.title}</Card>
    </li>
  ))

  private SortableList = SortableContainer(
    ({ items }: { items: Article[] }) => {
      return (
        <ul style={{ listStyleType: 'none', paddingInlineStart: 0 }}>
          {items.map((value, index) => (
            <this.SortableItem
              key={`item-${value.id}`}
              index={index}
              value={value}
            />
          ))}
        </ul>
      )
    }
  )

  public render() {
    const { articles, loading, error } = this.state

    if (error) {
      return <ErrorMessage error={error} />
    }

    return <this.SortableList items={articles} onSortEnd={this._onSortEnd} />
  }
}

export default withArticleList(ArticleList)
