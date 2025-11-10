/**
 * Analytics Screen
 * Display mood trends and statistics with charts
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { moodService } from '../services/api';
import { APP_SETTINGS } from '../constants/config';

const screenWidth = Dimensions.get('window').width;

const AnalyticsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState(30);
  const [stats, setStats] = useState(null);
  const [trendData, setTrendData] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, [selectedPeriod]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const data = await moodService.getMoodStats(selectedPeriod);
      setStats(data);
      setTrendData(data.trendData);
    } catch (error) {
      console.error('Load analytics error:', error);
      Alert.alert('Error', 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const renderPeriodSelector = () => (
    <View style={styles.periodSelector}>
      {[7, 14, 30, 90].map((days) => (
        <TouchableOpacity
          key={days}
          style={[styles.periodButton, selectedPeriod === days && styles.periodButtonActive]}
          onPress={() => setSelectedPeriod(days)}
        >
          <Text style={[styles.periodText, selectedPeriod === days && styles.periodTextActive]}>
            {days}d
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderMoodTrendChart = () => {
    if (!trendData || trendData.length === 0) return null;

    const labels = trendData.map((item) => {
      const date = new Date(item.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    });

    const moodBeforeData = trendData.map((item) => item.moodBefore || 5);
    const moodAfterData = trendData.map((item) => item.moodAfter || 5);

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Mood Trend</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <LineChart
            data={{
              labels: labels,
              datasets: [
                {
                  data: moodBeforeData,
                  color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`, // Red
                  strokeWidth: 2,
                },
                {
                  data: moodAfterData,
                  color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`, // Green
                  strokeWidth: 2,
                },
              ],
              legend: ['Before', 'After'],
            }}
            width={Math.max(screenWidth - 40, trendData.length * 50)}
            height={220}
            chartConfig={{
              backgroundColor: APP_SETTINGS.THEME.CARD,
              backgroundGradientFrom: APP_SETTINGS.THEME.CARD,
              backgroundGradientTo: APP_SETTINGS.THEME.CARD,
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
              style: { borderRadius: 16 },
              propsForDots: { r: '4', strokeWidth: '2' },
            }}
            bezier
            style={styles.chart}
          />
        </ScrollView>
      </View>
    );
  };

  const renderMoodChangeChart = () => {
    if (!trendData || trendData.length === 0) return null;

    const labels = trendData.map((item) => {
      const date = new Date(item.date);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    });

    const moodChangeData = trendData.map((item) => item.moodChange || 0);

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Mood Change</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <BarChart
            data={{
              labels: labels,
              datasets: [{ data: moodChangeData }],
            }}
            width={Math.max(screenWidth - 40, trendData.length * 50)}
            height={220}
            chartConfig={{
              backgroundColor: APP_SETTINGS.THEME.CARD,
              backgroundGradientFrom: APP_SETTINGS.THEME.CARD,
              backgroundGradientTo: APP_SETTINGS.THEME.CARD,
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
              style: { borderRadius: 16 },
            }}
            style={styles.chart}
          />
        </ScrollView>
      </View>
    );
  };

  const renderCategoryPieChart = () => {
    if (!stats || !stats.categoryTotals) return null;

    const { Routine, Necessary, Pleasurable } = stats.categoryTotals;
    const total = Routine + Necessary + Pleasurable;

    if (total === 0) return null;

    const pieData = [
      {
        name: 'Routine',
        population: Routine,
        color: '#6366f1', // Indigo
        legendFontColor: APP_SETTINGS.THEME.TEXT,
        legendFontSize: 14,
      },
      {
        name: 'Necessary',
        population: Necessary,
        color: '#f59e0b', // Amber
        legendFontColor: APP_SETTINGS.THEME.TEXT,
        legendFontSize: 14,
      },
      {
        name: 'Pleasurable',
        population: Pleasurable,
        color: '#06b6d4', // Cyan
        legendFontColor: APP_SETTINGS.THEME.TEXT,
        legendFontSize: 14,
      },
    ].filter((item) => item.population > 0);

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Activity Categories</Text>
        <PieChart
          data={pieData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
    );
  };

  const renderStatsSummary = () => {
    if (!stats || !trendData) return null;

    const avgMoodBefore =
      trendData.reduce((sum, item) => sum + (item.moodBefore || 0), 0) / trendData.length || 0;
    const avgMoodAfter =
      trendData.reduce((sum, item) => sum + (item.moodAfter || 0), 0) / trendData.length || 0;
    const avgChange = avgMoodAfter - avgMoodBefore;

    return (
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Days Tracked</Text>
          <Text style={styles.statValue}>{stats.totalDays}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Avg Mood Before</Text>
          <Text style={styles.statValue}>{avgMoodBefore.toFixed(1)}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Avg Mood After</Text>
          <Text style={styles.statValue}>{avgMoodAfter.toFixed(1)}</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Avg Change</Text>
          <Text style={[styles.statValue, { color: avgChange >= 0 ? APP_SETTINGS.THEME.SUCCESS : APP_SETTINGS.THEME.ERROR }]}>
            {avgChange >= 0 ? '+' : ''}{avgChange.toFixed(1)}
          </Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={APP_SETTINGS.THEME.PRIMARY} />
      </SafeAreaView>
    );
  }

  if (!trendData || trendData.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Data Yet</Text>
          <Text style={styles.emptyText}>
            Start logging your activities and mood to see analytics and trends!
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {renderPeriodSelector()}
        {renderStatsSummary()}
        {renderMoodTrendChart()}
        {renderMoodChangeChart()}
        {renderCategoryPieChart()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_SETTINGS.THEME.BACKGROUND,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    backgroundColor: APP_SETTINGS.THEME.CARD,
    borderRadius: 12,
    padding: 8,
  },
  periodButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  periodButtonActive: {
    backgroundColor: APP_SETTINGS.THEME.PRIMARY,
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
    color: APP_SETTINGS.THEME.TEXT_SECONDARY,
  },
  periodTextActive: {
    color: '#ffffff',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: APP_SETTINGS.THEME.CARD,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: APP_SETTINGS.THEME.TEXT_SECONDARY,
    marginBottom: 6,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: APP_SETTINGS.THEME.TEXT,
  },
  chartContainer: {
    backgroundColor: APP_SETTINGS.THEME.CARD,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: APP_SETTINGS.THEME.TEXT,
    marginBottom: 12,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: APP_SETTINGS.THEME.TEXT,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: APP_SETTINGS.THEME.TEXT_SECONDARY,
    textAlign: 'center',
  },
});

export default AnalyticsScreen;
