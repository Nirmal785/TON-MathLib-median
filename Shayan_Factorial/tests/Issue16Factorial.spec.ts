import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { Issue16Factorial } from '../wrappers/Issue16Factorial';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('Issue16Factorial', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Issue16Factorial');
    });

    let blockchain: Blockchain;
    let issue16Factorial: SandboxContract<Issue16Factorial>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        issue16Factorial = blockchain.openContract(Issue16Factorial.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await issue16Factorial.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: issue16Factorial.address,
            deploy: true,
            success: true,
        });
    });

    it('factorial', async () => {
        let inputs: number[] = [0, 1, 2, 3, 10]
        for (var input of inputs) {
            console.log(input + "! =", Number(await issue16Factorial.get_factorial_ton(input)))
          }
    });
});
