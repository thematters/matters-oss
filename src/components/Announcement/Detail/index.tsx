import * as React from 'react'
import { Mutation } from 'react-apollo'
import { Button, Input, message, Select, Switch } from 'antd'
import gql from 'graphql-tag'

import Uploader from '../../../components/Announcement/Uploader'
import Section from '../../../components/DescriptionList'
import Divider from '../../../components/Divider'
import { ANNOUNCEMENT_TYPES } from '../../../constants'
import { Announcement } from '../../../definitions'

const PUT_ANNOUNCEMENT = gql`
  mutation PutAnnouncement($input: PutAnnouncementInput!) {
    putAnnouncement(input: $input) {
      id
      cover
      link
      type
      visible
      order
      __typename
    }
  }
`

type DetailProps = {
  data: Announcement
  loading?: boolean
}

type DetailState = {
  coverId?: string | null
  loading: boolean
  warning: string | null
  error: any
} & Announcement

class Detail extends React.Component<DetailProps, DetailState> {
  state = {
    ...this.props.data,
    coverId: null,
    loading: false,
    warning: null,
    error: null,
  }

  private action = async (putAnnouncement: any): Promise<any> => {
    if (!putAnnouncement) {
      return
    }

    this.setState((prev) => ({
      ...prev,
      loading: true,
      warning: null,
      error: null,
    }))

    try {
      const { id, cover, coverId, link, type, visible } = this.state
      const result = await putAnnouncement({
        variables: {
          input: {
            id,
            cover: coverId,
            link,
            type,
            visible,
          },
        },
      })
      this.setState(
        (prev) => ({ ...prev, loading: false, error: null }),
        () => {
          message.success('儲存成功')
        }
      )
    } catch (error) {
      this.setState((prev) => ({ ...prev, loading: false, error }))
    }
  }

  public render() {
    const { id, cover, link, type, visible, order, loading } = this.state

    return (
      <Mutation mutation={PUT_ANNOUNCEMENT}>
        {(putAnnouncement: any) => (
          <>
            <Section size="large" title="公吿圖片">
              <Section.Description term="圖片" style={{ width: '50%' }}>
                <Uploader
                  announcementId={id}
                  cover={cover}
                  onSuccess={({ id, path }: { id: string; path: string }) => {
                    this.setState({ cover: path, coverId: id })
                  }}
                />
              </Section.Description>
            </Section>
            <Divider size="large" />

            <Section size="large" title="公告內容">
              <Section.Description term="連結">
                <Input
                  value={link}
                  onChange={(e) => {
                    this.setState({ link: e.target.value })
                  }}
                />
              </Section.Description>

              <Section.Description term="類別">
                <Select
                  value={type}
                  onSelect={(value: any) => {
                    this.setState({ type: value })
                  }}
                >
                  {ANNOUNCEMENT_TYPES.map(({ key, text }) => (
                    <Select.Option key={key}>{text}</Select.Option>
                  ))}
                </Select>
              </Section.Description>

              <Section.Description term="顯示">
                <Switch
                  checked={visible}
                  onChange={() => {
                    this.setState({ visible: !visible })
                  }}
                />
              </Section.Description>
            </Section>
            <Divider size="large" />

            <Section title="">
              <Section.Description term="">
                <Button
                  type="primary"
                  onClick={() => this.action(putAnnouncement)}
                  disabled={loading}
                >
                  儲存
                </Button>
              </Section.Description>
            </Section>
          </>
        )}
      </Mutation>
    )
  }
}

export default Detail
