import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { MathFunctionName } from '../wrappers/MathFunctionName';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('MathFunctionName', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('MathFunctionName');
    });

    let blockchain: Blockchain;
    let mathFunctionName: SandboxContract<MathFunctionName>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        mathFunctionName = blockchain.openContract(MathFunctionName.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await mathFunctionName.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: mathFunctionName.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and mathFunctionName are ready to use
    });
});
