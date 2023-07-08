import { generateChart } from "./ts/chart-generator";

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

    if(typeof innerCanvas?.id !== 'string') {
        throw new Error('Canvas must have an id');
    }

    generateChart(innerCanvas?.id);
}