import type ApolloClient from 'apollo-client'
import * as React from 'react'
import { Mutation } from 'react-apollo'
import { Button, DatePicker, Input, message } from 'antd'
import gql from 'graphql-tag'
import moment from 'moment'

import Uploader from './Uploader'
import Section from '../../../components/DescriptionList'
import Divider from '../../../components/Divider'
import ArticleLink from '../../Article/Link'
import { CampaignDetail, ArticleDigest } from '../../../definitions'
import { PATH, PATH_REGEXP } from '../../../constants'
import QUERY_ARTICLE from '../../../gql/queries/articleId.gql'

const { Search } = Input

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
  announcementInput: string
  loading: boolean
  warning: string | null
  error: any
} & CampaignDetail

function convertToUTC8(dateString: string, endOfDay = false) {
  if (!dateString) {
    return null
  }

  // remove HH:mm part
  dateString = dateString.replace(/ \d{2}:\d{2}$/, '')

  // Parse the date string and create a Date object in local time
  const date = new Date(dateString)

  // Get the time in UTC+8 by subtracting 8 hours (8 * 60 * 60 * 1000 milliseconds)
  let utc8Date = new Date(date.getTime() - 8 * 60 * 60 * 1000)
  if (endOfDay) {
    // Set the time to 23:59:59
    utc8Date = new Date(date.getTime() - 8 * 60 * 60 * 1000 - 1)
  }

  // Convert the date to ISO 8601 format
  const isoString = utc8Date.toISOString()

  return isoString
}

function toDisplayDate(dateString: string) {
  const tzOffsetFromLocal = new Date().getTimezoneOffset() / 60
  const tzOffsetFromUTC8 = -8 // Asia/Hong_Kong

  return moment(dateString).add(tzOffsetFromLocal - tzOffsetFromUTC8, 'hours')
}

class CampaignEditor extends React.Component<DetailProps, DetailState> {
  state = {
    ...this.props.campaign,
    coverId: null,
    announcementInput: '',
    loading: false,
    warning: null,
    error: null,
  }

  private getArticle = async (
    input: string,
    client: ApolloClient<any>
  ): Promise<ArticleDigest | null> => {
    const path = input.split('matters.town')[1]
    if (PATH_REGEXP.articleDetail.test(path)) {
      const mediaHash = path.split('#')[0].split('?')[0].split('-').pop()
      const { data } = await client.query({
        query: QUERY_ARTICLE,
        variables: { input: { mediaHash } },
      })
      return data.article ?? null
    }

    if (PATH_REGEXP.articleDetailShortHash.test(path)) {
      const shortHash = path.split('/a/')[1]
      const { data } = await client.query({
        query: QUERY_ARTICLE,
        variables: { input: { shortHash } },
      })
      return data.article ?? null
    }
    return null
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
        announcements,
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
            link,
            announcements: announcements.map(({ id }) => id),
            ...(isPending
              ? {
                  stages: stages.map((stage) => ({
                    name: [
                      { language: 'zh_hant', text: stage.name },
                      { language: 'en', text: stage.nameEn },
                      { language: 'zh_hans', text: stage.nameZhHans },
                    ].filter(({ text }) => !!text),
                    description: [
                      { language: 'zh_hant', text: stage.description },
                      { language: 'en', text: stage.descriptionEn },
                      { language: 'zh_hans', text: stage.descriptionZhHans },
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
      announcements,
      cover,
      link,
      applicationPeriod,
      writingPeriod,
      stages,
      state,
      loading,
      announcementInput,
    } = this.state

    const isPending = state === 'pending'

    return (
      <Mutation mutation={PUT_CAMPAIGN}>
        {(putCampaign: any, { client }: any) => (
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

            <Section title="活動公告" col={1}>
              <Section.Description term="規則連結">
                <Input
                  defaultValue={link}
                  onChange={(e) => {
                    this.setState({ link: e.target.value })
                  }}
                />
              </Section.Description>

              <Section.Description term="公告文章">
                <ol>
                  {[...announcements].reverse().map((announcement) => (
                    <li key={announcement.id}>
                      <ArticleLink
                        id={announcement.id}
                        title={announcement.title}
                      />
                    </li>
                  ))}
                </ol>
              </Section.Description>
              <Section.Description term="">
                <Search
                  disabled={loading}
                  onChange={(event) =>
                    this.setState({ announcementInput: event.target.value })
                  }
                  onSearch={async () => {
                    const article = await this.getArticle(
                      announcementInput,
                      client
                    )
                    const announcementIds = announcements.map(
                      (announcement) => announcement.id
                    )
                    if (article && !announcementIds.includes(article.id)) {
                      this.setState({
                        announcements: announcements.concat(article),
                        announcementInput: '',
                      })
                    } else {
                      if (!article) {
                        message.error('找不到文章')
                      } else if (
                        announcementIds.includes(article?.id as string)
                      ) {
                        message.error('文章已存在')
                      } else {
                        message.error('添加失敗')
                      }
                    }
                  }}
                  value={announcementInput}
                  maxLength={2048}
                  placeholder="輸入文章連結"
                  size="small"
                  enterButton="添加"
                  key="search"
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
                        end: convertToUTC8(dateStr, true),
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
                        end: convertToUTC8(dateStr, true),
                      },
                    })
                  }}
                />
              </Section.Description>
            </Section>
            <Divider size="large" />

            <Section title="投稿選項（上线活動後，投稿選項無法修改）" col={1}>
              {stages.map((stage, index) => (
                <section key={index}>
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
                  <Section.Description term="簡介">
                    <Input
                      disabled={!isPending}
                      defaultValue={stage.description}
                      onChange={(e) => {
                        this.setState({
                          stages: [
                            ...stages.slice(0, index),
                            {
                              ...stage,
                              description: e.target.value,
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
                  <Section.Description term="簡介（英文）">
                    <Input
                      disabled={!isPending}
                      defaultValue={stage.descriptionEn}
                      onChange={(e) => {
                        this.setState({
                          stages: [
                            ...stages.slice(0, index),
                            {
                              ...stage,
                              descriptionEn: e.target.value,
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
                  <Section.Description term="簡介（簡體）">
                    <Input
                      disabled={!isPending}
                      defaultValue={stage.descriptionZhHans}
                      onChange={(e) => {
                        this.setState({
                          stages: [
                            ...stages.slice(0, index),
                            {
                              ...stage,
                              descriptionZhHans: e.target.value,
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

                  {/* <Section.Description term="結束">
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
                                end: convertToUTC8(dateStr, true),
                              },
                            },
                            ...stages.slice(index + 1),
                          ],
                        })
                      }}
                    />
                  </Section.Description> */}

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
                          description: '',
                          descriptionEn: '',
                          descriptionZhHans: '',
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
