import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { Median } from '../wrappers/Median';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('Median', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Median');
    });

    let blockchain: Blockchain;
    let median: SandboxContract<Median>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        median = blockchain.openContract(Median.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await median.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: median.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and median are ready to use
    });
});
