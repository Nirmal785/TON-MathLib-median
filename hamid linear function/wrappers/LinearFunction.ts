import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode, Tuple, TupleBuilder, TupleItem } from 'ton-core';

export type LinearFunctionConfig = {};

export function linearFunctionConfigToCell(config: LinearFunctionConfig): Cell {
    return beginCell().endCell();
}

export class LinearFunction implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) { }

    static createFromAddress(address: Address) {
        return new LinearFunction(address);
    }

    static createFromConfig(config: LinearFunctionConfig, code: Cell, workchain = 0) {
        const data = linearFunctionConfigToCell(config);
        const init = { code, data };
        return new LinearFunction(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async get_linear_function(provider: ContractProvider, input: TupleItem[], slope: number, y_intercept: number) {
        const result = await provider.get('linear_function',
            [
                { type: 'tuple', items: input },
                { type: 'int', value: BigInt(slope) },
                { type: 'int', value: BigInt(y_intercept) }
            ]);

        return result.stack.readTuple();
    }
}
