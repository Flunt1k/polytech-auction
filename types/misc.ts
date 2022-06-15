export type RouterMap = {
    [key: string]: [HandlerType, string];
};

export type HandlerType = 'get' | 'post' | 'patch' | 'put' | 'delete';
