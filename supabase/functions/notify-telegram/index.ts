import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  try {
    // 1. Capture data from the Supabase Webhook trigger
    const { record, table, type } = await req.json()

    // 2. Access secrets 
    const BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN')
    const CHAT_ID = Deno.env.get('TELEGRAM_CHAT_ID')

    if (!BOT_TOKEN || !CHAT_ID) {
      return new Response("Configuration missing", { status: 500 })
    }

    let message = ""

    // 3. Logic for Projects
    if (table === 'projects' && type === 'INSERT') {
      message = `🚀 *NEW_PROJECT_LOGGED*\n` +
                `━━━━━━━━━━━━━━━\n` +
                `*Title:* ${record.title}\n` +
                `*Dev:* ${record.author || 'Anonymous'}\n` +
                `*Link:* [View Project](${record.demo_link || '#' })`+
                `\n\n*Description:*\n${record.description || 'No description provided.'}`+
                `\n*github:* ${record.github_link ? `[Repo Link](${record.github_link})` : 'N/A'}`
    } 
    // 4. Logic for Guests
    else if (table === 'guests' && type === 'INSERT') {
      message = `👤 *NEW_GUEST_SUGGESTED*\n` +
                `━━━━━━━━━━━━━━━\n` +
                `*Name:* ${record.name}\n` +
                `*Role:* ${record.role}\n` +
                `*Reason:* ${record.rationale || 'N/A'}`
    }

    
// ... (imports and secrets stay the same)

    if (message) {
      const screenshots = record.screenshots || [];

      // OPTION A: If there are screenshots, send as an album (Media Group)
      if (screenshots.length > 0) {
        const media = screenshots.map((url, index) => ({
          type: 'photo',
          media: url,
          // We attach the full text description only to the first image
          caption: index === 0 ? message : '', 
          parse_mode: 'Markdown'
        }));

        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMediaGroup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            media: media,
          }),
        });

      } 
      // OPTION B: No screenshots? Just send the text as usual
      else {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'Markdown',
          }),
        });
      }
    }
// ...

    return new Response(JSON.stringify({ status: 'success' }), { 
      headers: { "Content-Type": "application/json" } 
    })
    
  } catch (error) {
    return new Response(error.message, { status: 500 })
  }
})