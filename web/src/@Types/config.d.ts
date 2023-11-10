//递归
declare type Develop<T> = {
    [P in keyof T]: Develop<T[P]>
}

//推断
declare type InferType<T> = T extends (...param: infer R)=>void ? R : never;

//显示完整类型
declare type GetType<T> = {
    [P in T]: any
}

type Pick<T,K extends keyof T> = {
    [P in T]: T[P]
}

type SonsType<T> = {
    [P in keyof T]?: T[P]
}

