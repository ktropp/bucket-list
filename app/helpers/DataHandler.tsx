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
                let dashes = '';
                for (let i = 0; i < line.text.length; i++){
                    dashes += '-';
                }
                dataString += `\n${line.text}\n${dashes}\n\n`;
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
        let i = 0;
        console.log(list[2], list[3]);
        for (const line of list){
            let type = Type.Check;
            let done = false;
            let text = line;



            if(line.startsWith('*')){
                done = true;
            }

            //if next line contains ---, it's a heading
            if(list[i+1] && list[i+1].startsWith('---')){
                type = Type.Heading;
            }

            //remove * from text
            text = text.replace(/\*/g, '');

            i++;
            if(text === '') continue;
            if(text.startsWith('-')) continue;

            let newLine = new DataLine(type, text, done, c);
            c++;
            data.push(newLine);
        }

        return data;
    },
    insert: function (newLine: DataLine, position: number){
        this.data = this.parseData();
        const newData = this.data.slice(0); // copy

        if(position >= 0){
            newLine.key = position;
            newData.splice(position, 0, newLine);
        }else{
            newData.push(newLine);
        }

        //reindex newData array
        let c = 0;
        for (const line of newData){
            line.key = c;
            c++;
        }

        this.data = newData;

        this.write();
    },
    remove: function(position: number){
        this.data = this.parseData();

        const newData = this.data.slice(0); // copy

        newData.forEach((line, index) => {
            if(line.key == position)
                newData.splice(index, 1);
        });

        //reindex newData array
        let c = 0;
        for (const line of newData){
            line.key = c;
            c++;
        }

        this.data = newData;

        this.write();

    }
}

export default DataHandler;