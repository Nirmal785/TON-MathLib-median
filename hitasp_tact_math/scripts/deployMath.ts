import { toNano } from 'ton-core';
import { Math } from '../wrappers/Math';
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const math = provider.open(await Math.fromInit());

    await math.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(math.address);

    // run methods on `math`
}
