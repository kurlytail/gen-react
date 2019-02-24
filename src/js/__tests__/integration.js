import { execSync } from 'child_process';

describe('# integration test', () => {
    beforeEach(() => {
        execSync('rm -rf testoutput');
    });

    it('## should print help options', () => {
        const output = execSync('./scripts/sgen-react.sh -h').toString();
        expect(output).toMatchSnapshot();
    });

    it('## should generate design', () => {
        const output = execSync('./scripts/sgen-react.sh -d src/test/fixture/design.json -o testoutput').toString();
        expect(output).toMatchSnapshot();
    });

    it('## should generate design with merge', () => {
        let output = execSync('./scripts/sgen-react.sh -d src/test/fixture/design.json -o testoutput').toString();
        expect(output).toMatchSnapshot();
        output = execSync('./scripts/sgen-react.sh -d src/test/fixture/design.json -o testoutput').toString();
        expect(output).toMatchSnapshot();
    });

    it('## should generate design and run react commands', () => {
        let output = execSync('./scripts/sgen-react.sh -d src/test/fixture/design.json -o testoutput').toString();
        expect(output).toMatchSnapshot();
        output = execSync('npm install', { cwd: 'testoutput' }).toString();
        output = execSync('npm run lint', { cwd: 'testoutput' }).toString();
        output = execSync('npm run build', { cwd: 'testoutput' }).toString();
        output = execSync('npm test -- -u', { cwd: 'testoutput' }).toString();
    });
});
