const fs = require('fs');

async function main() {
    try {
        const response = await fetch('https://discord.com/api/v10/users/@me/guilds', {
            headers: { Authorization: `Bot ${process.env.BOT_TOKEN}` }
        });
        
        if (!response.ok) throw new Error(`Discord API error: ${response.status}`);
        const guilds = await response.json();
        const serverCount = guilds.length; 

        const readmeText = fs.readFileSync('README.md', 'utf8');
        const newReadmeText = readmeText.replace(
            /[\s\S]*/,
            `\n🚀 **Xeker v15** is currently active in **${serverCount}** servers!\n`
        );

        fs.writeFileSync('README.md', newReadmeText);
        console.log(`Successfully updated README with ${serverCount} servers.`);
        
    } catch (error) {
        console.error('Failed to update stats:', error);
    }
}

main();
