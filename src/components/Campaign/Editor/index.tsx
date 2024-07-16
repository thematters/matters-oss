import * as React from 'react'
import { Mutation } from 'react-apollo'
import { Button, DatePicker, Input, message } from 'antd'
import gql from 'graphql-tag'
import moment from 'moment'

import Uploader from './Uploader'
import Section from '../../../components/DescriptionList'
import Divider from '../../../components/Divider'
import { CampaignDetail } from '../../../definitions'
import { PATH } from '../../../constants'

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

const normalizeDescription = (description: string) => {
  // remove leading and trailing <p></p>
  description = description.replace(/^(<p>(<br class=\"smart\">)?<\/p>)+/, '')
  description = description.replace(/(<p>(<br class=\"smart\">)?<\/p>)+$/, '')

  // replace </p><p> or <br class=\"smart\"> with \n
  description = description.replace(/<\/p>/g, '\n')
  description = description.replace(/<p><br class=\"smart\"><\/p>/g, '\n')

  // remove HTML tags
  description = description.replace(/<[^>]*>/g, '')

  // remove trailing \n
  description = description.replace(/\n+$/, '')

  return description
}

const serializeDescription = (description: string) => {
  description = description
    .trim()
    .split('\n')
    .map((line) => `<p>${line.trim()}</p>`)
    .join('')

  // replace <p></p> with <br>
  description = description.replace(/<p><\/p>/g, '<p><br class="smart"></p>')

  return description
}

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
        nameEn,
        nameZhHans,
        description,
        descriptionEn,
        descriptionZhHans,
        writingPeriod,
        applicationPeriod,
        coverId,
        link,
      } = this.state

      await putCampaign({
        variables: {
          input: {
            id,
            name: [
              {
                language: 'zh_hant',
                text: name,
              },
              {
                language: 'en',
                text: nameEn,
              },
              {
                language: 'zh_hans',
                text: nameZhHans,
              },
            ],
            cover: coverId,
            applicationPeriod,
            writingPeriod,
            description: [
              {
                language: 'zh_hant',
                text: serializeDescription(normalizeDescription(description)),
              },
              {
                language: 'en',
                text: serializeDescription(normalizeDescription(descriptionEn)),
              },
              {
                language: 'zh_hans',
                text: serializeDescription(
                  normalizeDescription(descriptionZhHans)
                ),
              },
            ],
            link,
          },
        },
      })

      this.setState(
        (prev) => ({ ...prev, loading: false, error: null }),
        () => {
          message.success('儲存成功')
          window.location.href = PATH.CAMPAIGN_DETAIL.replace(
            ':id',
            this.state.shortHash
          )
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
      nameEn,
      nameZhHans,
      cover,
      description,
      descriptionEn,
      descriptionZhHans,
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
                  value={nameEn}
                  onChange={(e) => {
                    this.setState({ nameEn: e.target.value })
                  }}
                />
              </Section.Description>
              <Section.Description term="簡體">
                <Input
                  value={nameZhHans}
                  onChange={(e) => {
                    this.setState({ nameZhHans: e.target.value })
                  }}
                />
              </Section.Description>
            </Section>
            <Divider size="large" />

            <Section title="簡介" col={1}>
              <Section.Description term="繁體">
                <Input.TextArea
                  value={normalizeDescription(description)}
                  autoSize={{ minRows: 5 }}
                  style={{ verticalAlign: 'middle' }}
                  onChange={(e) => {
                    this.setState({
                      description: e.target.value,
                    })
                  }}
                />
              </Section.Description>
              <Section.Description term="英文">
                <Input.TextArea
                  value={normalizeDescription(descriptionEn)}
                  autoSize={{ minRows: 5 }}
                  style={{ verticalAlign: 'middle' }}
                  onChange={(e) => {
                    this.setState({
                      descriptionEn: e.target.value,
                    })
                  }}
                />
              </Section.Description>
              <Section.Description term="簡體">
                <Input.TextArea
                  value={normalizeDescription(descriptionZhHans)}
                  autoSize={{ minRows: 5 }}
                  style={{ verticalAlign: 'middle' }}
                  onChange={(e) => {
                    this.setState({
                      descriptionZhHans: e.target.value,
                    })
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
                  value={
                    moment(applicationPeriod?.start, 'YYYY-MM-DD') || undefined
                  }
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
                  value={
                    moment(applicationPeriod?.end, 'YYYY-MM-DD') || undefined
                  }
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
                  value={
                    moment(writingPeriod?.start, 'YYYY-MM-DD') || undefined
                  }
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
                  value={
                    moment(applicationPeriod?.end, 'YYYY-MM-DD') || undefined
                  }
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
