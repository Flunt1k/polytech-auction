export const appFetch = async ({
    path,
    token,
    data,
    query,
    method,
}: {
    path: string;
    data?: Record<string, any>;
    method: string;
    token?: string;
    query?: string;
}) => {
    const response = await fetch(`${path}?${query}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}` || '',
        },
        body: data ? JSON.stringify(data) : undefined,
    });

    const json = await response.json();

    if (response.status === 401) {
        localStorage.removeItem('token');
    }

    if (response.status >= 300) {
        throw JSON.stringify({...json, failed: true});
    } else {
        return json.data;
    }
};

export const createQuery = (
    params: Record<string, number | boolean | string | string[]>,
): string => {
    return (Object.keys(params) as (keyof typeof params)[]).reduce(
        (acc: string, key: string, index: number) => {
            const param = params[key];

            if (typeof param === 'boolean') {
                acc += index === 0 ? `${key}=${param ? 1 : 0}` : `&${key}=${param ? 1 : 0}`;
            } else if (Array.isArray(param)) {
                param.forEach((p) => {
                    acc += index === 0 ? `${key}=${p}` : `&${key}=${p}`;
                });
            } else {
                acc += index === 0 ? `${key}=${param}` : `&${key}=${param}`;
            }

            return acc;
        },
        '',
    );
};
