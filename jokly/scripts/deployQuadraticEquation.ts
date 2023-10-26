import { toNano } from 'ton-core';
import { QuadraticEquation } from '../wrappers/QuadraticEquation';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const quadraticEquation = provider.open(await QuadraticEquation.fromInit());

    await quadraticEquation.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(quadraticEquation.address);

    // run methods on `quadraticEquation`
}
