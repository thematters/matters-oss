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
      noPendingLIKECount
    }
  }
`

const TRANSFER_LIKE = gql`
  mutation TransferLIKE($input: TransferLIKEInput!) {
    transferLIKE(input: $input)
  }
`

const TransferLIKE = () => {
  return (
    <section style={{ padding: '1rem' }}>
      <h2>遷移 MAT 到 pending LIKE</h2>

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
          let noPendingLIKECount = _get(data, 'oss.noPendingLIKECount')

          if (!totalUserCount || !noPendingLIKECount) {
            message.warning('無法獲取當前用戶數')
          }

          return (
            <Mutation mutation={TRANSFER_LIKE}>
              {(transfer: any, result: MutationResult) => {
                return (
                  <TransferForm
                    totalUserCount={totalUserCount}
                    noPendingLIKECount={noPendingLIKECount}
                    transfer={transfer}
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

const TransferForm = ({
  totalUserCount,
  noPendingLIKECount: initNoPendingLIKECountCount,
  transfer,
  error,
  data
}: {
  totalUserCount: number
  noPendingLIKECount: number
  transfer: (params: any) => void
} & MutationResult) => {
  const [step, setStep] = React.useState(1)
  const [stopped, setStopped] = React.useState(true)
  const [transfering, setTransfering] = React.useState(false)
  const [noPendingLIKECount, setNoPendingLIKECount] = React.useState(
    initNoPendingLIKECountCount
  )
  const startTransfer = async () => {
    try {
      setTransfering(true)
      const res = await transfer({
        variables: { input: { step } }
      })
      const newNoPendingLIKECount = _get(res, 'data.transferLIKE')

      if (newNoPendingLIKECount) {
        setNoPendingLIKECount(newNoPendingLIKECount)
      }

      setTransfering(false)
    } catch (e) {
      setTransfering(false)
    }
  }
  const noPendingLIKERate = parseInt(
    ((noPendingLIKECount / totalUserCount) * 100).toFixed(2),
    10
  )
  const ResultTitle = () => {
    return (
      <span style={{ fontSize: '1rem' }}>
        <b>{noPendingLIKECount}</b>
        <small>（無 pending LIKE）</small>
        <span> / </span>
        <b>{totalUserCount}</b>
      </span>
    )
  }

  React.useEffect(() => {
    if (!transfering && !stopped && !error) {
      startTransfer()
    }
  })

  if (error) {
    return <ErrorMessage error={error} />
  }

  return (
    <div className="c-box">
      <Result
        status="info"
        icon={<Progress type="circle" percent={noPendingLIKERate} />}
        title={<ResultTitle />}
        extra={
          <Form layout="inline">
            <Form.Item>
              <InputNumber
                type="number"
                max={50}
                min={1}
                value={step}
                disabled={transfering}
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
                loading={transfering}
                disabled={transfering}
                onClick={() => {
                  setStopped(false)
                }}
              >
                {!transfering ? 'Transfer' : 'Transfering'}
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="danger"
                disabled={!transfering}
                loading={transfering && stopped}
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

export default TransferLIKE
