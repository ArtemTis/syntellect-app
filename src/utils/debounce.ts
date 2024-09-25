

export default function debounce<T extends (...args: any[]) => Promise<any>>(callback: T, delay: number): (...args: Parameters<T>) => Promise<ReturnType<T>> {
    let timer: any;
    let lastPromise: Promise<any> | null = null;

    return (...args: Parameters<T>): Promise<ReturnType<T>> => {

        if (timer) {
            clearTimeout(timer);
        }

        return new Promise<ReturnType<T>>((resolve, reject) => {
            timer = setTimeout(async () => {
                try {
                    const resultPromise = callback(...args);
                    lastPromise = resultPromise;

                    const result = await resultPromise;

                    if (lastPromise === resultPromise) {
                        resolve(result);
                    }
                } catch (error) {
                    reject(error);
                }
            }, delay);
        });
    };
}
