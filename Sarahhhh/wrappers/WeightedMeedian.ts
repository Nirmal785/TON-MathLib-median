import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from 'ton-core';

export type WeightedMeedianConfig = {};

export function weightedMeedianConfigToCell(config: WeightedMeedianConfig): Cell {
    return beginCell().endCell();
}

export class WeightedMeedian implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new WeightedMeedian(address);
    }

    static createFromConfig(config: WeightedMeedianConfig, code: Cell, workchain = 0) {
        const data = weightedMeedianConfigToCell(config);
        const init = { code, data };
        return new WeightedMeedian(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
