import { Client, resolveColor } from "discord.js";
import { Command, DefaultOptionParams } from "../../../utils/Command";

export default class extends Command {
  constructor(client: Client) {
    super(client, {
      name: "ping",
      description: "Calculate bot ping",
      enabled: true
    });

    this.set(new this.SlashCommand());
  };

  async execute({ interaction, guild, member, client }: DefaultOptionParams) {
    const api = this.client.ws.ping;
    const bot = Math.round(Date.now() - interaction.createdTimestamp);


    let api_status = "green";
    let bot_status = "green";

    if (api >= 150 && api < 300) api_status = "blue";
    else if (api >= 300 && api < 600) api_status = "orange";
    else if (api >= 600 && api < 1200) api_status = "yellow";
    else if (api >= 1200) api_status = "red";

    if (bot >= 150 && bot < 300) bot_status = "blue";
    else if (bot >= 300 && bot < 600) bot_status = "orange";
    else if (bot >= 600 && bot < 1200) bot_status = "yellow";
    else if (bot >= 1200) bot_status = "red";

    const embed = new this.Embed({
      title: `${this.client.user?.username} Ping`,
      fields: [
        {
          name: ` WebSocket Ping`,
          value: `${api_status} \`${api}ms\``,
          inline: true
        },
        {
          name: `API Ping`,
          value: `${bot_status} \`${bot}ms\``,
          inline: true
        }
      ],
      color: resolveColor("Green"),
    });

    return await interaction.reply({ embeds: [embed] });
  };
};