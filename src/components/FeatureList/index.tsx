import * as React from 'react'
import { Table, Tooltip } from 'antd'
import _compact from 'lodash/compact'

import { FeatureFlagItem, FeatureName } from '../../definitions'
import SetFeature from './SetFeature'
import { FlagTag } from './FlagTag'
import { LevelColorMap, LevelEnum } from '../LevelTag'

type FeatureListProps = {
  data: FeatureFlagItem[]
  loading?: boolean
}

const nameMap = {
  verify_appreciate: '讚賞保護',
  payout: '提現',
  add_credit: '充值',
  payment: '支付',
}

const explanationMap = {
  verify_appreciate:
    '通過ReCaptcha限制讚賞只能在網站上手動進行，不允許用戶通過腳本觸發。',
  payout: '用戶可以在滿足條件時從法幣錢包裡提現。',
  add_credit: '用戶可以向法幣錢包中充值。',
  payment: '用戶可以向另一個用戶支付法幣，目前僅有文章的「支持作者」按鈕。',
}

class FeatureList extends React.Component<FeatureListProps> {
  public render() {
    const { data, loading = false } = this.props

    return (
      <>
        <Table<FeatureFlagItem>
          bordered
          loading={loading}
          dataSource={_compact(data)}
          // scroll={{ x: 1200, y: '70vh' }}
          rowKey={(_, i) => `${i}`}
          pagination={false}
        >
          <Table.Column<FeatureFlagItem>
            dataIndex="enabled"
            title={() => (
              <Tooltip
                title={() => (
                  <span>
                    表示該功能對當前用戶是否可用，如果不確定該功能目前是
                    <FlagTag flag="on" />
                    還是
                    <FlagTag flag="admin" />
                    ，可進行重複修改。
                  </span>
                )}
              >
                狀態
              </Tooltip>
            )}
            width={54}
            render={(enabled) => ({
              props: {
                style: {
                  background: enabled
                    ? LevelColorMap[LevelEnum.SUCCESS]
                    : LevelColorMap[LevelEnum.ERROR],
                },
              },
            })}
          />
          <Table.Column<FeatureFlagItem>
            dataIndex="name"
            title="名稱"
            render={(name: FeatureName) => nameMap[name]}
          />
          <Table.Column<FeatureFlagItem>
            dataIndex="name"
            title="解釋"
            key="explanation"
            render={(name: FeatureName) => explanationMap[name]}
          />

          <Table.Column<FeatureFlagItem>
            dataIndex="name"
            title="修改"
            key="update"
            render={(name: FeatureName, record) => (
              <SetFeature name={name} enabled={record.enabled} />
            )}
          />
        </Table>
      </>
    )
  }
}

export default FeatureList
