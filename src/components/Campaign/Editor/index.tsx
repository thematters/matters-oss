import * as React from 'react'
import { Mutation } from 'react-apollo'
import { Button, DatePicker, Input, message } from 'antd'
import gql from 'graphql-tag'

import Uploader from './Uploader'
import Section from '../../../components/DescriptionList'
import Divider from '../../../components/Divider'
import { CampaignDetail } from '../../../definitions'

const PUT_CAMPAIGN = gql`
  mutation PutWritingChallenge($input: PutWritingChallengeInput!) {
    putWritingChallenge(input: $input) {
      id
    }
  }
`

type DetailProps = {
  campaign: CampaignDetail
  loading?: boolean
}

type DetailState = {
  coverId?: string | null
  loading: boolean
  warning: string | null
  error: any
} & CampaignDetail

class CampaignEditor extends React.Component<DetailProps, DetailState> {
  state = {
    ...this.props.campaign,
    coverId: null,
    loading: false,
    warning: null,
    error: null,
  }

  private action = async (putCampaign: any): Promise<any> => {
    if (!putCampaign) {
      return
    }

    this.setState((prev) => ({
      ...prev,
      loading: true,
      warning: null,
      error: null,
    }))

    try {
      const {
        id,
        name,
        cover,
        description,
        writingPeriod,
        applicationPeriod,
        coverId,
        link,
      } = this.state
      const result = await putCampaign({
        variables: {
          input: {
            id,
            name,
            cover: coverId,
            description,
            link,
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
      this.setState(
        (prev) => ({ ...prev, loading: false, error }),
        () => {
          message.error('儲存失敗')
        }
      )
    }
  }

  public render() {
    const {
      id,
      name,
      cover,
      coverId,
      description,
      link,
      applicationPeriod,
      writingPeriod,
      stages,
      loading,
    } = this.state

    return (
      <Mutation mutation={PUT_CAMPAIGN}>
        {(putCampaign: any) => (
          <>
            <Section title="標題" col={1}>
              <Section.Description term="繁體">
                <Input
                  value={name}
                  onChange={(e) => {
                    this.setState({ name: e.target.value })
                  }}
                />
              </Section.Description>
              <Section.Description term="英文">
                <Input
                  value={name}
                  onChange={(e) => {
                    this.setState({ name: e.target.value })
                  }}
                />
              </Section.Description>
              <Section.Description term="簡體">
                <Input
                  value={name}
                  onChange={(e) => {
                    this.setState({ name: e.target.value })
                  }}
                />
              </Section.Description>
            </Section>
            <Divider size="large" />

            <Section title="簡介" col={1}>
              <Section.Description term="繁體">
                <Input.TextArea
                  value={description}
                  autoSize={{ minRows: 5 }}
                  style={{ verticalAlign: 'middle' }}
                  onChange={(e) => {
                    // TODO: replace /n to <br>
                    this.setState({ description: e.target.value })
                  }}
                />
              </Section.Description>
              <Section.Description term="英文">
                <Input.TextArea
                  value={description}
                  autoSize={{ minRows: 5 }}
                  style={{ verticalAlign: 'middle' }}
                  onChange={(e) => {
                    // TODO: replace /n to <br>
                    this.setState({ description: e.target.value })
                  }}
                />
              </Section.Description>
              <Section.Description term="簡體">
                <Input.TextArea
                  value={description}
                  autoSize={{ minRows: 5 }}
                  style={{ verticalAlign: 'middle' }}
                  onChange={(e) => {
                    // TODO: replace /n to <br>
                    this.setState({ description: e.target.value })
                  }}
                />
              </Section.Description>
            </Section>
            <Divider size="large" />

            <Section title="封面圖片">
              <Section.Description term="" style={{ width: '50%' }}>
                <Uploader
                  campaignId={id}
                  cover={cover}
                  onSuccess={({ id, path }: { id: string; path: string }) => {
                    this.setState({ cover: path, coverId: id })
                  }}
                />
              </Section.Description>
            </Section>
            <Divider size="large" />

            <Section title="活動公告連結">
              <Section.Description term="">
                <Input
                  value={link}
                  onChange={(e) => {
                    this.setState({ link: e.target.value })
                  }}
                />
              </Section.Description>
            </Section>
            <Divider size="large" />

            <Section title="報名期" col={2}>
              <Section.Description term="開始">
                <DatePicker
                  value={applicationPeriod?.start}
                  onChange={(date, dateStr) => {
                    this.setState({
                      applicationPeriod: {
                        ...applicationPeriod,
                        start: dateStr,
                      },
                    })
                  }}
                />
              </Section.Description>
              <Section.Description term="結束">
                <DatePicker
                  value={applicationPeriod?.end}
                  onChange={(date, dateStr) => {
                    this.setState({
                      applicationPeriod: {
                        ...applicationPeriod,
                        end: dateStr,
                      },
                    })
                  }}
                />
              </Section.Description>
            </Section>
            <Divider size="large" />

            <Section title="活動期" col={2}>
              <Section.Description term="開始">
                <DatePicker
                  value={writingPeriod?.start}
                  onChange={(date, dateStr) => {
                    this.setState({
                      writingPeriod: {
                        ...writingPeriod,
                        start: dateStr,
                      },
                    })
                  }}
                />
              </Section.Description>

              <Section.Description term="結束">
                <DatePicker
                  value={writingPeriod?.end}
                  onChange={(date, dateStr) => {
                    this.setState({
                      writingPeriod: {
                        ...writingPeriod,
                        end: dateStr,
                      },
                    })
                  }}
                />
              </Section.Description>
            </Section>
            <Divider size="large" />

            <Section title="">
              <Section.Description term="">
                <Button
                  type="primary"
                  onClick={() => this.action(putCampaign)}
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

export default CampaignEditor
