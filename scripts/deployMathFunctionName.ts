import { toNano } from 'ton-core';
import { MathFunctionName } from '../wrappers/MathFunctionName';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const mathFunctionName = provider.open(MathFunctionName.createFromConfig({}, await compile('MathFunctionName')));

    await mathFunctionName.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(mathFunctionName.address);

    // run methods on `mathFunctionName`
}
