import * as React from 'react'
import { Mutation } from 'react-apollo'
import { Button, Input, message } from 'antd'
import gql from 'graphql-tag'

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

function convertToUTC8(dateString: string) {
  if (!dateString) {
    return null
  }

  // Parse the date string and create a Date object in local time
  const date = new Date(dateString)

  // Get the time in UTC+8 by subtracting 8 hours (8 * 60 * 60 * 1000 milliseconds)
  const utc8Date = new Date(date.getTime() - 8 * 60 * 60 * 1000)

  // Convert the date to ISO 8601 format
  const isoString = utc8Date.toISOString()

  return isoString
}

function getUTC8Date(dateString: string) {
  // Parse the input date string to a Date object
  let date = new Date(dateString)

  // Convert the date to UTC time by adding the timezone offset and UTC+8 hours
  let utc8Offset = 8 * 60 // UTC+8 in minutes
  let localOffset = date.getTimezoneOffset() // Local timezone offset in minutes
  let offsetDifference = utc8Offset - localOffset
  date.setMinutes(date.getMinutes() + offsetDifference)

  // Get the day, month, and year from the adjusted date
  let day = (date.getUTCDate() + '').padStart(2, '0')
  let month = (date.getUTCMonth() + 1 + '').padStart(2, '0')
  let year = date.getUTCFullYear()

  return `${year}-${month}-${day}`
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

            <Section title="活動公告連結" col={2}>
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

            <Section title="報名期（東八區）" col={2}>
              <Section.Description term="開始">
                <Input
                  defaultValue={
                    applicationPeriod?.start
                      ? getUTC8Date(applicationPeriod.start)
                      : ''
                  }
                  onChange={(e) => {
                    try {
                      this.setState({
                        applicationPeriod: {
                          ...applicationPeriod,
                          start: convertToUTC8(e.target.value),
                        },
                      })
                    } catch (e) {
                      message.error('日期格式錯誤')
                    }
                  }}
                />
              </Section.Description>
              <Section.Description term="結束">
                <Input
                  defaultValue={
                    applicationPeriod?.end
                      ? getUTC8Date(applicationPeriod.end)
                      : ''
                  }
                  onChange={(e) => {
                    try {
                      this.setState({
                        applicationPeriod: {
                          ...applicationPeriod,
                          end: convertToUTC8(e.target.value),
                        },
                      })
                    } catch (e) {
                      message.error('日期格式錯誤')
                    }
                  }}
                />
              </Section.Description>
            </Section>
            <Divider size="large" />

            <Section title="活動期（東八區）" col={2}>
              <Section.Description term="開始">
                <Input
                  defaultValue={
                    writingPeriod?.start ? getUTC8Date(writingPeriod.start) : ''
                  }
                  onChange={(e) => {
                    try {
                      this.setState({
                        writingPeriod: {
                          ...writingPeriod,
                          start: convertToUTC8(e.target.value),
                        },
                      })
                    } catch (e) {
                      message.error('日期格式錯誤')
                    }
                  }}
                />
              </Section.Description>

              <Section.Description term="結束">
                <Input
                  defaultValue={
                    writingPeriod?.end ? getUTC8Date(writingPeriod.end) : ''
                  }
                  onChange={(e) => {
                    try {
                      this.setState({
                        writingPeriod: {
                          ...writingPeriod,
                          end: convertToUTC8(e.target.value),
                        },
                      })
                    } catch (e) {
                      message.error('日期格式錯誤')
                    }
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
