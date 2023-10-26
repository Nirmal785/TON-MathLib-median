import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { WeightedMeedian } from '../wrappers/WeightedMeedian';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('WeightedMeedian', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('WeightedMeedian');
    });

    let blockchain: Blockchain;
    let weightedMeedian: SandboxContract<WeightedMeedian>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        weightedMeedian = blockchain.openContract(WeightedMeedian.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await weightedMeedian.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: weightedMeedian.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and weightedMeedian are ready to use
    });
});
