import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { Functions } from '../wrappers/Functions';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('Functions', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Functions');
    });

    let blockchain: Blockchain;
    let functions: SandboxContract<Functions>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        functions = blockchain.openContract(Functions.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await functions.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: functions.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and functions are ready to use
    });
});
