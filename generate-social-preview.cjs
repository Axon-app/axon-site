#!/usr/bin/env node

const fs = require("fs").promises;
const path = require("path");
const { createCanvas, loadImage } = require("canvas");

async function generateSocialPreview() {
  console.log("🎨 Generating social media preview images...");

  const logoPath = path.join(__dirname, "public", "logo1.png");
  const publicDir = path.join(__dirname, "public");

  try {
    const logo = await loadImage(logoPath);

    // Generate Open Graph image (1200x630)
    console.log("📸 Creating Open Graph image (1200x630)...");
    const ogCanvas = createCanvas(1200, 630);
    const ogCtx = ogCanvas.getContext("2d");

    // Gradient background
    const gradient = ogCtx.createLinearGradient(0, 0, 1200, 630);
    gradient.addColorStop(0, "#1a1a2e");
    gradient.addColorStop(1, "#16213e");

    ogCtx.fillStyle = gradient;
    ogCtx.fillRect(0, 0, 1200, 630);

    // Logo positioning
    const logoSize = 200;
    const logoX = (1200 - logoSize) / 2;
    const logoY = (630 - logoSize) / 2 - 50;

    // Add subtle glow
    ogCtx.shadowColor = "#4338ca";
    ogCtx.shadowBlur = 20;
    ogCtx.drawImage(logo, logoX, logoY, logoSize, logoSize);

    // Reset shadow
    ogCtx.shadowColor = "transparent";
    ogCtx.shadowBlur = 0;

    // Add text
    ogCtx.fillStyle = "#ffffff";
    ogCtx.font = "bold 48px Arial";
    ogCtx.textAlign = "center";
    ogCtx.fillText("AXON.APP", 600, logoY + logoSize + 80);

    ogCtx.fillStyle = "#a0a0a0";
    ogCtx.font = "24px Arial";
    ogCtx.fillText("Professional Web Development", 600, logoY + logoSize + 120);

    // Save Open Graph image
    const ogBuffer = ogCanvas.toBuffer("image/png");
    await fs.writeFile(path.join(publicDir, "og-image.png"), ogBuffer);
    console.log("✅ og-image.png created");

    // Generate Twitter Card image (1200x600)
    console.log("📸 Creating Twitter Card image (1200x600)...");
    const twitterCanvas = createCanvas(1200, 600);
    const twitterCtx = twitterCanvas.getContext("2d");

    // Similar gradient
    const twitterGradient = twitterCtx.createLinearGradient(0, 0, 1200, 600);
    twitterGradient.addColorStop(0, "#1a1a2e");
    twitterGradient.addColorStop(1, "#16213e");

    twitterCtx.fillStyle = twitterGradient;
    twitterCtx.fillRect(0, 0, 1200, 600);

    // Logo for Twitter
    const twitterLogoSize = 180;
    const twitterLogoX = (1200 - twitterLogoSize) / 2;
    const twitterLogoY = (600 - twitterLogoSize) / 2 - 40;

    twitterCtx.shadowColor = "#4338ca";
    twitterCtx.shadowBlur = 20;
    twitterCtx.drawImage(
      logo,
      twitterLogoX,
      twitterLogoY,
      twitterLogoSize,
      twitterLogoSize
    );

    twitterCtx.shadowColor = "transparent";
    twitterCtx.shadowBlur = 0;

    // Twitter text
    twitterCtx.fillStyle = "#ffffff";
    twitterCtx.font = "bold 44px Arial";
    twitterCtx.textAlign = "center";
    twitterCtx.fillText("AXON.APP", 600, twitterLogoY + twitterLogoSize + 70);

    twitterCtx.fillStyle = "#a0a0a0";
    twitterCtx.font = "22px Arial";
    twitterCtx.fillText(
      "Professional Web Development",
      600,
      twitterLogoY + twitterLogoSize + 105
    );

    // Save Twitter image
    const twitterBuffer = twitterCanvas.toBuffer("image/png");
    await fs.writeFile(
      path.join(publicDir, "twitter-image.png"),
      twitterBuffer
    );
    console.log("✅ twitter-image.png created");

    // Generate WhatsApp image (400x400)
    console.log("📸 Creating WhatsApp image (400x400)...");
    const whatsappCanvas = createCanvas(400, 400);
    const whatsappCtx = whatsappCanvas.getContext("2d");

    // Square gradient
    const whatsappGradient = whatsappCtx.createRadialGradient(
      200,
      200,
      0,
      200,
      200,
      200
    );
    whatsappGradient.addColorStop(0, "#2d1b69");
    whatsappGradient.addColorStop(1, "#16213e");

    whatsappCtx.fillStyle = whatsappGradient;
    whatsappCtx.fillRect(0, 0, 400, 400);

    // Logo for WhatsApp
    const whatsappLogoSize = 120;
    const whatsappLogoX = (400 - whatsappLogoSize) / 2;
    const whatsappLogoY = (400 - whatsappLogoSize) / 2 - 20;

    whatsappCtx.shadowColor = "#4338ca";
    whatsappCtx.shadowBlur = 15;
    whatsappCtx.drawImage(
      logo,
      whatsappLogoX,
      whatsappLogoY,
      whatsappLogoSize,
      whatsappLogoSize
    );

    whatsappCtx.shadowColor = "transparent";
    whatsappCtx.shadowBlur = 0;

    // WhatsApp text
    whatsappCtx.fillStyle = "#ffffff";
    whatsappCtx.font = "bold 28px Arial";
    whatsappCtx.textAlign = "center";
    whatsappCtx.fillText(
      "AXON.APP",
      200,
      whatsappLogoY + whatsappLogoSize + 40
    );

    whatsappCtx.fillStyle = "#a0a0a0";
    whatsappCtx.font = "14px Arial";
    whatsappCtx.fillText(
      "Web Development",
      200,
      whatsappLogoY + whatsappLogoSize + 65
    );

    // Save WhatsApp image
    const whatsappBuffer = whatsappCanvas.toBuffer("image/png");
    await fs.writeFile(
      path.join(publicDir, "whatsapp-image.png"),
      whatsappBuffer
    );
    console.log("✅ whatsapp-image.png created");

    console.log("\n🎉 All social media preview images generated successfully!");
    console.log("📍 Images saved to public/ directory");
    console.log("🌐 Ready for social media sharing");
  } catch (error) {
    console.error("❌ Error generating social preview images:", error.message);
  }
}

generateSocialPreview();
