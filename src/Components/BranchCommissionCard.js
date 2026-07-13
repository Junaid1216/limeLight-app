import React from 'react';
import CategoryBreakdownCard from './CategoryBreakdownCard';
import { Strings } from '../Constants/Strings';

const BranchCommissionCard = props => (
  <CategoryBreakdownCard
    title={Strings.myCommission}
    subtitle={Strings.categoryBreakdownSub}
    fetchEnabled={false}
    {...props}
  />
);

export default BranchCommissionCard;
