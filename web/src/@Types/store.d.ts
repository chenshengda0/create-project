//菜单
declare type MenusStoreType = {
    id: number,
    pid: number,
    key: string,
    path :number[],
    titles : string[],
    title: string,
    component: string,
    icon: string,
    _children ?: MenusStoreType[],
    is_menu: boolean,
    is_route: boolean,
}

//随机生成key 与 iv
declare type RandomKeyStoreType = {
    randomKey: string,
    randomIV: string,
}

type privateKeyType = {
    keyName: string,
    privateKey: string,
    publicKey: string,
}
interface ChainType{
    type: string,
    rpc: string,
    contract: string,
    index: string,
    accounts: privateKetType[],
}
declare interface PrivateStructStoreType{
    networks: ChainType[],
}

declare interface RootStore{
    //菜单
    MenusStore: MenusStoreType[],

    //随机生成key 与 iv
    RandomKeyStore: RandomKeyStoreType,

    //账户私钥列表
    PrivateStructStore: PrivateStructStoreType,
}