import { toNano } from 'ton-core';
import { WeightedMeedian } from '../wrappers/WeightedMeedian';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const weightedMeedian = provider.open(WeightedMeedian.createFromConfig({}, await compile('WeightedMeedian')));

    await weightedMeedian.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(weightedMeedian.address);

    // run methods on `weightedMeedian`
}
