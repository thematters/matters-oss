import * as React from 'react'
import { Button, Card, Row, Col, message } from 'antd'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import { arrayMoveImmutable } from 'array-move'

import ErrorMessage from '../../ErrorMessage'
import ArticleLink from '../../Article/Link'
import withArticleList, { ChildProps, InputProps } from './withArticleList'

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
      this.setState({ loading: false, error: null }, () => {
        message.success('文章顺序更新成功')
      })
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  private _onClick = (articleId: string) => {
    return async () => {
      this.setState({
        loading: true,
        error: null,
      })

      const { mutate, id } = this.props
      const { articles } = this.state

      try {
        await mutate({
          variables: {
            input: {
              id,
              articles: articles
                .map(({ id }) => id)
                .filter((id) => id !== articleId),
            },
          },
        })
        this.setState(
          {
            loading: false,
            error: null,
            articles: articles.filter(({ id }) => id !== articleId),
          },
          () => {
            message.success('文章移除成功')
          }
        )
      } catch (error) {
        this.setState({ loading: false, error })
      }
    }
  }

  private SortableItem = SortableElement(({ value }: { value: Article }) => (
    <li>
      <Row>
        <Card>
          <Col span={22}>
            <ArticleLink title={value.title} id={value.id} />
          </Col>
          <Col span={2}>
            <Button
              onClick={this._onClick(value.id)}
              disabled={this.state.loading}
            >
              移除
            </Button>
          </Col>
        </Card>
      </Row>
    </li>
  ))

  private SortableList = SortableContainer(
    ({ items }: { items: Article[] }) => {
      return (
        <ul style={{ listStyleType: 'none', paddingInlineStart: 0 }}>
          {items.map((value, index) => (
            <this.SortableItem key={value.id} index={index} value={value} />
          ))}
        </ul>
      )
    }
  )

  public componentDidUpdate(prevProps: InputProps) {
    if (prevProps.articles !== this.props.articles) {
      this.setState({
        articles: this.props.articles,
        loading: false,
        error: null,
      })
    }
  }

  public render() {
    const { articles, loading, error } = this.state

    if (error) {
      return <ErrorMessage error={error} />
    }

    return <this.SortableList items={articles} onSortEnd={this._onSortEnd} />
  }
}

export default withArticleList(ArticleList)
