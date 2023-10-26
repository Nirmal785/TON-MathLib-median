import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { Quadratic } from '../wrappers/Quadratic';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('Quadratic', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Quadratic');
    });

    let blockchain: Blockchain;
    let quadratic: SandboxContract<Quadratic>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        quadratic = blockchain.openContract(Quadratic.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await quadratic.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: quadratic.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and quadratic are ready to use
    });
});
