import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from 'ton-core';

export type QuadraticConfig = {};

export function quadraticConfigToCell(config: QuadraticConfig): Cell {
    return beginCell().endCell();
}

export class Quadratic implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Quadratic(address);
    }

    static createFromConfig(config: QuadraticConfig, code: Cell, workchain = 0) {
        const data = quadraticConfigToCell(config);
        const init = { code, data };
        return new Quadratic(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
