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

function convertToUTC8(dateString: string) {
  if (!dateString) {
    return null
  }

  // remove HH:mm part
  dateString = dateString.replace(/ \d{2}:\d{2}$/, '')

  // Parse the date string and create a Date object in local time
  const date = new Date(dateString)

  // Get the time in UTC+8 by subtracting 8 hours (8 * 60 * 60 * 1000 milliseconds)
  const utc8Date = new Date(date.getTime() - 8 * 60 * 60 * 1000)

  // Convert the date to ISO 8601 format
  const isoString = utc8Date.toISOString()

  console.log({ dateString, isoString })
  return isoString
}

function toDisplayDate(dateString: string) {
  const tzOffsetFromLocal = new Date().getTimezoneOffset() / 60
  const tzOffsetFromUTC8 = -8 // Asia/Hong_Kong

  console.log({
    dateString,
    m: moment(dateString).add(tzOffsetFromLocal - tzOffsetFromUTC8, 'hours'),
  })

  return moment(dateString).add(tzOffsetFromLocal - tzOffsetFromUTC8, 'hours')
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
        state,
        coverId,
        link,
        stages,
      } = this.state

      const isPending = state === 'pending'

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
            ].filter(({ text }) => !!text),
            cover: coverId,
            ...(applicationPeriod?.start
              ? {
                  applicationPeriod: {
                    start: applicationPeriod.start,
                    end: applicationPeriod.end || null,
                  },
                }
              : {}),
            ...(writingPeriod?.start
              ? {
                  writingPeriod: {
                    start: writingPeriod.start,
                    end: writingPeriod.end || null,
                  },
                }
              : {}),
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
            ].filter(({ text }) => !!text),
            link,
            ...(isPending
              ? {
                  stages: stages.map((stage) => ({
                    name: [
                      { language: 'zh_hant', text: stage.name },
                      { language: 'en', text: stage.nameEn },
                      { language: 'zh_hans', text: stage.nameZhHans },
                    ].filter(({ text }) => !!text),
                    ...(stage.period?.start
                      ? {
                          period: {
                            start: stage.period.start,
                            end: stage.period.end || null,
                          },
                        }
                      : {}),
                  })),
                }
              : {}),
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
      console.error(error)
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
      state,
      loading,
    } = this.state

    const isPending = state === 'pending'

    return (
      <Mutation mutation={PUT_CAMPAIGN}>
        {(putCampaign: any) => (
          <>
            <Section title="標題" col={1}>
              <Section.Description term="繁體">
                <Input
                  defaultValue={name}
                  onChange={(e) => {
                    this.setState({ name: e.target.value })
                  }}
                />
              </Section.Description>
              <Section.Description term="英文">
                <Input
                  defaultValue={nameEn}
                  onChange={(e) => {
                    this.setState({ nameEn: e.target.value })
                  }}
                />
              </Section.Description>
              <Section.Description term="簡體">
                <Input
                  defaultValue={nameZhHans}
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
                  defaultValue={normalizeDescription(description)}
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
                  defaultValue={normalizeDescription(descriptionEn)}
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
                  defaultValue={normalizeDescription(descriptionZhHans)}
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
                  defaultValue={link}
                  onChange={(e) => {
                    this.setState({ link: e.target.value })
                  }}
                />
              </Section.Description>
            </Section>
            <Divider size="large" />

            <Section title="報名期（東八區）" col={2}>
              <Section.Description term="開始">
                <DatePicker
                  value={
                    applicationPeriod?.start
                      ? toDisplayDate(applicationPeriod.start)
                      : null
                  }
                  format="YYYY-MM-DD HH:mm"
                  onChange={(_, dateStr) => {
                    this.setState({
                      applicationPeriod: {
                        ...applicationPeriod,
                        start: convertToUTC8(dateStr),
                      },
                    })
                  }}
                />
              </Section.Description>
              <Section.Description term="結束">
                <DatePicker
                  value={
                    applicationPeriod?.end
                      ? toDisplayDate(applicationPeriod.end)
                      : null
                  }
                  format="YYYY-MM-DD HH:mm"
                  onChange={(_, dateStr) => {
                    this.setState({
                      applicationPeriod: {
                        ...applicationPeriod,
                        end: convertToUTC8(dateStr),
                      },
                    })
                  }}
                />
              </Section.Description>
            </Section>
            <Divider size="large" />

            <Section title="活動期（東八區）" col={2}>
              <Section.Description term="開始">
                <DatePicker
                  value={
                    writingPeriod?.start
                      ? toDisplayDate(writingPeriod.start)
                      : null
                  }
                  format="YYYY-MM-DD HH:mm"
                  onChange={(_, dateStr) => {
                    this.setState({
                      writingPeriod: {
                        ...writingPeriod,
                        start: convertToUTC8(dateStr),
                      },
                    })
                  }}
                />
              </Section.Description>

              <Section.Description term="結束">
                <DatePicker
                  value={
                    writingPeriod?.end ? toDisplayDate(writingPeriod.end) : null
                  }
                  format="YYYY-MM-DD HH:mm"
                  onChange={(_, dateStr) => {
                    this.setState({
                      writingPeriod: {
                        ...writingPeriod,
                        end: convertToUTC8(dateStr),
                      },
                    })
                  }}
                />
              </Section.Description>
            </Section>
            <Divider size="large" />

            <Section title="投稿選項（上线活動後，投稿選項無法修改）" col={1}>
              {stages.map((stage, index) => (
                <section>
                  <Section.Description term="名稱">
                    <Input
                      disabled={!isPending}
                      defaultValue={stage.name}
                      onChange={(e) => {
                        this.setState({
                          stages: [
                            ...stages.slice(0, index),
                            {
                              ...stage,
                              name: e.target.value,
                            },
                            ...stages.slice(index + 1),
                          ],
                        })
                      }}
                    />
                  </Section.Description>

                  <Section.Description term="名稱（英文）">
                    <Input
                      disabled={!isPending}
                      defaultValue={stage.nameEn}
                      onChange={(e) => {
                        this.setState({
                          stages: [
                            ...stages.slice(0, index),
                            {
                              ...stage,
                              nameEn: e.target.value,
                            },
                            ...stages.slice(index + 1),
                          ],
                        })
                      }}
                    />
                  </Section.Description>

                  <Section.Description term="名稱（簡體）">
                    <Input
                      disabled={!isPending}
                      defaultValue={stage.nameZhHans}
                      onChange={(e) => {
                        this.setState({
                          stages: [
                            ...stages.slice(0, index),
                            {
                              ...stage,
                              nameZhHans: e.target.value,
                            },
                            ...stages.slice(index + 1),
                          ],
                        })
                      }}
                    />
                  </Section.Description>

                  <Section.Description term="開始">
                    <DatePicker
                      disabled={!isPending}
                      value={
                        stage?.period?.start
                          ? toDisplayDate(stage.period.start)
                          : null
                      }
                      format="YYYY-MM-DD HH:mm"
                      onChange={(_, dateStr) => {
                        this.setState({
                          stages: [
                            ...stages.slice(0, index),
                            {
                              ...stage,
                              period: {
                                ...stage.period,
                                start: convertToUTC8(dateStr),
                              },
                            },
                            ...stages.slice(index + 1),
                          ],
                        })
                      }}
                    />
                  </Section.Description>

                  <Section.Description term="結束">
                    <DatePicker
                      disabled={!isPending}
                      value={
                        stage?.period?.end
                          ? toDisplayDate(stage.period.end)
                          : null
                      }
                      format="YYYY-MM-DD HH:mm"
                      onChange={(_, dateStr) => {
                        this.setState({
                          stages: [
                            ...stages.slice(0, index),
                            {
                              ...stage,
                              period: {
                                ...stage.period,
                                start: stage.period?.start,
                                end: convertToUTC8(dateStr),
                              },
                            },
                            ...stages.slice(index + 1),
                          ],
                        })
                      }}
                    />
                  </Section.Description>

                  <Section.Description term="">
                    <Button
                      disabled={!isPending}
                      type="danger"
                      onClick={() => {
                        this.setState({
                          stages: stages.filter((_, i) => i !== index),
                        })
                      }}
                    >
                      刪除
                    </Button>
                  </Section.Description>

                  <Divider size="default" />
                </section>
              ))}

              <section>
                <Section.Description term="">
                  <Button
                    disabled={!isPending}
                    onClick={() => {
                      this.setState({
                        stages: stages.concat({
                          name: '',
                          nameEn: '',
                          nameZhHans: '',
                          period: {
                            start: '',
                            end: '',
                          },
                        }),
                      })
                    }}
                  >
                    新增
                  </Button>
                </Section.Description>
              </section>
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
