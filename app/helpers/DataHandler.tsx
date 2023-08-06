import * as fs from 'fs';
import { Type } from '~/components/ButtonAdd';
import * as path from 'path';

export class DataLine{
    key: number = 0;
    type: Type;
    text: string;
    done: boolean = false;

    constructor(type: Type, text: string, done: boolean = false, key: number = 0){
        this.type = type;
        this.text = text;
        this.done = done;
        this.key = key;
    }
}

const DataHandler = {
    dataPath: './data/data.txt',
    dataFolder: './data',
    data: [] as DataLine[],
    write: function (){
        //convert data to string
        let dataString = '';
        for (const line of this.data){
            if(line.text === '') continue;
            if (line.type === Type.Heading){
                dataString += `***${line.text}***\n`;
            } else {
                if(line.done){
                    dataString += `*${line.text}\n`;
                }else{
                    dataString += `${line.text}\n`;
                }
            }
        }
        return fs.writeFileSync(this.dataPath, dataString);
    },
    parseData: function (){
        fs.mkdir(this.dataFolder, {recursive: true}, (err) => {
          if (err) throw err;
        });
        if(!fs.existsSync(this.dataPath)){
            fs.writeFileSync(this.dataPath, "");
        }
        const file = fs.readFileSync(this.dataPath, 'utf-8');
        const list = file.toString().split('\n');

        let data = [];

        let c = 0;
        for (const line of list){
            let type = Type.Check;
            let done = false;
            let text = line;
            if(line.startsWith('*')){
                done = true;
            }
            if (line.startsWith('***')){
                type = Type.Heading;
            }
            //remove * and *** from text
            text = text.replace(/\*/g, '');

            if(text === '') continue;

            let newLine = new DataLine(type, text, done, c);
            c++;
            data.push(newLine);
        }

        return data;
    },
    insert: function (newLine: DataLine){
        this.data = this.parseData();
        this.data.push(newLine);
        this.write();
    }
}

export default DataHandler;