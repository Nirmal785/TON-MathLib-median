import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from 'ton-core';

export type IsPrimeConfig = {};

export function isPrimeConfigToCell(config: IsPrimeConfig): Cell {
    return beginCell().endCell();
}

export class IsPrime implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new IsPrime(address);
    }

    static createFromConfig(config: IsPrimeConfig, code: Cell, workchain = 0) {
        const data = isPrimeConfigToCell(config);
        const init = { code, data };
        return new IsPrime(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
