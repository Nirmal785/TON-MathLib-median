import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { toNano } from 'ton-core';
import { Math } from '../wrappers/Math';
import '@ton-community/test-utils';

describe('Math', () => {
    let blockchain: Blockchain;
    let math: SandboxContract<Math>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        math = blockchain.openContract(await Math.fromInit());

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await math.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: math.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and math are ready to use
    });
});
