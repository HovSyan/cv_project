let isVisible: boolean = true;

export function init(): void {
    document.addEventListener('scroll', onWindowScroll)
}

function onWindowScroll(): void {
    const main = document.querySelector<HTMLHeadingElement>('main');

    if(!main) {
        return;
    }

    const elementRect = main.getBoundingClientRect();

    if(elementRect.y < 100) {
        isVisible && toggleNavigation();
        isVisible = false;
    } else {
        !isVisible && toggleNavigation();
        isVisible = true;
    }
}

function toggleNavigation(): void {
    const navigation = document.querySelector<HTMLDivElement>('.info nav');

    if(!navigation) {
        return;
    }

    if(isVisible) {
        navigation.classList.add('visible');
        navigation.classList.remove('invisible');
    } else {
        navigation.classList.remove('visible');
        navigation.classList.add('invisible');
    }
}