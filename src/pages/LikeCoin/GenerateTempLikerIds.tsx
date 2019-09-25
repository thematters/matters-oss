import * as React from 'react'
import {
  Progress,
  InputNumber,
  Form,
  Button,
  message,
  Result,
  Spin
} from 'antd'
import { Mutation, Query, QueryResult, MutationResult } from 'react-apollo'
import gql from 'graphql-tag'
import _get from 'lodash/get'

import ErrorMessage from '../../components/ErrorMessage'

const USER_COUNTS = gql`
  query UserCounts {
    oss {
      users(input: { first: 0 }) {
        totalCount
      }
      noLikerIdCount
    }
  }
`

const GENERATE_TEMP_LIKER_IDS = gql`
  mutation GenerateTempLikerIds($input: GenerateTempLikerIdsInput!) {
    generateTempLikerIds(input: $input)
  }
`

const GenerateTempLikerIds = () => {
  return (
    <section style={{ padding: '1rem' }}>
      <h2>生成 Temp Liker IDs</h2>

      <Query query={USER_COUNTS}>
        {({ data, loading }: QueryResult) => {
          if (loading) {
            return (
              <div className="c-box" style={{ textAlign: 'center' }}>
                <Spin />
              </div>
            )
          }

          const totalUserCount = _get(data, 'oss.users.totalCount')
          let noLikerIdCount = _get(data, 'oss.noLikerIdCount')

          if (!totalUserCount || !noLikerIdCount) {
            message.warning('無法獲取當前用戶數')
          }

          return (
            <Mutation mutation={GENERATE_TEMP_LIKER_IDS}>
              {(generate: any, result: MutationResult) => {
                return (
                  <GenerateForm
                    totalUserCount={totalUserCount}
                    noLikerIdCount={noLikerIdCount}
                    generate={generate}
                    {...result}
                  />
                )
              }}
            </Mutation>
          )
        }}
      </Query>
    </section>
  )
}

const GenerateForm = ({
  totalUserCount,
  noLikerIdCount: initNoLikerIdCount,
  generate,
  error,
  data
}: {
  totalUserCount: number
  noLikerIdCount: number
  generate: (params: any) => void
} & MutationResult) => {
  const [step, setStep] = React.useState(1)
  const [stopped, setStopped] = React.useState(true)
  const [generating, setGenerating] = React.useState(false)
  const [noLikerIdCount, setNoLikerIdCount] = React.useState(initNoLikerIdCount)
  const startGenerate = async () => {
    try {
      setGenerating(true)
      const res = await generate({
        variables: { input: { step } }
      })
      const newNoLikerIdCount = _get(res, 'data.generateTempLikerIds')

      if (newNoLikerIdCount) {
        setNoLikerIdCount(newNoLikerIdCount)
      }

      setGenerating(false)
    } catch (e) {
      setGenerating(false)
    }
  }
  const noLikerIdRate = parseInt(
    ((noLikerIdCount / totalUserCount) * 100).toFixed(2),
    10
  )
  const ResultTitle = () => {
    return (
      <span style={{ fontSize: '1rem' }}>
        <b>{noLikerIdCount}</b>
        <small>（無 LikerId）</small>
        <span> / </span>
        <b>{totalUserCount}</b>
      </span>
    )
  }

  React.useEffect(() => {
    if (!generating && !stopped) {
      startGenerate()
    }
  })

  if (error) {
    return <ErrorMessage error={error} />
  }

  return (
    <div className="c-box">
      <Result
        status="info"
        icon={<Progress type="circle" percent={noLikerIdRate} />}
        title={<ResultTitle />}
        extra={
          <Form layout="inline">
            <Form.Item>
              <InputNumber
                type="number"
                max={50}
                min={1}
                value={step}
                disabled={generating}
                onChange={value => {
                  if (value) {
                    setStep(value)
                  }
                }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                loading={generating}
                disabled={generating}
                onClick={() => {
                  setStopped(false)
                }}
              >
                {!generating ? 'Generate' : 'Generating'}
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="danger"
                disabled={!generating}
                loading={generating && stopped}
                onClick={() => {
                  setStopped(true)
                }}
              >
                Stop
              </Button>
            </Form.Item>
          </Form>
        }
      />
    </div>
  )
}

export default GenerateTempLikerIds
