// Copyright 2019 Arindam Hazra aka Xynox <https://arindamz.github.io/>
// 
// Licensed under the Apache License, Version 2.0(the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
// http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
//     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
const { Command } = require('discord-akairo');
const { MessageAttachment } = require('discord.js');
const { Type } = require('@anishshobith/deeptype');
const { inspect } = require('util');

class EvalCommand extends Command {
    constructor() {
        super('eval', {
            aliases: ['eval', 'evaluate', 'e', 'ev'],
            ownerOnly: true,
            quoted: false,
            channel: 'guild',
            category: "Bot Owner Only",
            args: [{
                id: 'code', type: 'string', match: 'content', default: null, 
                    prompt: {
                        start: `Please provide an expression for me to evaluate`,
                        retry: `Please provide an expression for me to evaluate`,    
                    } 
            }],
            description: {
                usage: 'eval [ code ]',
                examples: ['eval let i = 0'],
                description: 'Evaluates JavaScript code'
            },
            cooldown: 6000,
            ratelimit: 2,
            
        })
    }

	async exec(message, { code }) {
        if (!code) return message.channel.reply('No code provided!');

        const evaled = {};
        const logs = [];

        const token = this.client.token.split('').join('[^]{0,2}');
        const rev = this.client.token.split('').reverse().join('[^]{0,2}');
        const tokenRegex = new RegExp(`${token}|${rev}`, 'g');
        const cb = '```';

        const print = (...a) => { // eslint-disable-line no-unused-vars
            const cleaned = a.map(obj => {
                if (typeof o !== 'string') obj = channel.inspect(obj, { depth: 1 });
                return obj.replace(tokenRegex, '[TOKEN]');
            });

            if (!evaled.output) {
                logs.push(...cleaned);
                return;
            }

            evaled.output += evaled.output.endsWith('\n') ? cleaned.join(' ') : `\n${cleaned.join(' ')}`;
            const title = evaled.errored ? '☠\u2000**Error**' : '📤\u2000**Output**';

            if (evaled.output.length + code.length > 1900) evaled.output = 'Output too long.';
            evaled.message.edit([
                `📥\u2000**Input**${cb}js`,
                code,
                cb,
                `${title}${cb}js`,
                evaled.output,
                cb,
                `⭐\u2000**Type**:${cb}js`,
                new Type(evaled.output).is,
                cb
            ]);
        };

        try {
            let output = eval(code);
            if (output && typeof output.then === 'function') output = await output;
            const oldType = output;

            if (typeof output !== 'string') output = inspect(output, { depth: 0 });
            output = `${logs.join('\n')}\n${logs.length && output === 'undefined' ? '' : output}`;
            output = output.replace(tokenRegex, '[TOKEN]');

            if (output.length + code.length > 1900) output = 'Output too long.';

            const sent = await message.channel.send([
                `📥\u2000**Input**${cb}js`,
                code,
                cb,
                `📤\u2000**Output**${cb}js`,
                output,
                cb,
                `⭐\u2000**Type**:${cb}js`,
                new Type(oldType).is,
                cb
            ]);

            evaled.message = sent;
            evaled.errored = false;
            evaled.output = output;

            return sent;
        } catch (err) {
            console.error(err); // eslint-disable-line no-console
            let error = err;

            error = error.toString();
            error = `${logs.join('\n')}\n${logs.length && error === 'undefined' ? '' : error}`;
            error = error.replace(tokenRegex, '[TOKEN]');

            const sent = await message.channel.send([
                `📥\u2000**Input**${cb}js`,
                code,
                cb,
                `☠\u2000**Error**${cb}js`,
                error,
                cb
            ]);

            evaled.message = sent;
            evaled.errored = true;
            evaled.output = error;

            return sent;
        }
    }
}
module.exports = EvalCommand;