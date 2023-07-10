import { generateChart, Charts } from "./ts/chart-generator";

window.onload = () => {
    addTimelineDotsListeners();
}

function addTimelineDotsListeners(): void {
    const timelineDots: NodeListOf<HTMLSpanElement> = document.querySelectorAll('.experience__timeline span:not(.visited)');

    timelineDots.forEach((node: HTMLSpanElement) => {
        node.addEventListener('mouseenter', () => {
            node.classList.add('visited');
            initTimelineCard(node.nextElementSibling as HTMLDivElement);
        }, { once: true });
    })
}

function initTimelineCard(cardContainer: HTMLDivElement): void {
    const innerCanvas = cardContainer.querySelector('canvas');
    const id = innerCanvas?.id;

    assertValidCanvas(id)
    generateChart(id!);
}

function assertValidCanvas(id: unknown): asserts id is Charts {
    if(id === 'superannotate-chart' ||
    id === 'synergy-chart-1' ||
    id === 'synergy-chart-2') return;
    throw new Error('Invalid id for the cnavas')
}