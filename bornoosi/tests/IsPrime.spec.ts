import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { IsPrime } from '../wrappers/IsPrime';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('IsPrime', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('IsPrime');
    });

    let blockchain: Blockchain;
    let isPrime: SandboxContract<IsPrime>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        isPrime = blockchain.openContract(IsPrime.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await isPrime.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: isPrime.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and isPrime are ready to use
    });
});
