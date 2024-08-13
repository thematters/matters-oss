import * as React from 'react'
import { Table, Tooltip } from 'antd'
import _compact from 'lodash/compact'

import { FeatureFlagItem, FeatureName } from '../../definitions'
import SetFeature from './SetFeature'
import SetFeatureValue from './SetFeatureValue'
import { FlagTag } from './FlagTag'
import { LevelColorMap, LevelEnum } from '../LevelTag'
import { nameMap, explanationMap } from './text'

type FeatureListProps = {
  data: FeatureFlagItem[]
  loading?: boolean
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
              <SetFeature
                name={name}
                enabled={record.enabled}
                value={record.value}
              />
            )}
          />

          <Table.Column<FeatureFlagItem>
            dataIndex="name"
            title="值"
            key="value"
            render={(name: FeatureName, record) =>
              name === 'spam_detection' ? (
                <SetFeatureValue
                  name={name}
                  enabled={record.enabled}
                  value={record.value}
                />
              ) : (
                '不適用'
              )
            }
          />
        </Table>
      </>
    )
  }
}

export default FeatureList
