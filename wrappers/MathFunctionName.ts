import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from 'ton-core';

export type MathFunctionNameConfig = {};

export function mathFunctionNameConfigToCell(config: MathFunctionNameConfig): Cell {
    return beginCell().endCell();
}

export class MathFunctionName implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new MathFunctionName(address);
    }

    static createFromConfig(config: MathFunctionNameConfig, code: Cell, workchain = 0) {
        const data = mathFunctionNameConfigToCell(config);
        const init = { code, data };
        return new MathFunctionName(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
