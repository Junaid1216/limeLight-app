import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { hp, wp } from '../Assets/Responsive';
import { Colors } from '../Constants/Colors';
import {
  staffComparisonFootfallData,
  staffComparisonInvoiceData,
} from '../Constants/DummyData';
import { Fonts } from '../Constants/Fonts';
import { Fontsize } from '../Constants/Fontsize';

const chartWidth = wp(78);
const chartHeight = hp(20);
const chartMaxValue = 250;
const chartData = staffComparisonFootfallData.map((point, index) => ({
  value: point.value,
  label:
    index === 0
      ? '10:00'
      : index === 2
        ? '02:00'
        : index === 4
          ? '06:00'
          : index === 6
            ? '10:00'
            : index === 8
              ? '12:00'
              : '',
  labelComponent: () => {
    const label =
      index === 0
        ? '10:00'
        : index === 2
          ? '02:00'
          : index === 4
            ? '06:00'
            : index === 6
              ? '10:00'
              : index === 8
                ? '12:00'
                : '';

    if (!label) {
      return null;
    }

    return (
      <View
        style={[
          styles.axisLabelContainer,
          index === 0 && styles.firstXAxisLabel,
          index === 8 && styles.lastXAxisLabel,
        ]}
      >
        <Text style={styles.axisText}>{label}</Text>
      </View>
    );
  },
  customData: {
    footfall: point.value,
    invoices: staffComparisonInvoiceData[index]?.value || 0,
    rate:
      point.value > 0
        ? Math.round(((staffComparisonInvoiceData[index]?.value || 0) / point.value) * 100)
        : 0,
  },
}));

const chartData2 = staffComparisonInvoiceData.map(point => ({
  value: point.value,
}));

const getNearestLabelByIndex = (data, index) => {
  if (!data || data.length === 0) {
    return '00:00';
  }

  if (data[index]?.label) {
    return data[index].label;
  }

  for (let leftIndex = index - 1; leftIndex >= 0; leftIndex -= 1) {
    if (data[leftIndex]?.label) {
      return data[leftIndex].label;
    }
  }

  for (let rightIndex = index + 1; rightIndex < data.length; rightIndex += 1) {
    if (data[rightIndex]?.label) {
      return data[rightIndex].label;
    }
  }

  return '00:00';
};

const getPointIndex = (data, selectedPoint) => {
  const providedIndex = selectedPoint?.index ?? selectedPoint?.dataPointIndex;
  if (typeof providedIndex === 'number' && providedIndex >= 0) {
    return providedIndex;
  }

  const resolvedIndex = data.indexOf(selectedPoint);
  return resolvedIndex >= 0 ? resolvedIndex : 0;
};

const getPeakMetrics = data => {
  if (!data || data.length === 0) {
    return { peakRate: 0, peakTime: '00:00' };
  }

  const peakIndex = data.reduce((currentPeakIndex, point, index) => {
    const currentRate = point?.customData?.rate || 0;
    const peakRate = data[currentPeakIndex]?.customData?.rate || 0;
    return currentRate > peakRate ? index : currentPeakIndex;
  }, 0);

  return {
    peakRate: data[peakIndex]?.customData?.rate || 0,
    peakTime: getNearestLabelByIndex(data, peakIndex),
  };
};

const StaffConversionChartCard = ({ labels, fromDate, toDate, formatDate, onPressFrom, onPressTo }) => {
  const peakMetrics = getPeakMetrics(chartData);
  const [activePointerIndex, setActivePointerIndex] = React.useState(null);
  const [isPointerActive, setIsPointerActive] = React.useState(false);
  const activePointerIndexRef = React.useRef(null);

  const headerMetrics =
    !isPointerActive || activePointerIndex === null
      ? peakMetrics
      : {
          peakRate: chartData[activePointerIndex]?.customData?.rate || 0,
          peakTime: getNearestLabelByIndex(chartData, activePointerIndex),
        };

  const resetHeaderToPeak = () => {
    setIsPointerActive(false);
    activePointerIndexRef.current = null;
    setActivePointerIndex(null);
  };

  const syncHeaderWithPointer = pointerInfo => {
    if (typeof pointerInfo?.pointerIndex !== 'number' || pointerInfo.pointerIndex < 0) {
      return;
    }
    const pointerIndex = pointerInfo.pointerIndex;

    if (activePointerIndexRef.current === pointerIndex) {
      return;
    }

    activePointerIndexRef.current = pointerIndex;
    setActivePointerIndex(pointerIndex);
  };

  const activatePointerSync = () => {
    setIsPointerActive(true);
  };

  const activePoint = activePointerIndex !== null ? chartData[activePointerIndex] : null;
  const activeTooltipData = activePoint?.customData || null;
  const activeTooltipTime =
    activePointerIndex !== null ? getNearestLabelByIndex(chartData, activePointerIndex) : '';
  const activeTooltipPositionStyle =
    activePointerIndex === null
      ? null
      : activePointerIndex <= 1
        ? styles.externalTooltipRight
        : activePointerIndex >= chartData.length - 2
          ? styles.externalTooltipLeft
          : styles.externalTooltipCenter;

  return (
    <View style={styles.chartSection}>
      <Text style={styles.chartTitle}>{labels.conversionRate}</Text>
      <Text style={styles.chartSubTitle}>{labels.footfallVsInvoicesPerformance}</Text>

      <View style={styles.dateRangeCard}>
        <Text style={styles.dateRangeLabel}>{labels.dateRange}</Text>

        <TouchableOpacity activeOpacity={0.86} onPress={onPressFrom} style={styles.dateButton}>
          <Text style={[styles.dateButtonText, !fromDate && styles.datePlaceholder]}>
            {fromDate ? formatDate(fromDate) : labels.from}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.86} onPress={onPressTo} style={styles.dateButton}>
          <Text style={[styles.dateButtonText, !toDate && styles.datePlaceholder]}>
            {toDate ? formatDate(toDate) : labels.to}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chartCard}>
        <View style={styles.chartHeaderRow}>
          <Text style={styles.chartHeading} numberOfLines={1}>
            {labels.conversionRate}
          </Text>
          <Text style={styles.peakText}>{`Peak: ${headerMetrics.peakTime} - ${headerMetrics.peakRate}%`}</Text>
        </View>

        <View style={styles.legendRow}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: Colors.chartOrange }]} />
            <Text style={styles.legendLabel}>{labels.footfall}</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: Colors.green }]} />
            <Text style={styles.legendLabel}>{labels.invoices}</Text>
          </View>
        </View>

        <View style={styles.chartBody}>
          {isPointerActive && activeTooltipData && activeTooltipPositionStyle ? (
            <View style={[styles.externalTooltipCard, activeTooltipPositionStyle]} pointerEvents="none">
              <View style={styles.tooltipTopRow}>
                <Text style={styles.tooltipTime}>{activeTooltipTime}</Text>
                <Text style={styles.tooltipRate}>{`${activeTooltipData.rate}%`}</Text>
              </View>
              <Text style={styles.tooltipValue}>
                {labels.footfall}: {activeTooltipData.footfall}
              </Text>
              <Text style={styles.tooltipValue}>
                {labels.invoices}: {activeTooltipData.invoices}
              </Text>
            </View>
          ) : null}

          <LineChart
            areaChart
            curved
            isAnimated
            animationDuration={700}
            width={chartWidth}
            height={chartHeight}
            data={chartData}
            data2={chartData2}
            color1={Colors.chartOrange}
            color2={Colors.green}
            thickness1={2.5}
            thickness2={2.5}
            startFillColor1={Colors.chartOrange}
            endFillColor1={Colors.chartOrange}
            startFillColor2={Colors.green}
            endFillColor2={Colors.green}
            startOpacity1={0.18}
            endOpacity1={0.04}
            startOpacity2={0.14}
            endOpacity2={0.02}
            noOfSections={4}
            maxValue={chartMaxValue}
            rulesColor={Colors.lightPeriwinkle}
            rulesType="dashed"
            yAxisColor={Colors.surfaceBorder}
            xAxisColor={Colors.surfaceBorder}
            yAxisTextStyle={styles.yAxisText}
            xAxisLabelTextStyle={styles.axisText}
            yAxisLabelWidth={wp(7)}
            spacing={chartWidth / (chartData.length - 1)}
            initialSpacing={wp(3.2)}
            endSpacing={wp(4.2)}
            disableScroll
            adjustToWidth
            hideDataPoints
            getPointerProps={syncHeaderWithPointer}
            pointerConfig={{
              pointerStripHeight: chartHeight,
              pointerStripColor: Colors.coolGrey,
              pointerStripWidth: 1,
              pointerColor: Colors.graphite,
              radius: 4,
              activatePointersOnLongPress: true,
              autoAdjustPointerLabelPosition: false,
              onTouchEnd: resetHeaderToPeak,
              onTouchStart: activatePointerSync,
              onResponderMove: activatePointerSync,
              onResponderGrant: activatePointerSync,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartSection: {
    marginTop: hp(2.1),
  },
  chartTitle: {
    fontFamily: Fonts.poppinsBold,
    fontSize: wp(5.1),
    color: Colors.graphite,
  },
  chartSubTitle: {
    marginTop: hp(0.2),
    marginBottom: hp(1.2),
    fontFamily: Fonts.poppinsBold,
    fontSize: wp(3.2),
    color: Colors.blueGrey,
  },
  dateRangeCard: {
    backgroundColor: Colors.white,
    borderRadius: wp(3.8),
    borderWidth: wp(0.25),
    borderColor: Colors.silver,
    paddingHorizontal: wp(2.2),
    paddingVertical: hp(0.9),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.2),
  },
  dateRangeLabel: {
    flex: 1,
    fontFamily: Fonts.poppinsBold,
    fontSize: wp(3.2),
    color: Colors.graphite,
  },
  dateButton: {
    width: wp(24),
    borderRadius: wp(3.1),
    borderWidth: 1,
    borderColor: Colors.fieldBorder,
    marginLeft: wp(1.8),
    paddingVertical: hp(0.9),
    paddingHorizontal: wp(2.8),
    backgroundColor: Colors.fieldBackground,
  },
  dateButtonText: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: Fontsize.xmm0,
    color: Colors.slateText,
  },
  datePlaceholder: {
    color: Colors.coolGrey,
  },
  chartCard: {
    backgroundColor: Colors.white,
    borderRadius: wp(4.4),
    borderWidth: wp(0.25),
    borderColor: Colors.silver,
    paddingHorizontal: wp(3.6),
    paddingTop: hp(1.6),
    paddingBottom: hp(1.9),
  },
  chartHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chartHeading: {
    flex: 1,
    fontFamily: Fonts.poppinsBold,
    fontSize: Fontsize.sm1,
    color: Colors.graphite,
  },
  peakText: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.xs5,
    color: Colors.green,
  },
  legendRow: {
    flexDirection: 'row',
    gap: wp(2.6),
    marginTop: hp(0.55),
    marginBottom: hp(0.8),
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: wp(1.8),
    height: wp(1.8),
    borderRadius: wp(2),
    marginRight: wp(1),
  },
  legendLabel: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: wp(2.8),
    color: Colors.steelGray,
  },
  chartBody: {
    marginTop: hp(0.4),
    marginLeft: 0,
    position: 'relative',
  },
  axisLabelContainer: {
    width: wp(12),
    alignItems: 'center',
  },
  axisText: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: Fontsize.xm0,
    color: Colors.coolGrey,
  },
  yAxisText: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: wp(2.35),
    color: Colors.graphite,
  },
  firstXAxisLabel: {
    marginLeft: wp(4.2),
    alignItems: 'flex-start',
  },
  lastXAxisLabel: {
    alignItems: 'flex-start',
    marginLeft:wp(-4.7),
  },
  externalTooltipCard: {
    backgroundColor: Colors.graphite,
    borderRadius: wp(2.5),
    paddingVertical: hp(0.55),
    paddingHorizontal: wp(2.2),
    minWidth: wp(24),
    position: 'absolute',
    top: hp(0.8),
    zIndex: 10,
  },
  externalTooltipRight: {
    left: wp(9),
  },
  externalTooltipCenter: {
    alignSelf: 'center',
  },
  externalTooltipLeft: {
    right: wp(9),
  },
  tooltipTime: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.xm0,
    color: Colors.white,
  },
  tooltipTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(0.15),
  },
  tooltipRate: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: Fontsize.xm0,
    color: Colors.coolGrey,
  },
  tooltipValue: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: wp(2.35),
    color: Colors.white,
  },
});

export default StaffConversionChartCard;
