import { ICircleData } from '../interfaces/chart-data-circle.interface';
import { IDefsF } from '../interfaces/chart-data-defs-f.interface';
import { IDefsLG } from '../interfaces/chart-data-defs-lg.interface';
import { IDefsRG } from '../interfaces/chart-data-defs-rg.interface';

export const circleData: ICircleData[] = [
  {
    cx: '0',
    cy: '0',
    r: '100',
    transform: `translate(${300 / 2},${300 / 2})`,
    stroke: 'url(#circleBorderRadiant)',
    'stroke-width': '1.5',
    fill: 'url(#circleFillRadial)',
  },
  {
    cx: '0',
    cy: '0',
    r: '40',
    fill: 'black',
    transform: `translate(${300 / 2},${300 / 2})`,
    filter: 'url(#innerCircleBlurEffect)',
  },
  {
    cx: '0',
    cy: '0',
    r: '23',
    fill: '#ffffff0f',
    transform: `translate(${300 / 2},${300 / 2})`,
    filter: 'url(#innerWhiteCircleBlurEffect)',
  },
];

export const defsLG: IDefsLG[] = [
  {
    id: 'circleBorderRadiant',
    x1: '0%',
    y1: '0%',
    x2: '100%',
    y2: '0%',
    stopTags: [
      { offset: '0%', style: 'stop-color:#562232;stop-opacity:1' },
      { offset: '100%', style: 'stop-color:#E6688D;stop-opacity:1' },
    ],
  },
  {
    id: 'circleFillRadial',
    x1: '0%',
    y1: '0%',
    x2: '100%',
    y2: '0%',
    stopTags: [
      { offset: '0%', style: 'stop-color:#00000043;stop-opacity:1' },
      { offset: '100%', style: 'stop-color:#29252D;stop-opacity:0.8' },
    ],
  },
  {
    id: 'needleRadiant',
    x1: '0%',
    y1: '0%',
    x2: '100%',
    y2: '0%',
    stopTags: [
      { offset: '0%', style: 'stop-color:#8d61791b; stop-opacity:1' },
      { offset: '30%', style: 'stop-color:#E854AC; stop-opacity:0.5' },
      { offset: '70%', style: 'stop-color:#E854AC; stop-opacity:0.5' },
      { offset: '100%', style: 'stop-color:#8d61791b; stop-opacity:1' },
    ],
  },
];

export const defsF: IDefsF[] = [
  {
    id: 'innerCircleBlurEffect',
    x: '-40%',
    y: '-40%',
    height: '200%',
    width: '200%',
    feGaussianTags: [{ in: 'SourceGraphic', stdDeviation: '12' }],
  },
  {
    id: 'innerWhiteCircleBlurEffect',
    x: '-40%',
    y: '-40%',
    height: '200%',
    width: '200%',
    feGaussianTags: [{ in: 'SourceGraphic', stdDeviation: '10' }],
  },
];

export const defsRG: IDefsRG[] = [
  {
    id: 'innerCircleRadialEffect',
    cx: '50%',
    cy: '50%',
    r: '30%',
    stopTags: [
      { offset: '0%', style: 'stop-color:#5050591a; stop-opacity:1' },
      { offset: '30%', style: 'stop-color:#5050592a; stop-opacity:1' },
      { offset: '70%', style: 'stop-color:#000000; stop-opacity:1' },
      { offset: '100%', style: 'stop-color: #000000; stop-opacity:1' },
    ],
  },
  {
    id: 'firstGraphColor',
    cx: '50%',
    cy: '50%',
    r: '50%',
    stopTags: [
      { offset: '0%', style: 'stop-color:#47454C; stop-opacity:0.3' },
      { offset: '30%', style: 'stop-color:#47454C; stop-opacity:0.3' },
      { offset: '70%', style: 'stop-color:#6c6b70; stop-opacity:0.3' },
      { offset: '100%', style: 'stop-color: #753D43; stop-opacity:0.5' },
    ],
  },
  {
    id: 'secondGraphColor',
    cx: '50%',
    cy: '50%',
    r: '0%',
    stopTags: [
      { offset: '0%', style: 'stop-color:#48263C; stop-opacity:0.3' },
      { offset: '30%', style: 'stop-color:#48263C; stop-opacity:0.3' },
      { offset: '70%', style: 'stop-color:#48263C; stop-opacity:0.3' },
      { offset: '100%', style: 'stop-color:#48263C; stop-opacity:0.3' },
    ],
  },
  {
    id: 'thirdGraphColor',
    cx: '50%',
    cy: '50%',
    r: '0%',
    stopTags: [
      { offset: '0%', style: 'stop-color:#006400; stop-opacity:0.3' },
      { offset: '30%', style: 'stop-color:#006400; stop-opacity:0.3' },
      { offset: '70%', style: 'stop-color:#006400; stop-opacity:0.3' },
      { offset: '100%', style: 'stop-color:#006400; stop-opacity:0.3' },
    ],
  },
  {
    id: 'fourthGraphColor',
    cx: '50%',
    cy: '50%',
    r: '0%',
    stopTags: [
      { offset: '0%', style: 'stop-color:#8B0000; stop-opacity:0.3' },
      { offset: '30%', style: 'stop-color:#8B0000; stop-opacity:0.3' },
      { offset: '70%', style: 'stop-color:#8B0000; stop-opacity:0.3' },
      { offset: '100%', style: 'stop-color:#8B0000; stop-opacity:0.3' },
    ],
  },
  {
    id: 'fifthGraphColor',
    cx: '50%',
    cy: '50%',
    r: '0%',
    stopTags: [
      { offset: '0%', style: 'stop-color:#00008B; stop-opacity:0.3' },
      { offset: '30%', style: 'stop-color:#00008B; stop-opacity:0.3' },
      { offset: '70%', style: 'stop-color:#00008B; stop-opacity:0.3' },
      { offset: '100%', style: 'stop-color:#00008B; stop-opacity:0.3' },
    ],
  },
  {
    id: 'sixthGraphColor',
    cx: '50%',
    cy: '50%',
    r: '0%',
    stopTags: [
      { offset: '0%', style: 'stop-color:#8B008B; stop-opacity:0.3' },
      { offset: '30%', style: 'stop-color:#8B008B; stop-opacity:0.3' },
      { offset: '70%', style: 'stop-color:#8B008B; stop-opacity:0.3' },
      { offset: '100%', style: 'stop-color:#8B008B; stop-opacity:0.3' },
    ],
  },
  {
    id: 'seventhGraphColor',
    cx: '50%',
    cy: '50%',
    r: '0%',
    stopTags: [
      { offset: '0%', style: 'stop-color:#FF8C00; stop-opacity:0.3' },
      { offset: '30%', style: 'stop-color:#FF8C00; stop-opacity:0.3' },
      { offset: '70%', style: 'stop-color:#FF8C00; stop-opacity:0.3' },
      { offset: '100%', style: 'stop-color:#FF8C00; stop-opacity:0.3' },
    ],
  },
  {
    id: 'eighthGraphColor',
    cx: '50%',
    cy: '50%',
    r: '0%',
    stopTags: [
      { offset: '0%', style: 'stop-color:#008080; stop-opacity:0.3' },
      { offset: '30%', style: 'stop-color:#008080; stop-opacity:0.3' },
      { offset: '70%', style: 'stop-color:#008080; stop-opacity:0.3' },
      { offset: '100%', style: 'stop-color:#008080; stop-opacity:0.3' },
    ],
  },
  {
    id: 'ninthGraphColor',
    cx: '50%',
    cy: '50%',
    r: '0%',
    stopTags: [
      { offset: '0%', style: 'stop-color:#D2691E; stop-opacity:0.3' },
      { offset: '30%', style: 'stop-color:#D2691E; stop-opacity:0.3' },
      { offset: '70%', style: 'stop-color:#D2691E; stop-opacity:0.3' },
      { offset: '100%', style: 'stop-color:#D2691E; stop-opacity:0.3' },
    ],
  },
  {
    id: 'tenthGraphColor',
    cx: '50%',
    cy: '50%',
    r: '0%',
    stopTags: [
      { offset: '0%', style: 'stop-color:#9400D3; stop-opacity:0.3' },
      { offset: '30%', style: 'stop-color:#9400D3; stop-opacity:0.3' },
      { offset: '70%', style: 'stop-color:#9400D3; stop-opacity:0.3' },
      { offset: '100%', style: 'stop-color:#9400D3; stop-opacity:0.3' },
    ],
  },
  {
    id: 'eleventhGraphColor',
    cx: '50%',
    cy: '50%',
    r: '0%',
    stopTags: [
      { offset: '0%', style: 'stop-color:#4B0082; stop-opacity:0.3' },
      { offset: '30%', style: 'stop-color:#4B0082; stop-opacity:0.3' },
      { offset: '70%', style: 'stop-color:#4B0082; stop-opacity:0.3' },
      { offset: '100%', style: 'stop-color:#4B0082; stop-opacity:0.3' },
    ],
  },
  {
    id: 'twelfthGraphColor',
    cx: '50%',
    cy: '50%',
    r: '0%',
    stopTags: [
      { offset: '0%', style: 'stop-color:#800000; stop-opacity:0.3' },
      { offset: '30%', style: 'stop-color:#800000; stop-opacity:0.3' },
      { offset: '70%', style: 'stop-color:#800000; stop-opacity:0.3' },
      { offset: '100%', style: 'stop-color:#800000; stop-opacity:0.3' },
    ],
  },
  {
    id: 'thirteenthGraphColor',
    cx: '50%',
    cy: '50%',
    r: '0%',
    stopTags: [
      { offset: '0%', style: 'stop-color:#808000; stop-opacity:0.3' },
      { offset: '30%', style: 'stop-color:#808000; stop-opacity:0.3' },
      { offset: '70%', style: 'stop-color:#808000; stop-opacity:0.3' },
      { offset: '100%', style: 'stop-color:#808000; stop-opacity:0.3' },
    ],
  },
  {
    id: 'fourteenthGraphColor',
    cx: '50%',
    cy: '50%',
    r: '0%',
    stopTags: [
      { offset: '0%', style: 'stop-color:#483D8B; stop-opacity:0.3' },
      { offset: '30%', style: 'stop-color:#483D8B; stop-opacity:0.3' },
      { offset: '70%', style: 'stop-color:#483D8B; stop-opacity:0.3' },
      { offset: '100%', style: 'stop-color:#483D8B; stop-opacity:0.3' },
    ],
  },
  {
    id: 'fifteenthGraphColor',
    cx: '50%',
    cy: '50%',
    r: '0%',
    stopTags: [
      { offset: '0%', style: 'stop-color:#2F4F4F; stop-opacity:0.3' },
      { offset: '30%', style: 'stop-color:#2F4F4F; stop-opacity:0.3' },
      { offset: '70%', style: 'stop-color:#2F4F4F; stop-opacity:0.3' },
      { offset: '100%', style: 'stop-color:#2F4F4F; stop-opacity:0.3' },
    ],
  },
];
