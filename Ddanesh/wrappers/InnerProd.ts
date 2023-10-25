import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from 'ton-core';

export type InnerProdConfig = {};

export function innerProdConfigToCell(config: InnerProdConfig): Cell {
    return beginCell().endCell();
}

export class InnerProd implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new InnerProd(address);
    }

    static createFromConfig(config: InnerProdConfig, code: Cell, workchain = 0) {
        const data = innerProdConfigToCell(config);
        const init = { code, data };
        return new InnerProd(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
