import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { InnerProd } from '../wrappers/InnerProd';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('InnerProd', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('InnerProd');
    });

    let blockchain: Blockchain;
    let innerProd: SandboxContract<InnerProd>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        innerProd = blockchain.openContract(InnerProd.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await innerProd.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: innerProd.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and innerProd are ready to use
    });
});
