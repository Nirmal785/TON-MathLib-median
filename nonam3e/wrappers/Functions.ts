import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from 'ton-core';

export type FunctionsConfig = {};

export function functionsConfigToCell(config: FunctionsConfig): Cell {
    return beginCell().endCell();
}

export class Functions implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Functions(address);
    }

    static createFromConfig(config: FunctionsConfig, code: Cell, workchain = 0) {
        const data = functionsConfigToCell(config);
        const init = { code, data };
        return new Functions(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
