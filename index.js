const { serve } = require("@hono/node-server");
const { Hono } = require("hono");
const axios = require("axios");
const cheerio = require("cheerio");

const app = new Hono();

async function getIndogoldPrice() {
  try {
    const response = await axios.get("https://www.indogold.id/", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });
    const $ = cheerio.load(response.data);

    let sellPriceText = "";
    $("font.text-left").each((i, el) => {
      if ($(el).text().includes("Harga Jual")) {
        const priceContainer = $(el).parent().find("font.size-24.text-right");
        sellPriceText = priceContainer.text();
      }
    });

    if (!sellPriceText) {
      throw new Error("Could not find sell price");
    }

    const cleanedPrice = sellPriceText.replace(/[^0-9]/g, "");
    return parseInt(cleanedPrice, 10);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

app.get("/price", async (c) => {
  try {
    const price = await getIndogoldPrice();
    const timestamp = new Date().toISOString();
    // Try to get IP from headers or fallback
    const clientIp = c.req.header("x-forwarded-for") || "unknown";
    console.log(`[${timestamp}] Request from: ${clientIp} | Price: ${price}`);
    return c.text(price);
  } catch (error) {
    return c.json(
      {
        status: "error",
        message: "Failed to fetch price",
      },
      500,
    );
  }
});

if (require.main === module) {
  const port = 3000;
  console.log(`Server is running on http://localhost:${port}`);

  serve({
    fetch: app.fetch,
    port,
  });
}

module.exports = app;
