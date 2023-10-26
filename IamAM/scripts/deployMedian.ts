import { toNano } from 'ton-core';
import { Median } from '../wrappers/Median';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const median = provider.open(Median.createFromConfig({}, await compile('Median')));

    await median.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(median.address);

    // run methods on `median`
}
