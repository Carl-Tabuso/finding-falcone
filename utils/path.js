import { writeFile, readFile } from 'node:fs/promises';
import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const __dirname = process.cwd();

const joinPath = (filePath) => path.join(__dirname, filePath);

const makeDirectory = (directory) => ! existsSync(directory) ? mkdirSync(directory) : directory;

const fetchFile = async (filename, apiFunction) => {
    const filePath = joinPath(filename);

    if (! existsSync(filePath)) {
        const data = await apiFunction();
        await writeFile(filePath, JSON.stringify(data, null, 2));
    }

    return await readFile(filePath, 'utf-8');
};


export default __dirname;
export { joinPath, makeDirectory, fetchFile };