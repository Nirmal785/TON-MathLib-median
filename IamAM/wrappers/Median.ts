import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from 'ton-core';

export type MedianConfig = {};

export function medianConfigToCell(config: MedianConfig): Cell {
    return beginCell().endCell();
}

export class Median implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Median(address);
    }

    static createFromConfig(config: MedianConfig, code: Cell, workchain = 0) {
        const data = medianConfigToCell(config);
        const init = { code, data };
        return new Median(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
