import * as d3 from 'd3';
import { ISpiderChartConfig } from '../interfaces/config.interface';

export const defaultSpiderConfig: ISpiderChartConfig = {
  w: 200,
  h: 200,
  levels: 5,
  fullScreen: false,
  maxValue: 35,
  labelFactor: 1.25,
  wrapWidth: 60,
  opacityArea: 0.35,
  dotRadius: 3,
  opacityCircles: 0.1,
  strokeWidth: 2,
  color: d3.scaleOrdinal().range(['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd']),
  attributes: [
    {
      key: 'One',
      text: 'W',
      titleAlertPopup: 'CLIENT_DASHBOARD.ALERT_POPUP.SPIDER_CONFIG.W.TITLE',
      descriptionAlertPopup: 'CLIENT_DASHBOARD.ALERT_POPUP.SPIDER_CONFIG.W.DESCRIPTION',
    },
    {
      key: 'Two',
      text: 'H',
      titleAlertPopup: 'CLIENT_DASHBOARD.ALERT_POPUP.SPIDER_CONFIG.H1.TITLE',
      descriptionAlertPopup: 'CLIENT_DASHBOARD.ALERT_POPUP.SPIDER_CONFIG.H1.DESCRIPTION',
    },
    {
      key: 'Three',
      text: 'B',
      titleAlertPopup: 'CLIENT_DASHBOARD.ALERT_POPUP.SPIDER_CONFIG.B.TITLE',
      descriptionAlertPopup: 'CLIENT_DASHBOARD.ALERT_POPUP.SPIDER_CONFIG.B.DESCRIPTION',
    },
    {
      key: 'Four',
      text: 'H',
      titleAlertPopup: 'CLIENT_DASHBOARD.ALERT_POPUP.SPIDER_CONFIG.H2.TITLE',
      descriptionAlertPopup: 'CLIENT_DASHBOARD.ALERT_POPUP.SPIDER_CONFIG.H2.DESCRIPTION',
    },
    {
      key: 'Five',
      text: 'F',
      titleAlertPopup: 'CLIENT_DASHBOARD.ALERT_POPUP.SPIDER_CONFIG.F.TITLE',
      descriptionAlertPopup: 'CLIENT_DASHBOARD.ALERT_POPUP.SPIDER_CONFIG.F.DESCRIPTION',
    },
    {
      key: 'Six',
      text: 'Ch',
      titleAlertPopup: 'CLIENT_DASHBOARD.ALERT_POPUP.SPIDER_CONFIG.CH.TITLE',
      descriptionAlertPopup: 'CLIENT_DASHBOARD.ALERT_POPUP.SPIDER_CONFIG.CH.DESCRIPTION',
    },
    {
      key: 'Seven',
      text: 'I',
      titleAlertPopup: 'CLIENT_DASHBOARD.ALERT_POPUP.SPIDER_CONFIG.I.TITLE',
      descriptionAlertPopup: 'CLIENT_DASHBOARD.ALERT_POPUP.SPIDER_CONFIG.I.DESCRIPTION',
    },
    {
      key: 'Eight',
      text: 'Co',
      titleAlertPopup: 'CLIENT_DASHBOARD.ALERT_POPUP.SPIDER_CONFIG.CO.TITLE',
      descriptionAlertPopup: 'CLIENT_DASHBOARD.ALERT_POPUP.SPIDER_CONFIG.CO.DESCRIPTION',
    },
  ],
  datasets: [],
};
