import * as React from 'react'
import { Modal, Switch } from 'antd'
import _get from 'lodash/get'

import QueryBlockList from '../../../gql/queries/blockList.gql'
import ErrorMessage from '../../ErrorMessage'
import withToggleArchive, { ChildProps } from './withToggleArchive'

type ToggleArchiveState = {
  checked: boolean
  loading: boolean
  error: any
}

class ToggleArchive extends React.Component<ChildProps, ToggleArchiveState> {
  state: Readonly<ToggleArchiveState> = {
    checked: this.props.checked,
    loading: false,
    error: null,
  }

  private _onChange = async () => {
    this.preConfirm()
  }

  private preConfirm = () => {
    const archived = this.state.checked

    Modal.confirm({
      title: archived ? `封鎖該項目？` : `解除封鎖？`,
      content: (
        <div style={{ marginTop: 16 }}>
          <span>
            {archived
              ? '封鎖郵箱時，會一併封鎖其相應的指紋。'
              : '解除郵箱封鎖時，會一併解除其相應的指紋封鎖。'}
          </span>
        </div>
      ),
      cancelText: '取消',
      okText: '確認',
      onOk: () => {
        this._onConfirmChange()
      },
      onCancel: () => {},
    })
  }

  private _onConfirmChange = async () => {
    this.setState({ loading: true, error: null })

    const { mutate, id } = this.props

    try {
      const archived = !this.state.checked
      const result = await mutate({
        variables: {
          input: {
            id,
            archived,
          },
        },
        update: (cache, { data }) => {
          const variables = { input: { first: 20 } }
          const ids = _get(data, 'putSkippedListItem', []).map(
            (item: any) => item.id
          )
          const cacheData = cache.readQuery<any>({
            query: QueryBlockList,
            variables,
          })

          const newEdges = _get(
            cacheData,
            'oss.skippedListItems.edges',
            []
          ).map((item: any) => {
            if (ids.includes(item.id)) {
              return { ...item, archived }
            }
            return item
          })

          cache.writeQuery({
            query: QueryBlockList,
            variables,
            data: {
              oss: {
                ...cacheData.oss,
                skippedListItems: {
                  ...cacheData.oss.skippedListItems,
                  edges: newEdges,
                },
              },
            },
          })
        },
      })

      this.setState({ loading: false, error: null })
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  static getDerivedStateFromProps(props: any, state: any) {
    if (props.checked !== state.checked) {
      return {
        checked: props.checked,
        loading: false,
        error: null,
      }
    }
    return null
  }

  public render() {
    const { checked, loading, error } = this.state

    if (error) {
      return <ErrorMessage error={error} />
    }

    return (
      <Switch onChange={this._onChange} checked={checked} loading={loading} />
    )
  }
}

export default withToggleArchive(ToggleArchive)
