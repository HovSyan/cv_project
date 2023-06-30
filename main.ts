window.onload = () => {
    addTimelineDotsListeners();
}

function addTimelineDotsListeners(): void {
    const timelineDots: NodeListOf<HTMLSpanElement> = document.querySelectorAll('.experience__timeline span');

    timelineDots.forEach((node: HTMLSpanElement) => {
        node.addEventListener('mouseenter', () => {
            node.classList.add('visited');
        }, { once: true });
    })
}