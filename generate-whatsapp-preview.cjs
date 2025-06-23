#!/usr/bin/env node

const fs = require("fs").promises;
const path = require("path");

async function generateWhatsAppPreview() {
  console.log("📱 Generating WhatsApp sharing preview...");

  const { createCanvas, loadImage } = require("canvas");

  try {
    const logoPath = path.join(__dirname, "public", "logo1.png");
    const outputPath = path.join(__dirname, "public", "whatsapp-image.png");

    // Load logo
    const logo = await loadImage(logoPath);

    // Create 400x400 canvas for WhatsApp
    const canvas = createCanvas(400, 400);
    const ctx = canvas.getContext("2d"); // Create modern green gradient like the reference image
    const gradient = ctx.createLinearGradient(0, 0, 400, 400);
    gradient.addColorStop(0, "#00ff94"); // Bright green top
    gradient.addColorStop(0.3, "#00e6aa"); // Green-cyan
    gradient.addColorStop(0.6, "#00cccc"); // Cyan-green
    gradient.addColorStop(1, "#00b3e6"); // Blue-green bottom

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 400);

    // Add subtle pattern overlay for depth
    ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
    for (let i = 0; i < 400; i += 30) {
      for (let j = 0; j < 400; j += 30) {
        ctx.fillRect(i, j, 15, 15);
      }
    } // Position logo perfectly centered
    const logoSize = 120;
    const logoX = (400 - logoSize) / 2;
    const logoY = (400 - logoSize) / 2 - 25;

    // Add subtle shadow for the logo
    ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 3;
    ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);

    // Reset shadow
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // Add main title with perfect contrast
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 28px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("AXON.APP", 200, logoY + logoSize + 40);

    // Add subtitle with slight transparency
    ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
    ctx.font = "400 14px Arial, sans-serif";
    ctx.fillText("Professional Web Development", 200, logoY + logoSize + 65);

    // Save image
    const buffer = canvas.toBuffer("image/png");
    await fs.writeFile(outputPath, buffer);

    console.log("✅ WhatsApp sharing image created successfully!");
    console.log(`📍 Saved to: ${outputPath}`);
    console.log("📱 Optimized for WhatsApp link previews");
  } catch (error) {
    console.error("❌ Error generating WhatsApp preview:", error.message);
    console.error(
      "💡 Make sure canvas package is installed: npm install canvas"
    );
  }
}

generateWhatsAppPreview();
