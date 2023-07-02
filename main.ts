import { Chart, ChartData } from "chart.js";

export const chartData: Record<string, ChartData> = {
    'superannnotate-chart': {
        datasets: [{
            data: [20, 20, 20, 20, 20],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    }
};

console.log('Hello World!')

window.onload = () => {
    addTimelineDotsListeners();
    generateChart('superannnotate-chart');
}

function addTimelineDotsListeners(): void {
    const timelineDots: NodeListOf<HTMLSpanElement> = document.querySelectorAll('.experience__timeline span');

    timelineDots.forEach((node: HTMLSpanElement) => {
        node.addEventListener('mouseenter', () => {
            node.classList.add('visited');
        }, { once: true });
    })
}

function generateChart(id: string): void {
    const context: HTMLElement | null = document.getElementById(id);

    if(context && context instanceof HTMLCanvasElement) {
        const chart = new Chart(context, {
            type: 'doughnut',
            data: chartData[id]
        })
    }
}