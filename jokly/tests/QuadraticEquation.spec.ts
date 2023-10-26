import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { toNano } from 'ton-core';
import { QuadraticEquation } from '../wrappers/QuadraticEquation';
import '@ton-community/test-utils';

describe('QuadraticEquation', () => {
    let blockchain: Blockchain;
    let quadraticEquation: SandboxContract<QuadraticEquation>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        quadraticEquation = blockchain.openContract(await QuadraticEquation.fromInit());

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await quadraticEquation.send(
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
            to: quadraticEquation.address,
            deploy: true,
            success: true,
        });
    });

    it('5x^2 + 2y + z', async () => {
        const result = await quadraticEquation.getSolve(1n, 5n, 6n);
        expect(result).toEqual('-2, -3');
    });

    it('a == 0', async () => {
        const result = await quadraticEquation.getSolve(0n, 2n, 1n);
        expect(result).toEqual('no roots');
    });

    it('d < 0', async () => {
        const result = await quadraticEquation.getSolve(5n, 2n, 1n);
        expect(result).toEqual('no roots');
    });
});
