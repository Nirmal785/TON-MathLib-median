import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, TupleBuilder, TupleItem, toNano } from 'ton-core';
import { LinearFunction } from '../wrappers/LinearFunction';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';
import { assert } from 'console';

describe('LinearFunction', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('LinearFunction');
    });

    let blockchain: Blockchain;
    let linearFunction: SandboxContract<LinearFunction>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        linearFunction = blockchain.openContract(LinearFunction.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await linearFunction.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: linearFunction.address,
            deploy: true,
            success: true,
        });
    });

    it('test linear function', async () => {
        let x_axis = [10, 20, 30];
        let slope = 2;
        let y_intercept = 5;

        let output_true: number[] = [];
        let input: TupleItem[] = []
        x_axis.forEach(function (value) {
            input.push({ type: 'int', value: BigInt(value) })
            output_true.push(slope * value + y_intercept);
        });
        let output_test = await linearFunction.get_linear_function(input, slope, y_intercept);

        console.log(output_true);
        console.log(output_test);
    });
});
