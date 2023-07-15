import { ChartData, Chart, TooltipModel, ChartEvent } from "chart.js/auto";

export type Charts = 
    | 'superannotate-chart'
    | 'synergy-chart-1'
    | 'synergy-chart-2'

type Technology = 
    | 'typescript'
    | 'angular'
    | 'pixijs'
    | 'java'

const colors: Record<Technology, string> = {
    typescript: '#007accfe',
    angular: '#dd0031fe',
    pixijs: '#e72264fe',
    java: '#e34f26fe'
};

const tooltipContents: Record<Technology, HTMLDivElement> = {
    typescript: generateTooltipContent('typescript'),
    angular: generateTooltipContent('angular'),
    pixijs: generateTooltipContent('pixijs'),
    java: generateTooltipContent('java'),
}

const chartData: Record<Charts, ChartData<'doughnut'>> = {
    'superannotate-chart': {
        labels: ['Typescript', 'Angular', 'PixiJS'],
        datasets: [{
            data: [45, 40, 15],
            backgroundColor: [colors.typescript, colors.angular, colors.pixijs],
            borderColor: 'transparent',
            hoverOffset: 4
        }]
    },
    'synergy-chart-1': {
        labels: ['Angular', 'Java'],
        datasets: [{
            data: [70, 30],
            backgroundColor: [colors.angular, colors.java],
            borderColor: 'transparent',
            hoverOffset: 4
        }]
    },
    'synergy-chart-2': {
        labels: ['Angular', 'Java'],
        datasets: [{
            data: [50, 50],
            backgroundColor: [colors.angular, colors.java],
            borderColor: 'transparent',
            hoverOffset: 4
        }]
    }
};

export function generateChart(id: Charts): void {
    const context: HTMLElement | null = document.getElementById(id);

    if(context && context instanceof HTMLCanvasElement) {
        new Chart<'doughnut'>(context, {
            type: 'doughnut',
            options: {
                plugins: {
                    tooltip: {
                        enabled: false,
                        position: 'nearest',
                        external: externalTooltipHandler
                    },
                    legend: {
                        labels: {
                            color: 'white',
                        }
                    },
                },
                radius: '90%',
            },
            data: chartData[id]
        })
    }
}

function getOrCreateWrapper(chart: Chart): HTMLDivElement {
    let tooltipEl = chart.canvas.parentNode?.querySelector<HTMLDivElement>('div.chart__tooltip');

    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.className = 'chart__tooltip';
      chart.canvas.parentNode?.appendChild(tooltipEl);
    }
  
    return tooltipEl;
};

function externalTooltipHandler(context: { chart: Chart; tooltip: TooltipModel<'doughnut'> }): void {
    // Tooltip Element
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateWrapper(chart);
  
    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.classList.add('chart__tooltip--invisible');
      return;
    }

    console.log(tooltip)
    // Set Text
    if (tooltip.body && tooltip.body.length > 0) {
        const bodyLine = tooltip.body[0].lines[0];
        const divElement = tooltipContents[tooltip.title[0].toLowerCase() as Technology];
        divElement.children[1].innerHTML = bodyLine + '%';
        if(!bodyLine) {
            return;
        }

        if(tooltipEl.childElementCount > 0) {
            tooltipEl.replaceChild(divElement, tooltipEl.firstChild!);
        } else {
            tooltipEl.appendChild(divElement)
        }
    }
  
    const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;
  
    // Display, position, and set styles for font
    tooltipEl.classList.remove('chart__tooltip--invisible');
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};

function generateTooltipContent(t: Technology): HTMLDivElement {
    const divElement = document.createElement('div');
    divElement.className = 'chart__tooltip-content-container'

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    const span = document.createElement('span');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `./assets/icons/sprite.svg#icon-${t}`);
    svg.appendChild(use);
    svg.style.width = '20px';
    svg.style.height = '20px';

    divElement.appendChild(svg);
    divElement.appendChild(span);

    return divElement;
}