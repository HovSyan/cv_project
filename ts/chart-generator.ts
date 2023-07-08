import { ChartData, Chart } from "chart.js/auto";

type Technologies = 
    | 'typescript'
    | 'angular'
    | 'pixijs'
    | 'java'

const colors: Record<Technologies, string> = {
    typescript: '#007accfe',
    angular: '#dd0031fe',
    pixijs: '#e2a717fe',
    java: '#e34f26fe'
};

const chartData: Record<string, ChartData<'doughnut'>> = {
    'superannnotate-chart': {
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

export function generateChart(id: string): void {
    const context: HTMLElement | null = document.getElementById(id);

    if(context && context instanceof HTMLCanvasElement) {
        new Chart<'doughnut'>(context, {
            type: 'doughnut',
            options: {
                plugins: {
                    tooltip: {
                        padding: 10,
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