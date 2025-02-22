import { PanelData } from '@grafana/ui';

export function getOption(data: PanelData): echarts.EChartOption {
  const series = data.series.map((s: any) => {
    const sData = s.fields.find((f: any) => f.type === 'number').values.buffer;
    const sTime = s.fields.find((f: any) => f.type === 'time').values.buffer;

    return {
      name: s.name,
      type: 'line',
      showSymbol: false,
      areaStyle: {
        opacity: 0.1,
      },
      lineStyle: {
        width: 1,
      },
      data: sData.map((d: any, i: number) => [sTime[i], d === null ? 0 : d.toFixed(2)]),
    };
  });

  const axisOption = {
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      color: 'rgba(128, 128, 128, .9)',
    },
    splitLine: {
      lineStyle: {
        color: 'rgba(128, 128, 128, .2)',
      },
    },
  };

  return {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      left: '0',
      bottom: '0',
      data: data.series.map((s: any) => s.name),
      textStyle: {
        color: 'rgba(128, 128, 128, .9)',
      },
    },
    xAxis: Object.assign(
      {
        type: 'time',
      },
      axisOption
    ),
    yAxis: Object.assign(
      {
        type: 'value',
        min: 'dataMin',
      },
      axisOption
    ),
    grid: {
      left: 0,
      right: 16,
      top: 6,
      bottom: 24,
      containLabel: true,
    },
    series,
  };
}

export interface SimpleOptions {
  getOption: string;
}

const funcBodyReg = /{\n([\S\s]*)\n}/;
const matchResult = String(getOption).match(funcBodyReg);
const funcBody = matchResult ? matchResult[1] : '';

export const defaults: SimpleOptions = {
  getOption: funcBody,
};
