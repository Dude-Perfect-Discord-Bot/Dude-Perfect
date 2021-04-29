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

class ColorCommand extends Command {
    constructor() {
        super('color', {
            aliases: ['color', 'colour'],
            category: 'Miscellaneous',
            description: {
                content: 'Information about a color if you provide a hex value.\nRunning the command without a hex value will generate a random hex and get information for it.',
                permissions: ['EMBED_LINKS']
            },
            args: [{
                id: 'hex',
                type: /^#?([A-F0-9]{6}|[A-F0-9]{3})$/i,
                default: null
            }],
            clientPermissions: ['EMBED_LINKS']
        });
    }

    async exec(message, args) {
        let hex = !args.hex ? this.generateHex() : args.hex["match"][0]
        let color = hex.replace(/#/g, '');
        const data = await this.client.flipnote.others.color(color);
        return message.util.send({ embed: this.client.util.embed()
            .setColor(hex)
            .setTitle(args.hex ? `Color Information for ${data.hex}` : `No hex matches, generating random: #${hex}`)
            .setDescription(`Color Name: \`${data.name}\`\nBrightness: \`${data.brightness}\`\nInt: \`${data.int}\`\nRGB: \`${data.rgb}\``)
            .addField('Shade', data.shade.join(', '))
            .addField('Tint', data.tint.join(', '))
            .setThumbnail(data.image)
            .setImage(data.image_gradient)
        });
    }
    generateHex() {
        return Math.floor(Math.random()*16777215).toString(16);
    }
}

module.exports = ColorCommand;
