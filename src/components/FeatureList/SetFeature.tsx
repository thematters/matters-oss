import * as React from 'react'
import { Modal, Menu, Dropdown, message } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import _get from 'lodash/get'
import { ModalFuncProps } from 'antd/lib/modal'

import ErrorMessage from '../ErrorMessage'
import { getErrorCodes } from '../../utils'
import QueryFeatureFlag from '../../gql/queries/featureFlag.gql'

import withSetFeature, { ChildProps, FeatureFlag } from './withSetFeature'
import { nameMap } from './text'
import { EnableTag, FlagTag } from './FlagTag'
import { FeatureFlagItem } from '../../definitions'

type SetFeatureState = {
  flag: FeatureFlag | null
  loading: boolean
  error: any
}

const FEATURE_FLAGS: { flag: FeatureFlag; text: string }[] = [
  { flag: 'on', text: '打開' },
  { flag: 'seeding', text: '內測種子用戶可用' },
  { flag: 'admin', text: '管理員可用' },
  { flag: 'off', text: '關閉' },
]

class SetFeature extends React.Component<ChildProps, SetFeatureState> {
  state: Readonly<SetFeatureState> = {
    flag: null,
    loading: false,
    error: null,
  }

  private _onSelectFlag = (value: FeatureFlag | null) => {
    if (value) {
      this.setState({ flag: value }, this.preConfirm)
    }
  }

  private _onConfirmChange = async () => {
    this.setState({ loading: true, error: null })

    const { mutate, name, value } = this.props
    const { flag } = this.state

    if (flag) {
      try {
        await mutate({
          variables: {
            input: {
              name,
              flag,
              value,
            },
          },
          update: (cache, { data }) => {
            const newFeature = _get(data, 'setFeature', {})

            const cacheData = cache.readQuery<any>({
              query: QueryFeatureFlag,
            })

            const features = _get(
              cacheData,
              'official.features',
              []
            ).map((feature: FeatureFlagItem) =>
              feature.name === newFeature.name
                ? { ...feature, ...newFeature }
                : feature
            )

            cache.writeQuery({
              query: QueryFeatureFlag,
              data: {
                ...cacheData,
                official: {
                  ...cacheData.official,
                  features,
                },
              },
            })
          },
        })
      } catch (error) {
        const errorCodes = getErrorCodes(error)

        if (errorCodes.indexOf('BAD_USER_INPUT') >= 0) {
          message.error('輸入有誤')
          this.setState({ loading: false })
        } else {
          this.setState({ loading: false, error })
        }
      }
    }
  }

  private preConfirm = () => {
    const { name, enabled } = this.props
    const { flag } = this.state
    if (flag) {
      let modalProps: ModalFuncProps = {
        title: `確認修改功能開關？`,
        content: (
          <div style={{ marginTop: 16 }}>
            <strong>{`${nameMap[name]}`}</strong>
            功能當前&nbsp;
            <EnableTag enable={enabled} />
            ，確認要更新為
            <FlagTag flag={flag} />
            嗎？
          </div>
        ),
      }

      Modal.confirm({
        ...modalProps,
        cancelText: '取消',
        okText: '確認',
        onOk: this._onConfirmChange,
      })
    }
  }

  public render() {
    const { error } = this.state

    if (error) {
      return <ErrorMessage error={error} />
    }

    const menu = () => (
      <Menu
        onClick={({ key }: { key: string }) =>
          this._onSelectFlag(FEATURE_FLAGS[parseInt(key, 10)].flag)
        }
      >
        {FEATURE_FLAGS.map(({ text }, i) => (
          <Menu.Item key={i}>{text}</Menu.Item>
        ))}
      </Menu>
    )

    return (
      <span>
        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
          <DownOutlined />
        </Dropdown>
      </span>
    )
  }
}

export default withSetFeature(SetFeature)
