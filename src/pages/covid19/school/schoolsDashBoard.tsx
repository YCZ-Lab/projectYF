import { Card, Col, Row } from 'antd';
import React, { Component, Suspense } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { FormattedMessage } from 'umi';
import PageLoading from './components/PageLoading';
import styles from './style.less';

const GoogleMap = React.lazy(() => import('./components/GoogleMap'));
const BCSchoolsCOVID19TotalSummary = React.lazy(
  () => import('./components/BCSchoolsCOVID19TotalSummary'),
);
const BCSchoolsDistrictsHealthsSummary = React.lazy(
  () => import('./components/BCSchoolsDistrictsHealthsSummary'),
);
const BCSchoolsCOVID19 = React.lazy(() => import('./components/BCSchoolsCOVID19'));
const BCSchoolsCOVID19MonthlySummary = React.lazy(
  () => import('./components/BCSchoolsCOVID19MonthlySummary'),
);

// 所有的数据接口定义, 任务定义
interface DashboardAnalysisProps {
  loading: boolean;
}

class DashboardAnalysis extends Component<DashboardAnalysisProps> {
  reqRef: number = 0;

  timeoutId: number = 0;

  // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 组件是否安装
  componentDidMount() {}

  // 组件将被卸载
  componentWillUnmount() {}

  render() {
    const { loading } = this.props;

    return (
      <GridContent>
        <React.Fragment>
          {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          <Row gutter={24}>
            <Col xl={16} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={<PageLoading />}>
                <Card
                  bordered={false}
                  title={
                    <FormattedMessage
                      id="bc-covid19-summary"
                      defaultMessage="last 14 days COVID19 Summary"
                    />
                  }
                >
                  <div className={styles.mapChart}>
                    <GoogleMap />
                  </div>
                </Card>
              </Suspense>
            </Col>
            <Col xl={8} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={<PageLoading />}>
                <BCSchoolsCOVID19TotalSummary loading={loading} />
              </Suspense>
              <Suspense fallback={<PageLoading />}>
                <BCSchoolsCOVID19MonthlySummary loading={loading} />
              </Suspense>
            </Col>
          </Row>
          {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          <Row gutter={24} style={{ marginTop: 24 }}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={<PageLoading />}>
                <BCSchoolsDistrictsHealthsSummary loading={loading} />
              </Suspense>
            </Col>
          </Row>
          {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          <Row gutter={24} style={{ marginTop: 24 }}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Suspense fallback={<PageLoading />}>
                <BCSchoolsCOVID19 loading={loading} />
              </Suspense>
            </Col>
          </Row>
        </React.Fragment>
      </GridContent>
    );
  }
}

export default DashboardAnalysis;
