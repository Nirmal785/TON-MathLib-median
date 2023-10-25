import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from 'ton-core';

export type Issue16FactorialConfig = {};

export function issue16FactorialConfigToCell(config: Issue16FactorialConfig): Cell {
    return beginCell().endCell();
}

export class Issue16Factorial implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) { }

    static createFromAddress(address: Address) {
        return new Issue16Factorial(address);
    }

    static createFromConfig(config: Issue16FactorialConfig, code: Cell, workchain = 0) {
        const data = issue16FactorialConfigToCell(config);
        const init = { code, data };
        return new Issue16Factorial(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async get_factorial_ton(provider: ContractProvider, requested_number: number) {
        const result = await provider.get('factorial_ton', [{ type: 'int', value: BigInt(requested_number) }]);
        return result.stack.readBigNumber();
    }
}
