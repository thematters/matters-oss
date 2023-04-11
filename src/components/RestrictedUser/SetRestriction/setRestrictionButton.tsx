import { Button, Modal, Checkbox, Row, message } from 'antd'
import * as React from 'react'
import withSetRestriction, { ChildProps } from './withSetRestriction'
import { PAGE_SIZE } from '../../../constants'
import { GQLUserRestrictionType } from '../../../definitions'
import RestrictedUserList from '../../../gql/queries/restrictedUserList.gql'

type SetRestrictionState = {
  loading: boolean
  modalVisible: boolean
  error: any
  restrictions: GQLUserRestrictionType[]
}

class SetRestrictionButton extends React.Component<
  ChildProps,
  SetRestrictionState
> {
  constructor(props: ChildProps) {
    super(props)
    this.state = {
      loading: false,
      modalVisible: false,
      error: null,
      restrictions: this.props.restrictions,
    }
  }
  private _handleOk = async () => {
    this.setState({ ...this.state, loading: true })
    const { mutate, userId } = this.props
    try {
      await mutate({
        variables: {
          input: { ids: [userId], restrictions: this.state.restrictions },
        },
        update: (cache, { data }) => {
          const variables = { input: { first: PAGE_SIZE } }
          const cacheData = cache.readQuery<any>({
            query: RestrictedUserList,
            variables,
          })
          const newEdge = { node: data?.putRestrictedUsers[0] }

          // updated node already in restrictedUsers list, skip
          if (
            cacheData.oss.restrictedUsers.edges.find(
              (edge: any) => edge.node.id === newEdge?.node?.id
            )
          ) {
            return
          }
          cache.writeQuery({
            query: RestrictedUserList,
            variables,
            data: {
              oss: {
                ...cacheData.oss,
                restrictedUsers: {
                  ...cacheData.oss.restrictedUsers,
                  totalCount: cacheData.oss.totalCount + 1,
                  edges: [newEdge, ...cacheData.oss.restrictedUsers.edges],
                },
              },
            },
          })
        },
      })
      this.setState({ ...this.state, loading: false, modalVisible: false })
    } catch (error) {
      message.error(error)
      this.setState({ ...this.state, loading: false, error })
    }
  }
  private _handlerChange = (checkedValues: any) => {
    this.setState({
      ...this.state,
      restrictions: checkedValues as GQLUserRestrictionType[],
    })
  }

  public render() {
    return (
      <>
        <Button
          type="primary"
          onClick={() => {
            this.setState({ ...this.state, modalVisible: true })
          }}
        >
          修改
        </Button>
        <Modal
          title="修改管制项目"
          visible={this.state.modalVisible}
          onOk={this._handleOk}
          confirmLoading={this.state.loading}
          onCancel={() => {
            this.setState({ ...this.state, modalVisible: false })
          }}
        >
          <Checkbox.Group
            defaultValue={this.state.restrictions}
            onChange={this._handlerChange}
          >
            <Row>
              <Checkbox value="articleHottest">首頁熱門不顯示文章</Checkbox>
            </Row>
            <Row>
              <Checkbox value="articleNewest">首頁最新不顯示文章</Checkbox>
            </Row>
          </Checkbox.Group>
        </Modal>
      </>
    )
  }
}

export default withSetRestriction(SetRestrictionButton)
