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

const chartWidth = wp(78);
const chartHeight = hp(20);
const chartMaxValue = 250;

const chartData = staffComparisonFootfallData.map((point, index) => ({
  value: point.value,
  label: point.label,
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

const StaffConversionChartCard = ({ labels, fromDate, toDate, formatDate, onPressFrom, onPressTo }) => {
  let peakRate = 0;
  let peakTime = '00:00';
  chartData.forEach(point => {
    if (point.customData.rate > peakRate && point.label) {
      peakRate = point.customData.rate;
      peakTime = point.label;
    }
  });

  return (
    <View style={styles.chartSection}>
      <Text style={styles.chartTitle}>{labels.conversionRate}</Text>
      <Text style={styles.chartSubTitle}>{labels.footfallVsInvoicesPerformance}</Text>

      <View style={styles.dateRangeCard}>
        <Text style={styles.dateRangeLabel}>{labels.dateRange}</Text>

        <TouchableOpacity activeOpacity={0.85} onPress={onPressFrom} style={styles.dateButton}>
          <Text style={[styles.dateButtonText, !fromDate && styles.datePlaceholder]}>
            {fromDate ? formatDate(fromDate) : labels.from}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.85} onPress={onPressTo} style={styles.dateButton}>
          <Text style={[styles.dateButtonText, !toDate && styles.datePlaceholder]}>
            {toDate ? formatDate(toDate) : labels.to}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chartCard}>
        <View style={styles.chartHeaderRow}>
          <Text style={styles.chartHeading}>{labels.conversionRate}</Text>
          <Text style={styles.peakText}>{`Peak: ${peakTime} - ${peakRate}%`}</Text>
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
            rulesType="solid"
            yAxisColor={Colors.surfaceBorder}
            xAxisColor={Colors.surfaceBorder}
            yAxisTextStyle={styles.axisText}
            xAxisLabelTextStyle={styles.axisText}
            yAxisLabelWidth={wp(8)}
            spacing={chartWidth / (chartData.length - 1)}
            initialSpacing={0}
            endSpacing={0}
            hideDataPoints
            pointerConfig={{
              pointerStripHeight: chartHeight,
              pointerStripColor: Colors.coolGrey,
              pointerStripWidth: 1,
              pointerColor: Colors.graphite,
              radius: 4,
              activatePointersOnLongPress: true,
              autoAdjustPointerLabelPosition: true,
              pointerLabelWidth: wp(30),
              pointerLabelHeight: hp(7.5),
              pointerLabelComponent: items => {
                if (!items || items.length === 0) {
                  return null;
                }
                const selected = items[0];
                const customData = selected.customData
                  ? selected.customData
                  : { footfall: 0, invoices: 0, rate: 0 };
                return (
                  <View style={styles.tooltipCard}>
                    <View style={styles.tooltipTopRow}>
                      <Text style={styles.tooltipTime}>{selected.label || '--:--'}</Text>
                      <Text style={styles.tooltipRate}>{`${customData.rate}%`}</Text>
                    </View>
                    <Text style={styles.tooltipValue}>
                      {labels.footfall}: {customData.footfall}
                    </Text>
                    <Text style={styles.tooltipValue}>
                      {labels.invoices}: {customData.invoices}
                    </Text>
                  </View>
                );
              },
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
    fontSize: 18,
    color: Colors.graphite,
  },
  chartSubTitle: {
    marginTop: hp(0.2),
    marginBottom: hp(1.2),
    fontFamily: Fonts.poppinsBold,
    fontSize: 12,
    color: Colors.blueGrey,
  },
  dateRangeCard: {
    backgroundColor: Colors.lightGrey,
    borderRadius: wp(3.8),
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    paddingHorizontal: wp(2.2),
    paddingVertical: hp(0.9),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.2),
  },
  dateRangeLabel: {
    flex: 1,
    fontFamily: Fonts.poppinsBold,
    fontSize: 12,
    color: Colors.graphite,
  },
  dateButton: {
    width: wp(20),
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
    fontSize: wp(2.85),
    color: Colors.slateText,
  },
  datePlaceholder: {
    color: Colors.coolGrey,
  },
  chartCard: {
    backgroundColor: Colors.white,
    borderRadius: wp(4),
    borderWidth: 1,
    borderColor: Colors.surfaceBorder,
    paddingHorizontal: wp(3),
    paddingTop: hp(1.3),
    paddingBottom: hp(1.8),
  },
  chartHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chartHeading: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: wp(3.9),
    color: Colors.graphite,
  },
  peakText: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: wp(2.8),
    color: Colors.green,
  },
  legendRow: {
    flexDirection: 'row',
    gap: wp(3),
    marginTop: hp(0.6),
    marginBottom: hp(0.6),
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: wp(2),
    height: wp(2),
    borderRadius: wp(2),
    marginRight: wp(1.2),
  },
  legendLabel: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: wp(2.5),
    color: Colors.steelGray,
  },
  chartBody: {
    marginTop: hp(0.4),
    marginLeft: -wp(1),
  },
  axisText: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: wp(2.15),
    color: Colors.coolGrey,
  },
  tooltipCard: {
    backgroundColor: Colors.graphite,
    borderRadius: wp(3),
    paddingVertical: hp(0.6),
    paddingHorizontal: wp(2.4),
  },
  tooltipTime: {
    fontFamily: Fonts.poppinsSemiBold,
    fontSize: wp(2.5),
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
    fontSize: wp(2.5),
    color: Colors.coolGrey,
  },
  tooltipValue: {
    fontFamily: Fonts.poppinsMedium,
    fontSize: wp(2.35),
    color: Colors.white,
  },
});

export default StaffConversionChartCard;
