import { Card, Radio } from 'antd';

import { FormattedMessage } from 'umi';
import type { RadioChangeEvent } from 'antd/es/radio';
import React from 'react';
import type { VisitDataType } from '../data.d';
import { Pie } from './Charts1';
import Yuan from '../utils/Yuan';
import styles from '../style.less';

const ProportionSales = ({
  loading,
  // dropdownGroup,
  salesType,
  salesPieData,
  handleChangeSalesType,
}: {
  loading: boolean;
  // dropdownGroup: React.ReactNode;
  salesType: 'all' | 'online' | 'stores';
  salesPieData: VisitDataType[];
  handleChangeSalesType?: (e: RadioChangeEvent) => void;
}) => {
  return (
    <Card
      loading={loading}
      className={styles.salesCard}
      bordered={false}
      title={
        <FormattedMessage
          id="dashboardanalysis.analysis.the-proportion-of-sales"
          defaultMessage="The Proportion of Sales"
        />
      }
      style={{
        height: '340px',
      }}
      extra={
        <div className={styles.salesCardExtra}>
          {/* {dropdownGroup} */}
          <div className={styles.salesTypeRadio}>
            <Radio.Group value={salesType} onChange={handleChangeSalesType}>
              <Radio.Button value="all">
                <FormattedMessage id="dashboardanalysis.channel.all" defaultMessage="ALL" />
              </Radio.Button>
              <Radio.Button value="online">
                <FormattedMessage id="dashboardanalysis.channel.online" defaultMessage="Online" />
              </Radio.Button>
              <Radio.Button value="stores">
                <FormattedMessage id="dashboardanalysis.channel.stores" defaultMessage="Stores" />
              </Radio.Button>
            </Radio.Group>
          </div>
        </div>
      }
    >
      <div>
        {/* <h4 style={{ marginTop: 8, marginBottom: 32 }}> */}
        {/*  <FormattedMessage id="dashboardanalysis.analysis.sales" defaultMessage="Sales" /> */}
        {/* </h4> */}
        <Pie
          hasLegend
          subTitle={
            <FormattedMessage id="dashboardanalysis.analysis.sales" defaultMessage="Sales" />
          }
          total={() => <Yuan>{salesPieData.reduce((pre, now) => now.y + pre, 0)}</Yuan>}
          data={salesPieData}
          valueFormat={(value) => <Yuan>{value}</Yuan>}
          height={248}
          lineWidth={4}
        />
      </div>
    </Card>
  );
};

// ProportionSales.defaultProps = {
//   salesType: 'onlineYYY',
// }
//
// ProportionSales.propTypes = {
//   salesType: Number,
// }

export default ProportionSales;
