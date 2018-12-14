export default function ClickToContinue(func) {
    const doStuff = () => {
        window.removeEventListener('keydown', doStuff);
        func();
    }
    window.addEventListener("keydown", doStuff);
}